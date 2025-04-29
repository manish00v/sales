import { PrismaClient } from '@prisma/client';
import axios from 'axios';

class ReturnOrderService {
    constructor() {
        this.prisma = new PrismaClient();
        this.productServiceUrl = process.env.PRODUCT_SERVICE_URL || 'http://localhost:3001/api/products';
    }

    async verifyProductExists(productId) {
        try {
            const response = await axios.get(`${this.productServiceUrl}/${productId}`, {
                timeout: 5000,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });

            if (response.status === 200) {
                if (response.data.exists !== undefined) {
                    if (response.data.exists) return true;
                    throw new Error(`Product ${productId} not found`);
                }
                if (response.data.id || response.data.productId) {
                    return true;
                }
                throw new Error("Invalid product data format");
            }
            throw new Error(`Product service returned status ${response.status}`);
        } catch (error) {
            if (error.response?.status === 404) {
                throw new Error(`Product ${productId} not found`);
            }
            throw new Error(`Product verification failed: ${error.message}`);
        }
    }

    async createReturnOrder(returnOrderData) {
        try {
            const { returnOrderId, orderId, customerId, productId } = returnOrderData;

            // 1. Check for duplicate return order ID
            const existingReturnOrder = await this.prisma.returnOrder.findUnique({
                where: { returnOrderId }
            });

            if (existingReturnOrder) {
                throw new Error(`Return order ID ${returnOrderId} already exists`);
            }

            // 2. Validate sales order exists using Prisma
            const salesOrderExists = await this.prisma.salesOrder.findUnique({
                where: { orderId },
            });
            if (!salesOrderExists) {
                throw new Error(`Order ${orderId} not found`);
            }

            // 3. Validate customer exists using Prisma
            const customerExists = await this.prisma.customer.findUnique({
                where: { customerId },
            });
            if (!customerExists) {
                throw new Error(`Customer ${customerId} not found`);
            }

            // 4. Validate product exists via API call
            await this.verifyProductExists(productId);

            // 5. Create the return order
            return await this.prisma.returnOrder.create({
                data: {
                    returnOrderId: returnOrderData.returnOrderId,
                    orderId: returnOrderData.orderId,
                    customerId: returnOrderData.customerId,
                    productId: returnOrderData.productId,
                    reasonOfReturn: returnOrderData.reasonOfReturn || returnOrderData.reasonOfReturn,
                    totalRefundAmount: returnOrderData.totalRefundAmount,
                    returnDate: returnOrderData.returnDate ? new Date(returnOrderData.returnDate) : new Date(),
                    approvalStatus: returnOrderData.approvalStatus || 'Pending',
                    returnStatus: returnOrderData.returnStatus || 'Requested'
                },
                include: {
                    customer: true,
                    salesOrder: true
                }
            });

        } catch (error) {
            console.error("Return order creation failed:", error.message);
            throw error;
        }
    }

    async getAllReturnOrders() {
        try {
            return await this.prisma.returnOrder.findMany({
                include: {
                    customer: true,
                    salesOrder: true
                },
                orderBy: {
                    returnDate: 'desc',
                },
            });
        } catch (error) {
            console.error("Failed to fetch return orders:", error.message);
            throw error;
        }
    }

    async getReturnOrderById(returnOrderId) {
        try {
            const returnOrder = await this.prisma.returnOrder.findUnique({
                where: { returnOrderId },
                include: {
                    customer: true,
                    salesOrder: true
                },
            });

            if (!returnOrder) {
                throw new Error(`Return order ${returnOrderId} not found`);
            }

            return returnOrder;
        } catch (error) {
            console.error("Failed to fetch return order:", error.message);
            throw error;
        }
    }

    async getReturnOrderByIdAndCustomer(returnOrderId, customerId) {
        try {
            // 1. Validate customer exists
            const customer = await this.prisma.customer.findUnique({
                where: { customerId }
            });
            if (!customer) {
                throw new Error(`Customer ${customerId} not found`);
            }

            // 2. Fetch return order
            const returnOrder = await this.prisma.returnOrder.findUnique({
                where: { returnOrderId },
                include: {
                    customer: true,
                    salesOrder: true
                }
            });

            if (!returnOrder) {
                throw new Error(`Return order ${returnOrderId} not found`);
            }

            // 3. Verify ownership
            if (returnOrder.customerId !== customerId) {
                throw new Error(`Return order ${returnOrderId} does not belong to customer ${customerId}`);
            }

            return returnOrder;
        } catch (error) {
            console.error(`[ReturnOrderService] Error fetching return order ${returnOrderId} for customer ${customerId}:`, error.message);
            throw error; // Re-throw for controller handling
        }
    }
    
    async updateReturnOrder(returnOrderId, updateData) {
        try {
            // 1. Find existing return order
            const existingOrder = await this.prisma.returnOrder.findUnique({
                where: { returnOrderId },
            });

            if (!existingOrder) {
                throw new Error("Return order not found");
            }

            // 2. Validate updated references if provided
            if (updateData.orderId) {
                const orderExists = await this.prisma.salesOrder.findUnique({
                    where: { orderId: updateData.orderId },
                });
                if (!orderExists) {
                    throw new Error(`Order ${updateData.orderId} not found`);
                }
            }

            if (updateData.customerId) {
                const customerExists = await this.prisma.customer.findUnique({
                    where: { customerId: updateData.customerId },
                });
                if (!customerExists) {
                    throw new Error(`Customer ${updateData.customerId} not found`);
                }
            }

            if (updateData.productId) {
                await this.verifyProductExists(updateData.productId);
            }

            // 3. Prepare update data
            const updateValues = {
                orderId: updateData.orderId || existingOrder.orderId,
                customerId: updateData.customerId || existingOrder.customerId,
                productId: updateData.productId || existingOrder.productId,
                reasonOfReturn: updateData.reasonOfReturn || updateData.reasonOfReturn || existingOrder.reasonOfReturn,
                totalRefundAmount: updateData.totalRefundAmount || existingOrder.totalRefundAmount,
                returnDate: updateData.returnDate ? new Date(updateData.returnDate) : existingOrder.returnDate,
                approvalStatus: updateData.approvalStatus || existingOrder.approvalStatus,
                returnStatus: updateData.returnStatus || existingOrder.returnStatus
            };

            // 4. Update return order
            return await this.prisma.returnOrder.update({
                where: { returnOrderId },
                data: updateValues,
                include: {
                    customer: true,
                    salesOrder: true
                },
            });
        } catch (error) {
            console.error("Return order update failed:", error.message);
            throw error;
        }
    }
}

export default ReturnOrderService;