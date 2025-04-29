const { PrismaClient } = require('@prisma/client');
const axios = require('axios');
const prisma = new PrismaClient();

const FACTORY_UNIT_SERVICE_URL = process.env.FACTORY_UNIT_SERVICE_URL || 'http://factory-unit-service:3003';

class SourcingUnitService {
  static async validateFactoryUnit(factoryUnitCode) {
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

  static async getAllSourcingUnits() {
    try {
      return await prisma.sourcingUnit.findMany({
        include: {
          factoryUnit: {
            select: {
              factoryUnitName: true,
              factoryUnitCode: true
            }
          }
        }
      });
    } catch (error) {
      throw new Error(`Failed to fetch sourcing units: ${error.message}`);
    }
  }

  static async getSourcingUnitById(id) {
    try {
      return await prisma.sourcingUnit.findUnique({
        where: { id },
        include: {
          factoryUnit: {
            select: {
              factoryUnitName: true,
              factoryUnitCode: true
            }
          }
        }
      });
    } catch (error) {
      throw new Error(`Failed to fetch sourcing unit: ${error.message}`);
    }
  }

  // Updated createSourcingUnit method
static async createSourcingUnit(data) {
    try {
      const isValidFactoryUnit = await this.validateFactoryUnit(data.factoryUnitCode);
      if (!isValidFactoryUnit) {
        throw new Error('Factory Unit does not exist');
      }
  
      const existingUnit = await prisma.sourcingUnit.findFirst({
        where: {
          SourcingUnitId: data.SourcingUnitId,
          factoryUnitCode: data.factoryUnitCode
        }
      });
  
      if (existingUnit) {
        throw new Error('Sourcing Unit ID already exists for this Factory Unit');
      }
  
      return await prisma.sourcingUnit.create({
        data: {
          SourcingUnitId: data.SourcingUnitId,
          SourcingUnitDesc: data.SourcingUnitDesc,
          factoryUnitCode: data.factoryUnitCode
        }
        // Remove the include statement
      });
    } catch (error) {
      throw new Error(`Failed to create sourcing unit: ${error.message}`);
    }
  }

  static async updateSourcingUnit(id, data) {
    try {
      if (data.SourcingUnitId) {
        throw new Error('Sourcing Unit ID cannot be modified');
      }
      if (data.factoryUnitCode) {
        throw new Error('Factory Unit association cannot be modified');
      }

      return await prisma.sourcingUnit.update({
        where: { id },
        data: {
          SourcingUnitDesc: data.SourcingUnitDesc
        },
        include: {
          factoryUnit: {
            select: {
              factoryUnitName: true,
              factoryUnitCode: true
            }
          }
        }
      });
    } catch (error) {
      throw new Error(`Failed to update sourcing unit: ${error.message}`);
    }
  }

  static async deleteSourcingUnit(id) {
    try {
      return await prisma.sourcingUnit.delete({
        where: { id }
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new Error('Sourcing Unit not found');
      }
      throw new Error(`Failed to delete sourcing unit: ${error.message}`);
    }
  }
}

module.exports = SourcingUnitService;