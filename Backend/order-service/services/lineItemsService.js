import { PrismaClient } from '@prisma/client';

class LineItemsService {
  constructor() {
    this.prisma = new PrismaClient();
  }

  async createLineItem(lineItemData) {
    return this.prisma.lineItems.create({
      data: lineItemData,
    });
  }

  async getLineItemById(orderLineItemId) {
    return this.prisma.lineItems.findUnique({
      where: { orderLineItemId },
    });
  }

async getLineItemByorderLineItemIdAndProductId(orderLineItemId, productId) {
  return this.prisma.lineItems.findFirst({
    where: {
      orderLineItemId,
      productId,
    },
  });
}

  async updateLineItem(orderLineItemId, updateData) {
    return this.prisma.lineItems.update({
      where: { orderLineItemId },
      data: updateData,
    });
  }

  async deleteLineItem(orderLineItemId) {
    return this.prisma.lineItems.delete({
      where: { orderLineItemId },
    });
  }

  async getAllLineItems() {
    return this.prisma.lineItems.findMany();
  }
}

export default LineItemsService;