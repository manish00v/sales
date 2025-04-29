const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class InventoryBayService {
  static async getAllInventoryBays() {
    return await prisma.inventoryBay.findMany({
      include: {
        inventoryUnit: {
          select: {
            InventoryUnitId: true,
            InventoryUnitName: true
          }
        }
      }
    });
  }

  static async getInventoryBayById(id) {
    return await prisma.inventoryBay.findUnique({
      where: { id },
      include: {
        inventoryUnit: {
          select: {
            InventoryUnitId: true,
            InventoryUnitName: true
          }
        }
      }
    });
  }

  static async createInventoryBay(data) {
    // Check if InventoryUnit exists if provided
    if (data.inventoryUnitId) {
      const unitExists = await prisma.inventoryUnit.findUnique({
        where: { InventoryUnitId: data.inventoryUnitId }
      });
      if (!unitExists) {
        throw new Error('Inventory Unit ID does not exist');
      }
    }

    // Check for existing bay+unit combination
    if (data.inventoryUnitId) {
      const existing = await prisma.inventoryBay.findFirst({
        where: {
          InventoryBayId: data.InventoryBayId,
          inventoryUnitId: data.inventoryUnitId
        }
      });
      if (existing) {
        throw new Error('This Inventory Bay + Unit combination already exists');
      }
    }

    return await prisma.inventoryBay.create({
      data: {
        InventoryBayId: data.InventoryBayId,
        InventoryBayName: data.InventoryBayName,
        StockingType: data.StockingType,
        StreetAddress: data.StreetAddress,
        City: data.City,
        Region: data.Region,
        Country: data.Country,
        PinCode: data.PinCode,
        inventoryUnitId: data.inventoryUnitId || null
      },
      include: {
        inventoryUnit: {
          select: {
            InventoryUnitId: true,
            InventoryUnitName: true
          }
        }
      }
    });
  }

  static async updateInventoryBay(id, data) {
    if (data.InventoryBayId) {
      throw new Error('Inventory Bay ID cannot be changed');
    }

    if (data.inventoryUnitId) {
      const unitExists = await prisma.inventoryUnit.findUnique({
        where: { InventoryUnitId: data.inventoryUnitId }
      });
      if (!unitExists) {
        throw new Error('Inventory Unit ID does not exist');
      }
    }

    return await prisma.inventoryBay.update({
      where: { id },
      data: {
        InventoryBayName: data.InventoryUnitName,
        StockingType: data.StockingType,
        StreetAddress: data.StreetAddress,
        City: data.City,
        Region: data.Region,
        Country: data.Country,
        PinCode: data.PinCode,
        inventoryUnitId: data.inventoryUnitId
      }
    });
  }

  static async deleteInventoryBay(id) {
    return await prisma.inventoryBay.delete({
      where: { id }
    });
  }

  // Get all bays with a specific InventoryBayId
  static async getBaysByBayId(bayId) {
    return await prisma.inventoryBay.findMany({
      where: { InventoryBayId: bayId },
      include: {
        inventoryUnit: {
          select: {
            InventoryUnitId: true,
            InventoryUnitName: true
          }
        }
      }
    });
  }

  // Get all bays containing a specific inventory unit
  static async getBaysByUnitId(unitId) {
    return await prisma.inventoryBay.findMany({
      where: { inventoryUnitId: unitId }
    });
  }
}

module.exports = InventoryBayService;