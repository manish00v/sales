import * as settingsService from '../services/settingsService.js';

class SettingsController {
  async getSettings(req, res) {
    try {
      const settings = await settingsService.getSettings();
      res.status(200).json(settings || {
        companyName: '',
        companyAddress: '',
        timezone: 'UTC'
      });
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