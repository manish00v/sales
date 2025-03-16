import SalesPersonService from '../services/salesPersonService.js';

class SalesPersonController {
  constructor() {
    this.salesPersonService = new SalesPersonService();
  }

  // Get all sales persons
  async getAllSalesPersons(req, res) {
    try {
      const salesPersons = await this.salesPersonService.getAllSalesPersons();
      res.status(200).json(salesPersons);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get sales person by salesPersonId
  async getSalesPersonBySalesPersonId(req, res) {
    try {
      const { salesPersonId } = req.params;

      // Validate salesPersonId
      const parsedSalesPersonId = parseInt(salesPersonId, 10);
      if (isNaN(parsedSalesPersonId)) {
        return res.status(400).json({ error: 'Invalid salesPersonId. Must be a number.' });
      }

      const salesPerson = await this.salesPersonService.getSalesPersonBySalesPersonId(parsedSalesPersonId);
      if (!salesPerson) {
        return res.status(404).json({ error: 'Sales person not found' });
      }

      res.status(200).json(salesPerson);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get sales person by customerId
  async getSalesPersonByCustomerId(req, res) {
    try {
      const { customerId } = req.params;

      // Validate customerId
      const parsedCustomerId = parseInt(customerId, 10);
      if (isNaN(parsedCustomerId)) {
        return res.status(400).json({ error: 'Invalid customerId. Must be a number.' });
      }

      const salesPerson = await this.salesPersonService.getSalesPersonByCustomerId(parsedCustomerId);
      if (!salesPerson) {
        return res.status(404).json({ error: 'Sales person not found for this customer' });
      }

      res.status(200).json(salesPerson);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get sales person by orderId
  async getSalesPersonByOrderId(req, res) {
    try {
      const { orderId } = req.params;

      // Validate orderId
      const parsedOrderId = parseInt(orderId, 10);
      if (isNaN(parsedOrderId)) {
        return res.status(400).json({ error: 'Invalid orderId. Must be a number.' });
      }

      const salesPerson = await this.salesPersonService.getSalesPersonByOrderId(parsedOrderId);
      if (!salesPerson) {
        return res.status(404).json({ error: 'Sales person not found for this order' });
      }

      res.status(200).json(salesPerson);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get sales person by productId
  async getSalesPersonByProductId(req, res) {
    try {
      const { productId } = req.params;

      // Validate productId
      const parsedProductId = parseInt(productId, 10);
      if (isNaN(parsedProductId)) {
        return res.status(400).json({ error: 'Invalid productId. Must be a number.' });
      }

      const salesPerson = await this.salesPersonService.getSalesPersonByProductId(parsedProductId);
      if (!salesPerson) {
        return res.status(404).json({ error: 'Sales person not found for this product' });
      }

      res.status(200).json(salesPerson);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Create a new sales person
  async createSalesPerson(req, res) {
    try {
      const salesPersonData = req.body;
  
      // Validate required fields
      if (!salesPersonData.customerId || !salesPersonData.orderId || !salesPersonData.productId || !salesPersonData.salesPersonName || !salesPersonData.emailId || !salesPersonData.phoneNumber || !salesPersonData.region || !salesPersonData.target) {
        return res.status(400).json({ error: 'All fields are required' });
      }
  
      // Convert IDs to integers
      const parsedCustomerId = parseInt(salesPersonData.customerId, 10);
      const parsedOrderId = parseInt(salesPersonData.orderId, 10);
      const parsedProductId = parseInt(salesPersonData.productId, 10);
  
      if (isNaN(parsedCustomerId) || isNaN(parsedOrderId) || isNaN(parsedProductId)) {
        return res.status(400).json({ error: 'Invalid customerId, orderId, or productId. Must be numbers.' });
      }
  
      const formattedData = {
        ...salesPersonData,
        customerId: parsedCustomerId,
        orderId: parsedOrderId,
        productId: parsedProductId,
      };
  
      const newSalesPerson = await this.salesPersonService.createSalesPerson(formattedData);
      res.status(201).json(newSalesPerson);
    } catch (error) {
      res.status(400).json({ error: error.message }); // Return 400 for validation errors
    }
  }

  async getSalesPersonBySalesPersonIdAndCustomerId(req, res) {
    try {
      const { salesPersonId, customerId } = req.params;
  
      // Validate IDs
      const parsedSalesPersonId = parseInt(salesPersonId, 10);
      const parsedCustomerId = parseInt(customerId, 10);
  
      if (isNaN(parsedSalesPersonId)) {
        return res.status(400).json({ error: 'Invalid salesPersonId. Must be a number.' });
      }
      if (isNaN(parsedCustomerId)) {
        return res.status(400).json({ error: 'Invalid customerId. Must be a number.' });
      }
  
      // Fetch the sales person
      const salesPerson = await this.salesPersonService.getSalesPersonBySalesPersonIdAndCustomerId(
        parsedSalesPersonId,
        parsedCustomerId
      );
  
      if (!salesPerson) {
        return res.status(404).json({ error: 'Sales person not found' });
      }
  
      res.status(200).json(salesPerson);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Update sales person by salesPersonId and customerId
  async updateSalesPersonBySalesPersonIdAndCustomerId(req, res) {
    try {
      const { salesPersonId, customerId } = req.params;
      const updateData = req.body;

      // Validate IDs
      const parsedSalesPersonId = parseInt(salesPersonId, 10);
      const parsedCustomerId = parseInt(customerId, 10);
      
      if (isNaN(parsedSalesPersonId)) {
        return res.status(400).json({ error: 'Invalid salesPersonId. Must be a number.' });
      }
      if (isNaN(parsedCustomerId)) {
        return res.status(400).json({ error: 'Invalid customerId. Must be a number.' });
      }

      const updatedSalesPerson = await this.salesPersonService.updateSalesPersonBySalesPersonIdAndCustomerId(
        parsedSalesPersonId,
        parsedCustomerId,
        updateData
      );

      if (!updatedSalesPerson) {
        return res.status(404).json({ error: 'Sales person not found' });
      }

      res.status(200).json(updatedSalesPerson);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get sales person by composite keys (salesPersonId, customerId, orderId, productId)
  async getSalesPersonByCompositeKeys(req, res) {
    try {
      const { salesPersonId, customerId, orderId, productId } = req.params;

      // Validate IDs
      const parsedSalesPersonId = parseInt(salesPersonId, 10);
      const parsedCustomerId = parseInt(customerId, 10);
      const parsedOrderId = parseInt(orderId, 10);
      const parsedProductId = parseInt(productId, 10);

      if (isNaN(parsedSalesPersonId) || isNaN(parsedCustomerId) || isNaN(parsedOrderId) || isNaN(parsedProductId)) {
        return res.status(400).json({ error: 'Invalid IDs. Must be numbers.' });
      }

      const salesPerson = await this.salesPersonService.getSalesPersonByCompositeKeys(
        parsedSalesPersonId,
        parsedCustomerId,
        parsedOrderId,
        parsedProductId
      );

      if (!salesPerson) {
        return res.status(404).json({ error: 'Sales person not found' });
      }

      res.status(200).json(salesPerson);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default SalesPersonController;