import { PrismaClient } from '@prisma/client';

class CustomerService {
  constructor() {
    this.prisma = new PrismaClient();
  }

  async getAllCustomers() {
    return this.prisma.customer.findMany();
  }

  async getCustomerByCustomerId(customerId) {
    return this.prisma.customer.findUnique({
      where: { customerId } // Pass directly
    });
  }

  async getCustomerByCustomerIdAndProductId(customerId, productId) {
    return this.prisma.customer.findUnique({
      where: { customerId, productId },
    });
  }

  async getCustomerByCustomerIdProductIdAndOrderId(customerId, productId, orderId) {
    return this.prisma.customer.findFirst({
      where: {
        customerId: customerId,
        productId: productId,
        orderId: orderId,
      },
    });
  }

  async updateCustomerByCustomerIdAndProductId(customerId, productId, updateData) {
    return this.prisma.customer.update({
      where: { customerId, productId },
      data: updateData,
    });
  }

  async createCustomer(customerData) {
    return this.prisma.customer.create({
      data: customerData,
    });
  }
}

export default CustomerService;