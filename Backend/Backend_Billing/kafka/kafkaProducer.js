// billing-service/kafka/kafkaProducer.js
const { Kafka } = require('kafkajs');

class KafkaProducer {
    constructor() {
        this.kafka = new Kafka({
            clientId: 'billing-service',
            brokers: ['localhost:9092'],
        });
        this.producer = this.kafka.producer();
        this.isConnected = false;
    }

    async connect() {
        if (this.isConnected) return;
        try {
            await this.producer.connect();
            this.isConnected = true;
            console.log('Kafka producer connected');
        } catch (err) {
            console.error('Error connecting Kafka producer:', err);
            throw err;
        }
    }

    async publish(topic, event) {
        if (!this.isConnected) {
            await this.connect();
        }
        try {
            await this.producer.send({
                topic,
                messages: [{ value: JSON.stringify(event) }],
            });
            console.log(`Event published to ${topic}: ${event.event}`);
        } catch (err) {
            console.error('Error publishing event:', err);
            throw err;
        }
    }

    async disconnect() {
        try {
            await this.producer.disconnect();
            this.isConnected = false;
            console.log('Kafka producer disconnected');
        } catch (err) {
            console.error('Error disconnecting Kafka producer:', err);
        }
    }
}

// Export singleton instance
module.exports = new KafkaProducer();