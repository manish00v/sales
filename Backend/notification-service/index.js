import express from 'express';
import cors from 'cors';
import settingsRouter from './routes/settingsRoutes.js'; // Fixed import
import WebSocketServer from './websocket/websocketServer.js';
import KafkaConsumer from './kafka/kafkaConsumer.js';
import { PrismaClient } from '@prisma/client';
import elasticsearchService from './services/elasticsearchService.js';
import searchRouter from './routes/searchRoutes.js'
// Add this at the top with your other imports
import { elasticClient } from './config/elasticsearch.js';
// Change this import


const prisma = new PrismaClient();
const app = express();

// Middleware
// ====================== MIDDLEWARE SETUP ====================== //

// CORS Configuration
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Enhanced JSON Middleware with error handling
app.use(express.json({
  verify: (req, res, buf) => {
    req.rawBody = buf.toString();
    try {
      JSON.parse(req.rawBody);
    } catch (e) {
      console.error('Invalid JSON payload:', req.rawBody);
      res.status(400).json({ 
        error: 'Invalid JSON payload',
        received: req.rawBody.length > 100 ? 
          req.rawBody.substring(0, 100) + '...' : 
          req.rawBody
      });
      throw new Error('Invalid JSON');
    }
  },
  limit: '10mb'
}));

// URL-encoded Middleware
app.use(express.urlencoded({ extended: true }));

// ====================== DATABASE & SERVICES INITIALIZATION ====================== //

// Database connection
prisma.$connect()
  .then(() => console.log('✅ Connected to database'))
  .catch(err => console.error('❌ Database connection error:', err));

// Elasticsearch initialization
const initializeElasticsearch = async () => {
  try {
    const { body } = await elasticClient.ping();
    if (!body) {
      throw new Error('Empty response from Elasticsearch');
    }
    console.log('✅ Elasticsearch connected successfully');
    
    // Initialize indices
    await elasticsearchService.initializeIndices();
    console.log('✅ Elasticsearch indices initialized');
    
    // Verify basic operations
    const indices = await elasticClient.cat.indices({ format: 'json' });
    console.log(`ℹ️ Available indices: ${indices.body.length}`);
  } catch (error) {
    console.error('❌ Elasticsearch initialization error:', error.message);
    console.log('🔍 Troubleshooting steps:');
    console.log('1. Ensure Elasticsearch is running: http://localhost:9200');
    console.log('2. Verify credentials (default: elastic/changeme)');
    console.log('3. Check if port 9200 is accessible');
    console.log('4. Try disabling security in elasticsearch.yml:');
    console.log('   xpack.security.enabled: false');
  }
};

initializeElasticsearch();

// ====================== ROUTES ====================== //

app.use('/api', settingsRouter);
app.use('/api/search', searchRouter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK',
    services: {
      database: true,
      elasticsearch: elasticClient ? true : false,
      kafka: true
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && {
      message: err.message,
      stack: err.stack
    })
  });
});

// ====================== SERVICE INITIALIZATION ====================== //

// Initialize WebSocket server
const webSocketServer = new WebSocketServer(8080);

// Initialize Kafka consumer
const kafkaConsumer = new KafkaConsumer();



// ====================== NOTIFICATION PROCESSING ====================== //

const processNotification = async (payload) => {
  try {
    // Validate required fields
    const requiredFields = ['service', 'event', 'message', 'data'];
    const missingFields = requiredFields.filter(field => !payload[field]);
    
    if (missingFields.length > 0) {
      console.error('Missing required fields:', missingFields);
      return null;
    }

    // Determine notification type
    const type = payload.service.replace('-service', '');

    // Create notification record
    const notification = await prisma.notification.create({
      data: {
        service: payload.service,
        event: payload.event,
        type,
        message: `${payload.service} - ${payload.event}: ${payload.message}`,
        orderId: payload.data?.orderId || null,
        metadata: payload.data ? JSON.stringify(payload.data) : null
      }
    });

    console.log(`Notification created: ${notification.id}`);
    return notification;

  } catch (error) {
    console.error('Database error:', error);
    
    if (error.code === 'P2022') {
      console.error('Database schema mismatch! Please run migrations.');
      console.error('Missing column:', error.meta.column);
    }
    
    return null;
  }
};

// ====================== KAFKA CONSUMER ====================== //

const startKafkaConsumer = async () => {
  try {
    await kafkaConsumer.connect();

    const topics = [
      'order-events',
      'shipment-events',
      'invoice-events',
      'payment-events',
      'vehicle-events',
      'inventory-events'
    ];

    await kafkaConsumer.subscribe(topics);

    await kafkaConsumer.run(async ({ topic, partition, message }) => {
      try {
        const payload = JSON.parse(message.value.toString());
        console.log(`\n=== Received ${topic} event ===`);
        console.log('Full message:', payload);

        const notification = await processNotification(payload);
        
        if (notification) {
          webSocketServer.broadcastNotification({
            id: notification.id,
            type: notification.type,
            service: notification.service,
            event: notification.event,
            message: notification.message,
            timestamp: notification.timestamp,
            metadata: JSON.parse(notification.metadata)
          });
        }
      } catch (error) {
        console.error('Error processing Kafka message:', error);
      }
    });

    console.log('Kafka consumer started successfully. Listening to:');
    topics.forEach(topic => console.log(`- ${topic}`));

  } catch (error) {
    console.error('Error starting Kafka consumer:', error);
    process.exit(1);
  }
};

// ====================== SERVER STARTUP ====================== //

// Start services
startKafkaConsumer();

const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, () => {
  console.log(`Notification Service running on port ${PORT}`);
  console.log(`Available endpoints:
  - GET  /api/settings
  - POST  /api/settings
  - WS   :8080 (WebSocket)`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use.`);
  } else {
    console.error('Server error:', err);
  }
});

// ====================== GRACEFUL SHUTDOWN ====================== //

const shutdown = async (signal) => {
  console.log(`\n${signal} signal received. Shutting down gracefully...`);
  
  try {
    console.log('Disconnecting Kafka consumer...');
    await kafkaConsumer.disconnect();
    
    console.log('Closing WebSocket server...');
    webSocketServer.close();
    
    console.log('Disconnecting Prisma client...');
    await prisma.$disconnect();
    
    console.log('Closing HTTP server...');
    server.close(() => {
      console.log('Server successfully shut down');
      process.exit(0);
    });
    
  } catch (error) {
    console.error('Shutdown error:', error);
    process.exit(1);
  }
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));