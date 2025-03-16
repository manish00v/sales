import { PrismaClient } from '@prisma/client';

class DiscountService {
    constructor() {
        this.prisma = new PrismaClient();
    }

    async getAllDiscounts() {
        return await this.prisma.discount.findMany();
    }

    async getDiscountById(id) {
        return await this.prisma.discount.findUnique({
            where: { discountId: parseInt(id) },
        });
    }

    async getDiscountByDiscountIdAndProductId(discountId, productId) {
        return await this.prisma.discount.findMany({
            where: {
                AND: [
                    { productId: parseInt(productId) },
                    { discountId: parseInt(discountId) },
                ],
            },
        });
    }

    async createDiscount(discountData) {
        return await this.prisma.discount.create({
            data: discountData,
        });
    }

    async updateDiscount(id, discountData) {
        return await this.prisma.discount.update({
            where: { discountId: parseInt(id) },
            data: discountData,
        });
    }

    async checkProductExists(productId) {
        const product = await this.prisma.product.findUnique({
            where: { productId: parseInt(productId) },
        });
        return !!product; // Return true if product exists, false otherwise
    }
}

// Export the class itself
export default DiscountService;