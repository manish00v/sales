import express from 'express';
import cors from 'cors';
import WebSocketServer from './websocket/websocketServer.js';
import KafkaConsumer from './kafka/kafkaConsumer.js';
import { PrismaClient } from '@prisma/client';
const settingsRouter = require('./routes/Setting.Routes');


const prisma = new PrismaClient();
const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());

// Database connection check
prisma.$connect()
  .then(() => console.log('Connected to database'))
  .catch(err => console.error('Database connection error:', err));

// Routes
app.use('/api', settingsRouter); // All settings routes will be prefixed with /api

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Settings endpoints available at:
  - GET /api/settings
  - PUT /api/settings`);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

// Initialize WebSocket server
const webSocketServer = new WebSocketServer(8080);

// Initialize Kafka consumer
const kafkaConsumer = new KafkaConsumer();

// ====================== SETTINGS ENDPOINTS ====================== //

/**
 * @api {get} /api/settings Get current settings
 * @apiName GetSettings
 */
app.get('/api/settings', async (req, res) => {
  try {
    const settings = await prisma.settings.findFirst();
    
    // Return default settings if none exist
    res.status(200).json(settings || {
      companyName: '',
      companyAddress: '',
      timezone: 'UTC',
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
  } catch (error) {
    console.error('GET /api/settings error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch settings',
      details: error.message 
    });
  }
});

/**
 * @api {put} /api/settings Update settings
 * @apiName UpdateSettings
 * @apiBody {String} companyName
 * @apiBody {String} companyAddress
 * @apiBody {String} timezone
 */
app.put('/api/settings', async (req, res) => {
  try {
    const { companyName, companyAddress, timezone } = req.body;
    
    // Validate required fields
    if (!companyName || !companyAddress || !timezone) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        required: ['companyName', 'companyAddress', 'timezone']
      });
    }

    // Check for existing settings
    const existingSettings = await prisma.settings.findFirst();
    
    let settings;
    if (existingSettings) {
      // Update existing settings
      settings = await prisma.settings.update({
        where: { id: existingSettings.id },
        data: { 
          companyName, 
          companyAddress, 
          timezone 
        }
      });
    } else {
      // Create new settings
      settings = await prisma.settings.create({
        data: { 
          companyName, 
          companyAddress, 
          timezone 
        }
      });
    }

    res.status(200).json(settings);
    
  } catch (error) {
    console.error('PUT /api/settings error:', error);
    res.status(500).json({ 
      error: 'Failed to save settings',
      details: error.message 
    });
  }
});

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
  - PUT  /api/settings
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