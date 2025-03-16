import CustomerService from '../services/customerService.js';

class CustomerController {
  constructor() {
    this.customerService = new CustomerService();
  }

  async getAllCustomers(req, res) {
    try {
      const customers = await this.customerService.getAllCustomers();
      res.status(200).json(customers);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  
  async getCustomerByCustomerId(req, res) {
    try {
      const { customerId } = req.params; // customerId is a string
      const customer = await this.customerService.getCustomerByCustomerId(parseInt(customerId, 10)); // Convert to integer
  
      if (!customer) {
        return res.status(404).json({ message: "Customer not found" });
      }
  
      res.json(customer);
    } catch (error) {
      console.error("Error fetching customer:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  
  async getCustomerByCustomerIdAndProductId(req, res) {
    try {
      const customerId = parseInt(req.params.customerId, 10); // Convert to Int
      const productId = req.params.productId; // Keep as String
      // const { customerId, productId } = req.params;
      const customer = await this.customerService.getCustomerByCustomerIdAndProductId(customerId, productId);
      if (!customer) {
        return res.status(404).json({ error: 'Customer not found' });
      }
      res.status(200).json(customer);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getCustomerByCustomerIdProductIdAndOrderId(req, res) {
    try {
      const customerId = parseInt(req.params.customerId, 10);
      const productId = req.params.productId;
      const orderId = parseInt(req.params.orderId, 10);
  
      const customer = await this.customerService.getCustomerByCustomerIdProductIdAndOrderId(
        customerId,
        productId,
        orderId
      );
  
      if (!customer) {
        return res.status(404).json({ error: 'Customer not found' });
      }
  
      res.status(200).json(customer);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateCustomerByCustomerIdAndProductId(req, res) {
    try {
      const customerId = parseInt(req.params.customerId, 10); // Convert to Int
      const productId = req.params.productId; // Keep as String
      // const { customerId, productId } = req.params;
      const updateData = req.body;
      const updatedCustomer = await this.customerService.updateCustomerByCustomerIdAndProductId(customerId, productId, updateData);
      res.status(200).json(updatedCustomer);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async createCustomer(req, res) {
    try {
      const customerData = req.body;
      const customer = await this.customerService.createCustomer(customerData);
      res.status(201).json(customer);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default CustomerController;