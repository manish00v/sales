import express from 'express';
import DiscountRulesController from '../controllers/discountRulesController.js';

const router = express.Router();
const discountRulesController = new DiscountRulesController();

// Define routes
router.get('/discount-rules', (req, res) => discountRulesController.getAllDiscountRules(req, res));
router.get('/discount-rules/:id', (req, res) => discountRulesController.getDiscountRulesById(req, res));
router.get('/discount-rules/:discountId/:productId', (req, res) => discountRulesController.getDiscountRulesByDiscountIdAndProductId(req, res));
router.post('/discount-rules', (req, res) => discountRulesController.createDiscountRules(req, res));
router.put('/discount-rules/:id', (req, res) => discountRulesController.updateDiscountRules(req, res));

export default router;