import express from 'express';
import NotificationController from '../controllers/notificationControllers.js' // Fix import path

const router = express.Router();
const notificationController = new NotificationController();

router.get('/notifications', (req, res) => notificationController.getAllNotifications(req, res));

export default router;