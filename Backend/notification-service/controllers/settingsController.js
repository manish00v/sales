import * as settingsService from '../services/settingsService.js';

class SettingsController {
  async getSettings(req, res) {
    try {
      const settings = await settingsService.getSettings();
      res.status(200).json(settings);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async createSettings(req, res) {
    try {
      const { companyName, companyAddress, timezone } = req.body;
      const newSettings = await settingsService.createSettings({
        companyName,
        companyAddress,
        timezone,
      });
      res.status(201).json(newSettings);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateSettings(req, res) {
    try {
      const { companyName, companyAddress, timezone } = req.body;
      const updatedSettings = await settingsService.updateSettings({
        companyName,
        companyAddress,
        timezone,
      });
      res.status(200).json(updatedSettings);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default SettingsController;