import { PrismaClient } from '@prisma/client';

class DiscountService {
    constructor() {
        this.prisma = new PrismaClient();
    }

    // Get all discounts
    async getAllDiscounts() {
        try {
            return await this.prisma.discount.findMany();
        } catch (error) {
            console.error("Error fetching all discounts:", error);
            throw error;
        }
    }

    // Get a discount by discountId
    async getDiscountById(discountId) {
        try {
            return await this.prisma.discount.findUnique({
                where: { discountId: discountId },
            });
        } catch (error) {
            console.error("Error fetching discount by ID:", error);
            throw error;
        }
    }

    // Get discounts by discountId and productId
    async getDiscountByDiscountIdAndProductId(discountId, productId) {
        try {
            return await this.prisma.discount.findMany({
                where: {
                    AND: [
                        { productId: productId },
                        { discountId: discountId },
                    ],
                },
            });
        } catch (error) {
            console.error("Error fetching discount by discountId and productId:", error);
            throw error;
        }
    }

    // Check if a discount exists by discountId
    async checkDiscountExists(discountId) {
        try {
            const discount = await this.prisma.discount.findUnique({
                where: { discountId },
            });
            return !!discount; // Return true if discount exists, false otherwise
        } catch (error) {
            console.error("Error checking discount existence:", error);
            throw error;
        }
    }

    // Create a new discount
    async createDiscount(discountData) {
        try {
            // Check if discountId already exists
            const discountExists = await this.checkDiscountExists(discountData.discountId);
            if (discountExists) {
                throw new Error(`Discount ID ${discountData.discountId} already exists in the Discount table. Please choose a new Discount ID.`);
            }

            // Create the discount
            const newDiscount = await this.prisma.discount.create({
                data: discountData,
            });
            return newDiscount;
        } catch (error) {
            console.error("Error creating discount:", error);
            throw error;
        }
    }

    // Update an existing discount
    async updateDiscount(discountId, discountData) {
        try {
            return await this.prisma.discount.update({
                where: { discountId: discountId },
                data: discountData,
            });
        } catch (error) {
            console.error("Error updating discount:", error);
            throw error;
        }
    }

    // Check if a product exists
    async checkProductExists(productId) {
        try {
            const product = await this.prisma.product.findUnique({
                where: { productId: productId }, // Ensure productId matches the schema type
            });
            return !!product; // Return true if product exists, false otherwise
        } catch (error) {
            console.error("Error checking if product exists:", error);
            throw error;
        }
    }
}

// Export the class itself
export default DiscountService;