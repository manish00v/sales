import ProductService from '../services/productService.js';

class ProductController {
    constructor() {
        this.productService = new ProductService();
    }

    async getAllProducts(req, res) {
        try {
            const products = await this.productService.getAllProducts();
            res.json(products);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getProductById(req, res) {
        try {
            const { productId } = req.params;
            const product = await this.productService.getProductById(productId); // Use this.productService

            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }

            res.json(product);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getProductByIdAndCategory(req, res) {
        try {
            const { productId, category } = req.params;
            const product = await this.productService.getProductByIdAndCategory(productId, category);
            if (!product || product.length === 0) {
                return res.status(404).json({ error: 'Product not found for the given category' });
            }
            res.json(product);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async createProduct(req, res) {
        try {
            const newProduct = await this.productService.createProduct(req.body);
            res.status(201).json(newProduct);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateProduct(req, res) {
        try {
            const updatedProduct = await this.productService.updateProduct(req.params.id, req.body);
            if (!updatedProduct) {
                return res.status(404).json({ error: 'Product not found' });
            }
            res.json(updatedProduct);
        } catch (error) {
            if (error.code === 'P2025') {
                return res.status(404).json({ error: 'Product not found' });
            }
            res.status(500).json({ error: error.message });
        }
    }
}

// Export an instance of the class
export default new ProductController();