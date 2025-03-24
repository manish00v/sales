import { PrismaClient } from '@prisma/client';

class ProductService {
    constructor() {
        this.prisma = new PrismaClient();
    }

    async getAllProducts() {
        return await this.prisma.product.findMany();
    }

    async getProductById(productId) {
        return await this.prisma.product.findUnique({ // Use this.prisma
            where: { productId: productId},
        });
    }

    async getProductByIdAndCategory(productId, category) {
        return await this.prisma.product.findMany({
            where: {
                AND: [
                    { productId: productId },
                    { category: category },
                ],
            },
        });
    }

    async createProduct(productData) {
        return await this.prisma.product.create({
            data: productData,
        });
    }

    async updateProduct(productId, productData) {
        return await this.prisma.product.update({
            where: { productId: productId},
            data: productData,
        });
    }
}

// Export the class itself, not an instance
export default ProductService;