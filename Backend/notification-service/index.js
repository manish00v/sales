import express from 'express';
import cors from 'cors'; // Add this line
import WebSocketServer from './websocket/websocketServer.js';
import KafkaConsumer from './kafka/kafkaConsumer.js';
import settingsRoutes from './routes/settingsRoutes.js';
import searchRoutes from './routes/searchRoutes.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();

// Enable CORS for all routes
app.use(cors({
  origin: 'http://localhost:5173', // Allow your frontend origin
  methods: ['GET', 'POST', 'PUT'], // Allowed HTTP methods
  credentials: true // Allow cookies (if needed)
}));

app.use(express.json());
app.use('/settings', settingsRoutes);
app.use('/api/search', searchRoutes);
// Rest of your code...
(async () => {
  try {
    await elasticClient.ping();
    console.log('✅ Elasticsearch connected successfully');
  } catch (error) {
    console.error('❌ Elasticsearch connection failed:', error.message);
  }
})();
// Initialize WebSocket server
const webSocketServer = new WebSocketServer(8080);

// Initialize Kafka consumer
const kafkaConsumer = new KafkaConsumer();

// Function to save notification to the database using Prisma
const saveNotificationToDatabase = async (notification) => {
  const { type, orderId, message, timestamp } = notification;
  try {
    const savedNotification = await prisma.notification.create({
      data: {
        type,
        orderId: orderId,
        message,
        timestamp: new Date(timestamp),
      },
    });
    console.log('Notification saved to database:', savedNotification);
  } catch (error) {
    console.error('Error saving notification to database:', error);
  }
};

// Start Kafka consumer
const startKafkaConsumer = async () => {
  try {
    await kafkaConsumer.connect();

    // Subscribe to relevant topics
    const topics = [
      'order-events',       // Sales Order events
      'shipment-events',   // Shipment events
      'invoice-events',    // Invoice events
      'payment-events',    // Payment events
      'delivery-events',   // Delivery Vehicle events
      'inventory-events'   // Inventory events
    ];

    await kafkaConsumer.subscribe(topics);

    // Run Kafka consumer with a callback to handle messages
    await kafkaConsumer.run(({ topic, partition, message }) => {
      try {
        const payload = JSON.parse(message.value.toString());
        console.log('Received Kafka message:', payload);

        // Validate the message
        if (!payload.service || !payload.event || !payload.message || !payload.data) {
          console.error('Invalid message format:', payload);
          return;
        }

        const { service, event, message: eventMessage, data } = payload;

        // Derive the type from the event
        const type = event; // Use the event as the type

        console.log(`Received event: ${event} from ${service}`);

        // Create a notification object
        const notification = {
          type,
          orderId: data?.orderId || 'N/A',
          message: eventMessage,
          timestamp: new Date().toISOString(),
        };

        // Save the notification to the database
        saveNotificationToDatabase(notification);

        // Broadcast the Kafka message to WebSocket clients
        webSocketServer.broadcastNotification(notification);
      } catch (error) {
        console.error('Error processing Kafka message:', error);
      }
    });

    console.log('Kafka consumer started successfully');
  } catch (error) {
    console.error('Error starting Kafka consumer:', error);
    process.exit(1); // Exit the process if Kafka consumer fails
  }
};

startKafkaConsumer();

// Start Express server
const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, () => {
  console.log(`Notification Service running on port ${PORT}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Please free the port or use a different port.`);
  } else {
    console.error('Server error:', err);
  }
});

// Graceful shutdown
const shutdown = async (signal) => {
  console.log(`${signal} signal received. Shutting down gracefully...`);
  try {
    await kafkaConsumer.disconnect();
    webSocketServer.close();
    await prisma.$disconnect(); // Disconnect Prisma Client
    server.close(() => {
      console.log('Server closed');
      process.exit(0);
    });
  } catch (error) {
    console.error('Error during shutdown:', error);
    process.exit(1);
  }
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));