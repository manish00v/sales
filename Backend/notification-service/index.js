import express from 'express';
import notificationRoutes from './routes/notificationRoutes.js';
import KafkaConsumer from './kafka/kafkaConsumer.js';

const app = express();
app.use(express.json());

// Routes
app.use('/api', notificationRoutes);

// Start Kafka consumer
const startKafkaConsumer = async () => {
    const kafkaConsumer = new KafkaConsumer();
    try {
        await kafkaConsumer.connect();
        await kafkaConsumer.subscribe(['order-events']);
        await kafkaConsumer.run();
        console.log('Kafka consumer started successfully');
    } catch (error) {
        console.error('Error starting Kafka consumer:', error);
    }
};

startKafkaConsumer();

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Notification Service running on port ${PORT}`);
}).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Please free the port or use a different port.`);
    } else {
        console.error('Server error:', err);
    }
});