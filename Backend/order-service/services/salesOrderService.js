import { PrismaClient } from '@prisma/client';

class SalesOrderService {
    constructor() {
        this.prisma = new PrismaClient(); // Initialize Prisma Client
    }

    async getAllSalesOrders() {
        return await this.prisma.salesOrder.findMany();
    }

    async getSalesOrderById(orderId) {
        try {
            const salesOrder = await this.prisma.salesOrder.findUnique({ // Use `this.prisma`
                where: {
                    orderId: orderId, // Convert to integer
                },
            });
            return salesOrder;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getSalesOrderByOrderIdAndCustomerId(orderId, customerId) {
      // Fetch the sales order from the database
      const salesOrder = await this.prisma.salesOrder.findFirst({
        where: {
          orderId: orderId, // Filter by orderId
          customerId: customerId, // Filter by customerId
        },
      });
    
      return salesOrder;
    }
  
    async createSalesOrder(salesOrderData) {
        return await this.prisma.salesOrder.create({
            data: salesOrderData,
        });
    }

    async updateCustomerByCustomerIdAndProductId(customerId, productId, updateData) {
      return this.prisma.customer.update({
        where: { customerId, productId },
        data: updateData,
      });
    }

    async updateSalesOrder(orderId, updateData) {
      // Check if the customerId exists in the Customer table
      if (updateData.customerId) {
        const customerExists = await this.prisma.customer.findUnique({
          where: { customerId: updateData.customerId },
        });
    
        if (!customerExists) {
          throw new Error(`Customer with ID ${updateData.customerId} does not exist.`);
        }
      }
    
      // Proceed with the update
      return this.prisma.salesOrder.update({
        where: { orderId: orderId },
        data: updateData,
      });
    }
     
    async checkCustomerExists(customerId) {
        const customer = await this.prisma.customer.findUnique({
            where: { customerId: customerId },
        });
        return !!customer; // Return true if customer exists, false otherwise
    }
}

// Export the class itself
export default SalesOrderService;