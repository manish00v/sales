import * as settingsService from '../services/settingsService.js';

class SettingsController {
  async getSettings(req, res) {
    try {
      const settings = await settingsService.getSettings();
      // Return default settings if none exist in database
      res.status(200).json(settings || {
        companyName: '',
        companyAddress: '',
        timezone: 'UTC'
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async createOrUpdateSettings(req, res) {
    try {
      const { companyName, companyAddress, timezone } = req.body;
      
      if (!companyName || !companyAddress || !timezone) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      const settings = await settingsService.createOrUpdateSettings({
        companyName,
        companyAddress,
        timezone
      });
      
      return res.status(200).json(settings);
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ message: error.message });
    }
  }
}
export default SettingsController;