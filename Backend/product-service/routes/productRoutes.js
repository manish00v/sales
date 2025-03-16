import express from 'express';
import ProductController from '../controllers/productController.js';

const router = express.Router();

// Use the imported instance directly
router.get('/products', (req, res) => ProductController.getAllProducts(req, res));
router.get('/products/:productId', ProductController.getProductById.bind(ProductController)); 
router.get('/products/:productId/:category', ProductController.getProductByIdAndCategory.bind(ProductController));
router.post('/products', (req, res) => ProductController.createProduct(req, res));
router.put('/products/:id', ProductController.updateProduct.bind(ProductController));
export default router;