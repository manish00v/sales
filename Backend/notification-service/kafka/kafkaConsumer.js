import { Kafka } from 'kafkajs';

class KafkaConsumer {
    constructor() {
        this.kafka = new Kafka({
            clientId: process.env.KAFKA_CLIENT_ID || 'notification-service',
            brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
        });
        this.consumer = this.kafka.consumer({ groupId: process.env.KAFKA_GROUP_ID || 'notification-group' });
    }

    async connect() {
        try {
            await this.consumer.connect();
            console.log('Kafka consumer connected');
        } catch (error) {
            console.error('Error connecting Kafka consumer:', error);
            throw error;
        }
    }

    async subscribe(topics) {
        try {
            for (const topic of topics) {
                await this.consumer.subscribe({ topic, fromBeginning: true });
            }
            console.log(`Subscribed to topics: ${topics.join(', ')}`);
        } catch (error) {
            console.error('Error subscribing to topics:', error);
            throw error;
        }
    }

    async run(callback) {
        try {
            await this.consumer.run({
                eachMessage: async ({ topic, partition, message }) => {
                    callback({ topic, partition, message });
                },
            });
            console.log('Kafka consumer is running...');
        } catch (error) {
            console.error('Error running Kafka consumer:', error);
            throw error;
        }
    }

    async disconnect() {
        try {
            await this.consumer.disconnect();
            console.log('Kafka consumer disconnected');
        } catch (error) {
            console.error('Error disconnecting Kafka consumer:', error);
            throw error;
        }
    }
}

export default KafkaConsumer; // Ensure this is the default export