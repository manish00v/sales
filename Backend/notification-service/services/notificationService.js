import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class NotificationService {
    async createNotification(service, event, message, type) {
        return await prisma.notification.create({
            data: { service, event, message, type },
        });
    }

    async getAllNotifications() {
        return await prisma.notification.findMany();
    }

    // Optional: Add specific methods for each notification type
    async createSalesOrderNotification(service, event, message) {
        return this.createNotification(service, event, message, 'sales');
    }

    async createShipmentNotification(service, event, message) {
        return this.createNotification(service, event, message, 'shipment');
    }

    async createInvoiceNotification(service, event, message) {
        return this.createNotification(service, event, message, 'invoice');
    }

    async createPaymentNotification(service, event, message) {
        return this.createNotification(service, event, message, 'payment');
    }

    async createDeliveryVehicleNotification(service, event, message) {
        return this.createNotification(service, event, message, 'delivery_vehicle');
    }

    async createInventoryNotification(service, event, message) {
        return this.createNotification(service, event, message, 'inventory');
    }
}

export default NotificationService;