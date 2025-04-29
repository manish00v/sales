const SalesOfficeService = require('../services/salesOfficeService');
const { 
  validateSalesOffice,
  validateSalesOfficeUpdate 
} = require('../validations/salesOfficeValidation');

class SalesOfficeController {
  static async createSalesOffice(req, res) {
    try {
      const { error } = validateSalesOffice(req.body);
      if (error) throw new Error(error.details.map(detail => detail.message).join(', '));
      
      const salesOffice = await SalesOfficeService.createSalesOffice(req.body);
      res.status(201).json(salesOffice);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getAllSalesOffices(req, res) {
    try {
      const salesOffices = await SalesOfficeService.getAllSalesOffices();
      res.json(salesOffices);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getSalesOfficeById(req, res) {
    try {
      const salesOffice = await SalesOfficeService.getSalesOfficeById(req.params.id);
      if (!salesOffice) {
        return res.status(404).json({ error: 'Sales Office not found' });
      }
      res.json(salesOffice);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateSalesOffice(req, res) {
    try {
      const { error } = validateSalesOfficeUpdate(req.body);
      if (error) throw new Error(error.details.map(detail => detail.message).join(', '));
      
      const salesOffice = await SalesOfficeService.updateSalesOffice(req.params.id, req.body);
      if (!salesOffice) {
        return res.status(404).json({ error: 'Sales Office not found' });
      }
      res.json(salesOffice);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async deleteSalesOffice(req, res) {
    try {
      const salesOffice = await SalesOfficeService.deleteSalesOffice(req.params.id);
      if (!salesOffice) {
        return res.status(404).json({ error: 'Sales Office not found' });
      }
      res.json({ message: 'Sales Office deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = SalesOfficeController;