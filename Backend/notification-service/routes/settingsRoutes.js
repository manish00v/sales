import express from 'express';
import SettingsController from '../controllers/settingsController.js';

const router = express.Router();
const settingsController = new SettingsController();

// Corrected paths (use "/" instead of "/settings")
router.get('/', (req, res) => settingsController.getSettings(req, res));
router.post('/', (req, res) => settingsController.createSettings(req, res));
router.put('/', settingsController.updateSettings.bind(settingsController));

export default router;