const DeliveryLocationService = require('../services/deliveryLocationService');
const { 
  validateDeliveryLocation,
  validateDeliveryLocationUpdate 
} = require('../validations/deliveryLocationValidation');

class DeliveryLocationController {
  static async createDeliveryLocation(req, res) {
    try {
      const { error } = validateDeliveryLocation(req.body);
      if (error) throw new Error(error.details.map(detail => detail.message).join(', '));
      
      const deliveryLocation = await DeliveryLocationService.createDeliveryLocation(req.body);
      res.status(201).json(deliveryLocation);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getAllDeliveryLocations(req, res) {
    try {
      const deliveryLocations = await DeliveryLocationService.getAllDeliveryLocations();
      res.json(deliveryLocations);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getDeliveryLocationById(req, res) {
    try {
      const deliveryLocation = await DeliveryLocationService.getDeliveryLocationById(req.params.id);
      if (!deliveryLocation) {
        return res.status(404).json({ error: 'Delivery Location not found' });
      }
      res.json(deliveryLocation);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateDeliveryLocation(req, res) {
    try {
      const { error } = validateDeliveryLocationUpdate(req.body);
      if (error) throw new Error(error.details.map(detail => detail.message).join(', '));
      
      const deliveryLocation = await DeliveryLocationService.updateDeliveryLocation(req.params.id, req.body);
      if (!deliveryLocation) {
        return res.status(404).json({ error: 'Delivery Location not found' });
      }
      res.json(deliveryLocation);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async deleteDeliveryLocation(req, res) {
    try {
      const deliveryLocation = await DeliveryLocationService.deleteDeliveryLocation(req.params.id);
      if (!deliveryLocation) {
        return res.status(404).json({ error: 'Delivery Location not found' });
      }
      res.json({ message: 'Delivery Location deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = DeliveryLocationController;