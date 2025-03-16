import { Kafka } from 'kafkajs';
import NotificationService from '../services/notificationService.js';

class KafkaConsumer {
    constructor() {
        this.kafka = new Kafka({
            clientId: 'notification-service',
            brokers: [process.env.KAFKA_BROKER || 'localhost:9092'], // Fallback to localhost:9092
        });
        this.consumer = this.kafka.consumer({ groupId: 'notification-group' });
        this.notificationService = new NotificationService(); // Instantiate NotificationService
    }

    async connect() {
        await this.consumer.connect();
        console.log('Kafka consumer connected');
    }

    async subscribe(topics) {
        for (const topic of topics) {
            await this.consumer.subscribe({ topic, fromBeginning: true });
        }
        console.log(`Subscribed to topics: ${topics.join(', ')}`);
    }

    async run() {
        await this.consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                const { service, event, message: eventMessage } = JSON.parse(message.value.toString());
                console.log(`Received event: ${event} from ${service}`);

                // Save notification
                await this.notificationService.createNotification(service, event, eventMessage);
            },
        });
        console.log('Kafka consumer is running...');
    }
}

export default KafkaConsumer;