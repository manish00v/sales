import { PrismaClient } from '@prisma/client';

class SalesPersonService {
  constructor() {
    this.prisma = new PrismaClient(); // Initialize Prisma Client
  }

  // Get all sales persons
  async getAllSalesPersons() {
    try {
      return await this.prisma.salesPerson.findMany();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Get sales person by salesPersonId
  async getSalesPersonBySalesPersonId(salesPersonId) {
    try {
      const salesPerson = await this.prisma.salesPerson.findUnique({
        where: {
          salesPersonId: salesPersonId, // Convert to integer
        },
      });
      return salesPerson;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Get sales person by customerId
  async getSalesPersonByCustomerId(customerId) {
    try {
      const salesPerson = await this.prisma.salesPerson.findFirst({
        where: {
          customerId: customerId, // Convert to integer
        },
      });
      return salesPerson;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Get sales person by orderId
  async getSalesPersonByOrderId(orderId) {
    try {
      const salesPerson = await this.prisma.salesPerson.findFirst({
        where: {
          orderId: orderId, // Convert to integer
        },
      });
      return salesPerson;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Get sales person by productId
  async getSalesPersonByProductId(productId) {
    try {
      const salesPerson = await this.prisma.salesPerson.findFirst({
        where: {
          productId: productId, // Convert to integer
        },
      });
      return salesPerson;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Create a new sales person
  async createSalesPerson(salesPersonData) {
    try {
      return await this.prisma.salesPerson.create({
        data: salesPersonData,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Update sales person by salesPersonId and customerId
  async updateSalesPersonBySalesPersonIdAndCustomerId(salesPersonId, customerId, updateData) {
    try {
      const salesPerson = await this.prisma.salesPerson.findFirst({
        where: {
          salesPersonId: salesPersonId,
          customerId: customerId,
        },
      });

      if (!salesPerson) {
        throw new Error('Sales person not found');
      }

      return await this.prisma.salesPerson.update({
        where: {
          salesPersonId: salesPersonId,
        },
        data: updateData,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Get sales person by composite keys (salesPersonId, customerId, orderId, productId)
  async getSalesPersonByCompositeKeys(salesPersonId, customerId, orderId, productId) {
    try {
      const salesPerson = await this.prisma.salesPerson.findFirst({
        where: {
          salesPersonId: salesPersonId,
          customerId: customerId,
          orderId: orderId,
          productId: productId,
        },
      });
      return salesPerson;
    } catch (error) {
      throw new Error(error.message);
    }
  }


async getSalesPersonBySalesPersonIdAndCustomerId(salesPersonId, customerId) {
    try {
      const salesPerson = await this.prisma.salesPerson.findFirst({
        where: {
          salesPersonId: salesPersonId,
          customerId: customerId,
        },
      });
      return salesPerson;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
export default SalesPersonService;