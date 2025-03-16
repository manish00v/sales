import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class NotificationService {
    async createNotification(service, event, message) {
        return await prisma.notification.create({
            data: { service, event, message },
        });
    }

    async getAllNotifications() {
        return await prisma.notification.findMany();
    }
}

export default NotificationService;