import LineItemsService from '../services/lineItemsService.js';

class LineItemsController {
  constructor() {
    this.lineItemsService = new LineItemsService();
  }

  async createLineItem(req, res) {
    try {
      const lineItemData = req.body;
      const lineItem = await this.lineItemsService.createLineItem(lineItemData);
      res.status(201).json(lineItem);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getLineItemById(req, res) {
    try {
      const { orderLineItemId } = req.params;
      const lineItem = await this.lineItemsService.getLineItemById(parseInt(orderLineItemId, 10));
      if (!lineItem) {
        return res.status(404).json({ error: 'LineItem not found' });
      }
      res.status(200).json(lineItem);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getLineItemByorderLineItemIdAndProductId(req, res) {
    try {
      const orderLineItemId = parseInt(req.params.orderLineItemId, 10); // Convert to Int
      const productId = parseInt(req.params.productId, 10) // Keep as String
  
      const lineItem = await this.lineItemsService.getLineItemByorderLineItemIdAndProductId(orderLineItemId, productId);
      if (!lineItem) {
        return res.status(404).json({ error: 'LineItem not found' });
      }
      res.status(200).json(lineItem);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateLineItem(req, res) {
    try {
      const { orderLineItemId } = req.params;
      const updateData = req.body;
      const updatedLineItem = await this.lineItemsService.updateLineItem(parseInt(orderLineItemId, 10), updateData);
      res.status(200).json(updatedLineItem);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteLineItem(req, res) {
    try {
      const { orderLineItemId } = req.params;
      await this.lineItemsService.deleteLineItem(parseInt(orderLineItemId, 10));
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAllLineItems(req, res) {
    try {
      const lineItems = await this.lineItemsService.getAllLineItems();
      res.status(200).json(lineItems);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default LineItemsController;