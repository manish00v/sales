import { PrismaClient } from '@prisma/client';

class DiscountRulesService {
    constructor() {
        this.prisma = new PrismaClient();
    }

    async getAllDiscountRules() {
        return await this.prisma.discountRules.findMany();
    }

    async getDiscountRulesById(discountId) {
        return await this.prisma.discountRules.findUnique({
            where: { discountId: discountId },
        });
    }

    async getDiscountRulesByDiscountIdAndProductId(discountId, productId) {
        return await this.prisma.discountRules.findMany({
            where: {
                AND: [
                    { productId: productId },
                    { discountId: discountId },
                ],
            },
        });
    }

    async createDiscountRules(discountRulesData) {
        return await this.prisma.discountRules.create({
            data: discountRulesData,
        });
    }

    async updateDiscountRules(discountId, discountRulesData) {
        return await this.prisma.discountRules.update({
            where: { discountId: discountId },
            data: discountRulesData,
        });
    }

    async checkProductExists(productId) {
        const product = await this.prisma.product.findUnique({
            where: { productId: productId },
        });
        return !!product; // Return true if product exists, false otherwise
    }
}

// Export the class itself
export default DiscountRulesService;