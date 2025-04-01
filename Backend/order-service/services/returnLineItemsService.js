import { PrismaClient } from '@prisma/client';
import axios from 'axios';

class ReturnLineItemsService {
  constructor() {
    this.prisma = new PrismaClient();
    this.productServiceUrl = process.env.PRODUCT_SERVICE_URL || 'http://localhost:3001/api/products';
  }

  async verifyProductExists(productId) {
    try {
      const response = await axios.get(`${this.productServiceUrl}/${productId}`, {
        timeout: 5000,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      if (response.status === 200) {
        if (response.data.exists !== undefined) {
          if (response.data.exists) return true;
          throw new Error(`Product ${productId} not found`);
        }
        if (response.data.id || response.data.productId) {
          return true;
        }
        throw new Error("Invalid product data format");
      }
      throw new Error(`Product service returned status ${response.status}`);
    } catch (error) {
      if (error.response?.status === 404) {
        throw new Error(`Product ${productId} not found`);
      }
      throw new Error(`Product verification failed: ${error.message}`);
    }
  }

  // Get all return line items
  async getAllReturnLineItems() {
    try {
      return await this.prisma.returnLineItem.findMany({
        orderBy: {
          createdAt: 'desc',
        },
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Get return line item by lineItemId
  async getReturnLineItemByLineItemId(lineItemId) {
    try {
      return await this.prisma.returnLineItem.findUnique({
        where: { lineItemId },
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  

  // Get return line item by productId
  async getReturnLineItemByProductId(productId) {
    try {
      return await this.prisma.returnLineItem.findFirst({
        where: { productId },
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Create a new return line item
  async createReturnLineItem(lineItemData) {
    try {
      const { lineItemId, productId } = lineItemData;

      // Check for duplicate line item ID
      const existingLineItem = await this.prisma.returnLineItem.findUnique({
        where: { lineItemId }
      });

      if (existingLineItem) {
        throw new Error(`Line item ID ${lineItemId} already exists`);
      }

      // Validate product exists via API call
      await this.verifyProductExists(productId);

      // Create the return line item
      return await this.prisma.returnLineItem.create({
        data: {
          lineItemId: lineItemData.lineItemId,
          replacementStatus: lineItemData.replacementStatus,
          productId: lineItemData.productId,
          productName: lineItemData.productName,
          quantityReturned: lineItemData.quantityReturned,
          conditionOfProduct: lineItemData.conditionOfProduct,
          originalPrice: lineItemData.originalPrice,
          refundAmount: lineItemData.refundAmount,
          replacementStatus: lineItemData.replacementStatus || 'Pending'
        }
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Get return line item by lineItemId and productId
  async getReturnLineItemByLineItemIdAndProductId(lineItemId, productId) {
    try {
      return await this.prisma.returnLineItem.findFirst({
        where: {
          lineItemId,
          productId,
        },
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Add this new method to your service class
  async updateReturnLineItem(lineItemId, updateData) {
    try {
      // Convert numeric fields
      const processedData = {
        ...updateData,
        quantityReturned: updateData.quantityReturned ? Number(updateData.quantityReturned) : undefined,
        originalPrice: updateData.originalPrice ? parseFloat(updateData.originalPrice) : undefined,
        refundAmount: updateData.refundAmount ? parseFloat(updateData.refundAmount) : undefined
      };
  
      return await this.prisma.returnLineItem.update({
        where: { lineItemId },
        data: processedData
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new Error(`Return line item ${lineItemId} not found`);
      }
      throw error;
    }
  }

}

export default ReturnLineItemsService;