import express from 'express';
import DiscountController from '../controllers/discountController.js';

const router = express.Router();

const discountController = new DiscountController();

router.get('/discounts', (req, res) => discountController.getAllDiscounts(req, res));
router.get('/discounts/:id', (req, res) => discountController.getDiscountById(req, res));
router.get('/discounts/:discountId/:productId', (req, res) => discountController.getDiscountByDiscountIdAndProductId(req, res))
router.post('/discounts', (req, res) => discountController.createDiscount(req, res));
router.put('/discounts/:id', (req, res) => discountController.updateDiscount(req, res));

export default router;