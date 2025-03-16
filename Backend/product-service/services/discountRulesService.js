import { PrismaClient } from '@prisma/client';

class DiscountRulesService {
    constructor() {
        this.prisma = new PrismaClient();
    }

    async getAllDiscountRules() {
        return await this.prisma.discountRules.findMany();
    }

    async getDiscountRulesById(id) {
        return await this.prisma.discountRules.findUnique({
            where: { discountId: parseInt(id) },
        });
    }

    async getDiscountRulesByDiscountIdAndProductId(discountId, productId) {
        return await this.prisma.discountRules.findMany({
            where: {
                AND: [
                    { productId: parseInt(productId) },
                    { discountId: parseInt(discountId) },
                ],
            },
        });
    }

    async createDiscountRules(discountRulesData) {
        return await this.prisma.discountRules.create({
            data: discountRulesData,
        });
    }

    async updateDiscountRules(id, discountRulesData) {
        return await this.prisma.discountRules.update({
            where: { discountId: parseInt(id) },
            data: discountRulesData,
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
export default DiscountRulesService;