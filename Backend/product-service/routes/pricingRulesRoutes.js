import express from 'express';
import PricingRulesController from '../controllers/pricingRulesController.js';

const router = express.Router();
const pricingRulesController = new PricingRulesController();

router.get('/pricing-rules', (req, res) => pricingRulesController.getAllPricingRules(req, res));
router.get('/pricing-rules/:id', (req, res) => pricingRulesController.getPricingRulesById(req, res));
router.get('/pricing-rules/:ruleId/:productId', (req, res) => pricingRulesController.getPricingRulesByRuleIdAndProductId(req, res));
router.post('/pricing-rules', (req, res) => pricingRulesController.createPricingRules(req, res));
router.put('/pricing-rules/:id', (req, res) => pricingRulesController.updatePricingRules(req, res));

export default router;