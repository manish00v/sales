import { Kafka } from 'kafkajs';

class KafkaProducer {
    constructor() {
        this.kafka = new Kafka({
            clientId: 'shipment-service',
            brokers: ['localhost:9092'], // Replace with your Kafka broker addresses
        });
        this.producer = this.kafka.producer();
        this.isConnected = false; // Track connection status
    }

    async connect() {
        if (this.isConnected) return; // Skip if already connected

        try {
            await this.producer.connect();
            this.isConnected = true; // Update connection status
            console.log('Kafka producer connected');
        } catch (err) {
            console.error('Error connecting Kafka producer:', err);
            throw err; // Re-throw the error to handle it in the caller
        }
    }

    async publish(topic, event) {
        if (!this.isConnected) {
            await this.connect(); // Reconnect if not connected
        }

        try {
            await this.producer.send({
                topic,
                messages: [{ value: JSON.stringify(event) }],
            });
            console.log(`Event published to ${topic}: ${event.event}`);
        } catch (err) {
            console.error('Error publishing event:', err);
            throw err; // Re-throw the error to handle it in the caller
        }
    }

    async disconnect() {
        try {
            await this.producer.disconnect();
            this.isConnected = false; // Update connection status
            console.log('Kafka producer disconnected');
        } catch (err) {
            console.error('Error disconnecting Kafka producer:', err);
        }
    }
}

export default new KafkaProducer();