const prisma = require('../prisma/client');
const { 
  validateSalesChannel,
  validateSalesChannelUpdate 
} = require('../validations/salesChannelValidation');

class SalesChannelService {
  static async createSalesChannel(data) {
    const { error } = validateSalesChannel(data);
    if (error) {
      throw new Error(error.details.map(detail => detail.message).join(', '));
    }

    const existingChannel = await prisma.salesChannel.findUnique({
      where: { salesChannelId: data.salesChannelId }
    });

    if (existingChannel) {
      throw new Error('Sales Channel ID already exists');
    }

    return prisma.salesChannel.create({
      data
    });
  }

  static async getAllSalesChannels() {
    return prisma.salesChannel.findMany();
  }

  static async getSalesChannelById(salesChannelId) {
    return prisma.salesChannel.findUnique({
      where: { salesChannelId }
    });
  }

  static async updateSalesChannelById(salesChannelId, data) {
    const existingChannel = await prisma.salesChannel.findUnique({
      where: { salesChannelId }
    });

    if (!existingChannel) {
      throw new Error('Sales Channel not found');
    }

    const { error } = validateSalesChannelUpdate(data);
    if (error) {
      throw new Error(error.details.map(detail => detail.message).join(', '));
    }

    // Prevent changing the salesChannelId
    if (data.salesChannelId && data.salesChannelId !== salesChannelId) {
      throw new Error('Cannot change salesChannelId through this endpoint');
    }

    return prisma.salesChannel.update({
      where: { salesChannelId },
      data
    });
  }

  static async deleteSalesChannelById(salesChannelId) {
    const existingChannel = await prisma.salesChannel.findUnique({
      where: { salesChannelId }
    });

    if (!existingChannel) {
      throw new Error('Sales Channel not found');
    }

    return prisma.salesChannel.delete({
      where: { salesChannelId }
    });
  }
}

module.exports = SalesChannelService;