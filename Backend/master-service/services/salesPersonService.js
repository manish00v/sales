const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { createSalesPersonSchema, updateSalesPersonSchema, salesPersonIdRegex } = require('../validations/salesPersonValidation');

class SalesPersonService {
  async createSalesPerson(data) {
    const { error } = createSalesPersonSchema.validate(data);
    if (error) {
      throw new Error(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
    }

    const existingSalesPerson = await prisma.salesPerson.findUnique({
      where: { SalesPersonId: data.SalesPersonId }
    });

    if (existingSalesPerson) {
      throw new Error('Sales Person ID already exists');
    }

    return prisma.salesPerson.create({
      data
    });
  }

  async getAllSalesPersons() {
    return prisma.salesPerson.findMany();
  }

  async getSalesPersonById(SalesPersonId) {
    if (!salesPersonIdRegex.test(SalesPersonId)) {
      throw new Error('Invalid Sales Person ID format');
    }

    const salesPerson = await prisma.salesPerson.findUnique({
      where: { SalesPersonId }
    });

    if (!salesPerson) {
      throw new Error('Sales Person not found');
    }

    return salesPerson;
  }

  async updateSalesPerson(SalesPersonId, data) {
    if (!salesPersonIdRegex.test(SalesPersonId)) {
      throw new Error('Invalid Sales Person ID format');
    }

    const { error } = updateSalesPersonSchema.validate(data);
    if (error) {
      throw new Error(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
    }

    // Ensure ID cannot be updated by removing it from data if present
    if (data.SalesPersonId) {
      delete data.SalesPersonId;
    }

    const salesPerson = await prisma.salesPerson.findUnique({
      where: { SalesPersonId }
    });

    if (!salesPerson) {
      throw new Error('Sales Person not found');
    }

    return prisma.salesPerson.update({
      where: { SalesPersonId },
      data
    });
  }

  async deleteSalesPerson(SalesPersonId) {
    if (!salesPersonIdRegex.test(SalesPersonId)) {
      throw new Error('Invalid Sales Person ID format');
    }

    const salesPerson = await prisma.salesPerson.findUnique({
      where: { SalesPersonId }
    });

    if (!salesPerson) {
      throw new Error('Sales Person not found');
    }

    return prisma.salesPerson.delete({
      where: { SalesPersonId }
    });
  }
}

module.exports = new SalesPersonService();