import { PrismaClient } from '@prisma/client';

class PricingRulesService {
    constructor() {
        this.prisma = new PrismaClient();
    }

    async getAllPricingRules() {
        return await this.prisma.pricingRules.findMany();
    }

    async getPricingRulesById(ruleId) {
        return await this.prisma.pricingRules.findUnique({
            where: { ruleId: ruleId },
        });
    }

    async getPricingRulesByRuleIdAndProductId( ruleId, productId) {
        return await this.prisma.pricingRules.findMany({
            where: {
                AND: [
                    { productId: productId },
                    { ruleId: ruleId },
                ],
            },
        });
    }

    async createPricingRules(pricingRulesData) {
        return await this.prisma.pricingRules.create({
            data: pricingRulesData,
        });
    }

    async updatePricingRules(ruleId, pricingRulesData) {
        return await this.prisma.pricingRules.update({
            where: { ruleId:ruleId },
            data: pricingRulesData,
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
export default PricingRulesService;