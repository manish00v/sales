const prisma = require('../prisma/client');
const { 
  validateFactoryUnit,
  validateFactoryUnitUpdate 
} = require('../validations/factoryUnitValidation');

class FactoryUnitService {
  static async createFactoryUnit(data) {
    const { error } = validateFactoryUnit(data);
    if (error) {
      throw new Error(error.details.map(detail => detail.message).join(', '));
    }
  
    const businessEntity = await prisma.businessEntity.findUnique({
      where: { businessEntityCode: data.businessEntityCode }
    });
  
    if (!businessEntity) {
      throw new Error('Business Entity Code does not exist');
    }
  
    const existingUnit = await prisma.factoryUnit.findUnique({
      where: { factoryUnitCode: data.factoryUnitCode }
    });
  
    if (existingUnit) {
      throw new Error('Factory Unit Code already exists');
    }
  
    return prisma.factoryUnit.create({
      data
    });
  }

  static async getAllFactoryUnits() {
    return prisma.factoryUnit.findMany();
  }

  static async getFactoryUnitByCode(code) {
    return prisma.factoryUnit.findUnique({
      where: { factoryUnitCode: code }
    });
  }

  static async updateFactoryUnitByCode(code, data) {
    const existingUnit = await prisma.factoryUnit.findUnique({
      where: { factoryUnitCode: code }
    });

    if (!existingUnit) {
      throw new Error('Factory Unit not found');
    }

    const { error } = validateFactoryUnitUpdate(data);
    if (error) {
      throw new Error(error.details.map(detail => detail.message).join(', '));
    }

    if (data.factoryUnitCode && data.factoryUnitCode !== code) {
      throw new Error('Factory Unit Code cannot be changed');
    }

    return prisma.factoryUnit.update({
      where: { factoryUnitCode: code },
      data
    });
  }

  static async deleteFactoryUnitByCode(code) {
    return prisma.factoryUnit.delete({
      where: { factoryUnitCode: code }
    });
  }
}

module.exports = FactoryUnitService;