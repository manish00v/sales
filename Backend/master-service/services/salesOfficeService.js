const prisma = require('../prisma/client');
const { 
  validateSalesOffice,
  validateSalesOfficeUpdate 
} = require('../validations/salesOfficeValidation');

class SalesOfficeService {
  static async createSalesOffice(data) {
    const { error } = validateSalesOffice(data);
    if (error) {
      throw new Error(error.details.map(detail => detail.message).join(', '));
    }

    const existingOffice = await prisma.salesOffice.findUnique({
      where: { salesOfficeCode: data.salesOfficeCode }
    });

    if (existingOffice) {
      throw new Error('Sales Office Code already exists');
    }

    return prisma.salesOffice.create({
      data
    });
  }

  static async getAllSalesOffices() {
    return prisma.salesOffice.findMany();
  }

  static async getSalesOfficeById(id) {
    return prisma.salesOffice.findUnique({
      where: { id: parseInt(id) }
    });
  }

  static async updateSalesOffice(id, data) {
    const existingOffice = await prisma.salesOffice.findUnique({
      where: { id: parseInt(id) }
    });

    if (!existingOffice) {
      throw new Error('Sales Office not found');
    }

    const { error } = validateSalesOfficeUpdate(data);
    if (error) {
      throw new Error(error.details.map(detail => detail.message).join(', '));
    }

    if (data.salesOfficeCode) {
      delete data.salesOfficeCode;
    }

    return prisma.salesOffice.update({
      where: { id: parseInt(id) },
      data
    });
  }

  static async deleteSalesOffice(id) {
    return prisma.salesOffice.delete({
      where: { id: parseInt(id) }
    });
  }
}

module.exports = SalesOfficeService;