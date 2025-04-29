const { Kafka } = require('kafkajs');

class KafkaProducer {
    constructor() {
        this.kafka = new Kafka({
            clientId: 'shipment-service',
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
        } catch (err) {
            console.error('Error connecting Kafka producer:', err);
            throw err;
        }
    }

    async publish(topic, event) {
        if (!this.isConnected) await this.connect();
        try {
            await this.producer.send({
                topic,
                messages: [{ value: JSON.stringify(event) }],
            });
        } catch (err) {
            console.error('Error publishing event:', err);
            throw err;
        }
    }
}

module.exports = new KafkaProducer();