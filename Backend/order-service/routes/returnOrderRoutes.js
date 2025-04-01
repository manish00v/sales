import express from 'express';
import { body, param, validationResult } from 'express-validator';
import ReturnOrderController from '../controllers/returnOrderController.js';

const router = express.Router();
const returnOrderController = new ReturnOrderController();

// Correct validation middleware
const validate = (validations) => {
    return async (req, res, next) => {
        // Run each validation sequentially (not with Promise.all)
        for (let validation of validations) {
            const result = await validation.run(req);
            if (result.errors.length) break;
        }

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }
        res.status(400).json({ errors: errors.array() });
    };
};

// Create a new return order
router.post(
    '/return-orders',
    validate([
        body('returnOrderId').isString().withMessage('Return Order ID must be a string'),
        body('orderId').isString().withMessage('Order ID must be a string'),
        body('customerId').isString().withMessage('Customer ID must be a string'),
        body('productId').isString().withMessage('Product ID must be a string'),
        body('returnReason').optional().isString(),
        // body('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
        body('returnDate').optional().isISO8601(),
        body('approvalStatus').optional().isString(),
        body('returnStatus').optional().isString(),
    ]),
    (req, res) => returnOrderController.createReturnOrder(req, res)
);

// Get all return orders
router.get('/return-orders', (req, res) => 
    returnOrderController.getAllReturnOrders(req, res)
);

// Get return order by ID
router.get(
    '/return-orders/:returnOrderId',
    validate([
        param('returnOrderId').isString().withMessage('Return Order ID must be a string')
    ]),
    (req, res) => returnOrderController.getReturnOrderById(req, res)
);

// In returnOrderRoutes.js
router.get(
    '/return-orders/:returnOrderId/:customerId', 
    (req, res) => returnOrderController.getReturnOrderByIdAndCustomer(req, res)
);
router.put(
    '/return-orders/:returnOrderId',
    validate([
        param('returnOrderId').isString(),
        body('approvalStatus').optional().isString(),
        body('returnStatus').optional().isString(),
        body('returnReason').optional().isString(),
        body('processedDate').optional().isISO8601(),
    ]),
    (req, res) => returnOrderController.updateReturnOrder(req, res)
);

export default router;