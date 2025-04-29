import express from 'express';
import SettingsController from '../controllers/settingsController.js';

const router = express.Router();
const controller = new SettingsController();

// GET /api/settings
router.get('/settings', controller.getSettings.bind(controller));

// POST /api/settings
router.post('/settings', controller.createOrUpdateSettings.bind(controller));

export default router;