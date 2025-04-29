const prisma = require('../prisma/client');
const { 
  validateDeliveryLocation,
  validateDeliveryLocationUpdate 
} = require('../validations/deliveryLocationValidation');

class DeliveryLocationService {
  static async createDeliveryLocation(data) {
    const { error } = validateDeliveryLocation(data);
    if (error) {
      throw new Error(error.details.map(detail => detail.message).join(', '));
    }

    const existingLocation = await prisma.deliveryLocation.findUnique({
      where: { deliveryLocationCode: data.deliveryLocationCode }
    });

    if (existingLocation) {
      throw new Error('Delivery Location Code already exists');
    }

    return prisma.deliveryLocation.create({
      data
    });
  }

  static async getAllDeliveryLocations() {
    return prisma.deliveryLocation.findMany();
  }

  static async getDeliveryLocationById(id) {
    return prisma.deliveryLocation.findUnique({
      where: { id: parseInt(id) }
    });
  }

  static async updateDeliveryLocation(id, data) {
    const existingLocation = await prisma.deliveryLocation.findUnique({
      where: { id: parseInt(id) }
    });

    if (!existingLocation) {
      throw new Error('Delivery Location not found');
    }

    const { error } = validateDeliveryLocationUpdate(data);
    if (error) {
      throw new Error(error.details.map(detail => detail.message).join(', '));
    }

    if (data.deliveryLocationCode) {
      delete data.deliveryLocationCode;
    }

    return prisma.deliveryLocation.update({
      where: { id: parseInt(id) },
      data
    });
  }

  static async deleteDeliveryLocation(id) {
    return prisma.deliveryLocation.delete({
      where: { id: parseInt(id) }
    });
  }
}

module.exports = DeliveryLocationService;