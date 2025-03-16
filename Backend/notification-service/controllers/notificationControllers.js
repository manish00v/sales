import NotificationService from '../services/notificationService.js';

class NotificationController {
    constructor() {
        this.notificationService = new NotificationService();
    }

    async getAllNotifications(req, res) {
        try {
            const notifications = await this.notificationService.getAllNotifications();
            res.json(notifications);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default NotificationController;