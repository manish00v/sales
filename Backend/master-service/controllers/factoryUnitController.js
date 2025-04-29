const FactoryUnitService = require('../services/factoryUnitService');
const { 
  validateFactoryUnit,
  validateFactoryUnitUpdate 
} = require('../validations/factoryUnitValidation');

class FactoryUnitController {
  static async createFactoryUnit(req, res) {
    try {
      const { error } = validateFactoryUnit(req.body);
      if (error) throw new Error(error.details.map(detail => detail.message).join(', '));
      
      const factoryUnit = await FactoryUnitService.createFactoryUnit(req.body);
      res.status(201).json(factoryUnit);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getAllFactoryUnits(req, res) {
    try {
      const factoryUnits = await FactoryUnitService.getAllFactoryUnits();
      res.json(factoryUnits);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getFactoryUnitByCode(req, res) {
    try {
      const factoryUnit = await FactoryUnitService.getFactoryUnitByCode(req.params.code);
      if (!factoryUnit) {
        return res.status(404).json({ error: 'Factory Unit not found' });
      }
      res.json(factoryUnit);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateFactoryUnitByCode(req, res) {
    try {
      const { error } = validateFactoryUnitUpdate(req.body);
      if (error) throw new Error(error.details.map(detail => detail.message).join(', '));
      
      const factoryUnit = await FactoryUnitService.updateFactoryUnitByCode(req.params.code, req.body);
      if (!factoryUnit) {
        return res.status(404).json({ error: 'Factory Unit not found' });
      }
      res.json(factoryUnit);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async deleteFactoryUnitByCode(req, res) {
    try {
      const factoryUnit = await FactoryUnitService.deleteFactoryUnitByCode(req.params.code);
      if (!factoryUnit) {
        return res.status(404).json({ error: 'Factory Unit not found' });
      }
      res.json({ message: 'Factory Unit deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = FactoryUnitController;