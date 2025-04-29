const { PrismaClient } = require('@prisma/client');
const axios = require('axios');
const prisma = new PrismaClient();

const FACTORY_UNIT_SERVICE_URL = process.env.FACTORY_UNIT_SERVICE_URL || 'http://factory-unit-service:3000';

class InventoryUnitService {
  static async validateFactoryUnitCode(factoryUnitCode) {
    if (!factoryUnitCode) return true; // Skip if not provided
    
    try {
      const response = await axios.get(
        `http://localhost:3003/api/factory-units/${factoryUnitCode}`,
        { timeout: 5000 }
      );
      return response.status === 200;
    } catch (error) {
      if (error.response?.status === 404) {
        return false;
      }
      throw new Error(`Factory Unit service error: ${error.message}`);
    }
  }

  static async getAllInventoryUnits() {
    return await prisma.inventoryUnit.findMany();
  }

  static async getInventoryUnitById(id) {
    return await prisma.inventoryUnit.findUnique({
      where: { id }
    });
  }

  static async createInventoryUnit(data) {
    // Validate FactoryUnitCode exists if provided
    if (data.factoryUnitCode) {
      const isValid = await this.validateFactoryUnitCode(data.factoryUnitCode);
      if (!isValid) {
        throw new Error('Factory Unit Code does not exist');
      }
    }

    // Check if InventoryUnitId already exists
    const existingUnit = await prisma.inventoryUnit.findUnique({
      where: { InventoryUnitId: data.InventoryUnitId }
    });

    if (existingUnit) {
      throw new Error('Inventory Unit ID already exists');
    }

    return await prisma.inventoryUnit.create({
      data: {
        InventoryUnitId: data.InventoryUnitId,
        InventoryUnitName: data.InventoryUnitName,
        InventoryControl: data.InventoryControl,
        StreetAddress: data.StreetAddress,
        City: data.City,
        Region: data.Region,
        Country: data.Country,
        PinCode: data.PinCode,
        factoryUnitCode: data.factoryUnitCode || null
      }
    });
  }

  static async updateInventoryUnit(id, data) {
    // Prevent updating InventoryUnitId
    if (data.InventoryUnitId) {
      throw new Error('Inventory Unit ID cannot be changed');
    }

    // Validate FactoryUnitCode exists if provided
    if (data.factoryUnitCode) {
      const isValid = await this.validateFactoryUnitCode(data.factoryUnitCode);
      if (!isValid) {
        throw new Error('Factory Unit Code does not exist');
      }
    }

    return await prisma.inventoryUnit.update({
      where: { id },
      data: {
        InventoryUnitName: data.InventoryUnitName,
        InventoryControl: data.InventoryControl,
        StreetAddress: data.StreetAddress,
        City: data.City,
        Region: data.Region,
        Country: data.Country,
        PinCode: data.PinCode,
        factoryUnitCode: data.factoryUnitCode
      }
    });
  }

  static async deleteInventoryUnit(id) {
    return await prisma.inventoryUnit.delete({
      where: { id }
    });
  }

  static async getInventoryUnitsByFactoryCode(factoryUnitCode) {
    // First validate the factory unit exists
    const isValid = await this.validateFactoryUnitCode(factoryUnitCode);
    if (!isValid) {
      throw new Error('Factory Unit Code does not exist');
    }

    return await prisma.inventoryUnit.findMany({
      where: { factoryUnitCode }
    });
  }
}

module.exports = InventoryUnitService;