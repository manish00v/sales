import { PrismaClient } from '@prisma/client';

class PricingRulesService {
    constructor() {
        this.prisma = new PrismaClient();
    }

    async getAllPricingRules() {
        return await this.prisma.pricingRules.findMany();
    }

    async getPricingRulesById(id) {
        return await this.prisma.pricingRules.findUnique({
            where: { ruleId: parseInt(id) },
        });
    }

    async getPricingRulesByRuleIdAndProductId( ruleId, productId) {
        return await this.prisma.pricingRules.findMany({
            where: {
                AND: [
                    { productId: parseInt(productId) },
                    { ruleId: parseInt(ruleId) },
                ],
            },
        });
    }

    async createPricingRules(pricingRulesData) {
        return await this.prisma.pricingRules.create({
            data: pricingRulesData,
        });
    }

    async updatePricingRules(id, pricingRulesData) {
        return await this.prisma.pricingRules.update({
            where: { ruleId: parseInt(id) },
            data: pricingRulesData,
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
export default PricingRulesService;