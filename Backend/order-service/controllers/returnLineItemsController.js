import ReturnLineItemsService from '../services/returnLineItemsService.js';

class ReturnLineItemsController {
  constructor() {
    this.returnLineItemsService = new ReturnLineItemsService();
  }

  // Get all return line items
  async getAllReturnLineItems(req, res) {
    try {
      const lineItems = await this.returnLineItemsService.getAllReturnLineItems();
      res.status(200).json(lineItems);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get return line item by lineItemId
  async getReturnLineItemByLineItemId(req, res) {
    try {
      const { lineItemId } = req.params;
      const lineItem = await this.returnLineItemsService.getReturnLineItemByLineItemId(lineItemId);
      
      if (!lineItem) {
        return res.status(404).json({ error: 'Return line item not found' });
      }

      res.status(200).json(lineItem);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }


  // Create a new return line item
  async createReturnLineItem(req, res) {
    try {
      const lineItemData = req.body;

      // Validate required fields
      if (!lineItemData.lineItemId || !lineItemData.replacementStatus || !lineItemData.productId || 
          !lineItemData.productName || !lineItemData.quantityReturned || 
          !lineItemData.conditionOfProduct || !lineItemData.originalPrice || 
          !lineItemData.refundAmount) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      const newLineItem = await this.returnLineItemsService.createReturnLineItem(lineItemData);
      res.status(201).json(newLineItem);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Get return line item by lineItemId and productId
  async getReturnLineItemByLineItemIdAndProductId(req, res) {
    try {
      const { lineItemId, productId } = req.params;
      const lineItem = await this.returnLineItemsService.getReturnLineItemByLineItemIdAndProductId(
        lineItemId,
        productId
      );

      if (!lineItem) {
        return res.status(404).json({ error: 'Return line item not found' });
      }

      res.status(200).json(lineItem);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Add this new method to your controller class
async updateReturnLineItem(req, res) {
  try {
      const { lineItemId } = req.params;
      const updateData = req.body;

      // Check if line item exists
      const existingItem = await this.returnLineItemsService.getReturnLineItemByLineItemId(lineItemId);
      if (!existingItem) {
          return res.status(404).json({
              exists: false,
              message: `Return line item ${lineItemId} not found`
          });
      }

      // Validate product exists if productId is being updated
      if (updateData.productId) {
          await this.returnLineItemsService.verifyProductExists(updateData.productId);
      }

      const updatedItem = await this.returnLineItemsService.updateReturnLineItem(lineItemId, updateData);
      
      res.status(200).json({
          exists: true,
          message: `Return line item ${lineItemId} updated successfully`,
          data: updatedItem
      });
  } catch (error) {
      res.status(400).json({
          exists: false,
          message: error.message
      });
  }
}

}

export default ReturnLineItemsController;