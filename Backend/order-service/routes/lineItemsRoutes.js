import express from 'express';
import { body, param, validationResult } from 'express-validator';
import LineItemsController from '../controllers/lineItemsController.js'

const router = express.Router();
const lineItemsController = new LineItemsController();

// Validation middleware
const validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    res.status(400).json({ errors: errors.array() });
  };
};

// Create a new line item
router.post(
  '/line-items',
  validate([
    body('orderId').isString(),
    body('productId').isString(),
    body('customerId').isString(),
    body('quantity').isInt(),
    body('unitPrice').isFloat(),
    body('discount').isFloat(),
    body('tax').isFloat(),
    body('totalLinePrice').isFloat(),
  ]),
  (req, res) => lineItemsController.createLineItem(req, res)
);

// Get a line item by ID
router.get(
  '/line-items/:orderLineItemId',
  validate([
    param('orderLineItemId').isString(),
  ]),
  (req, res) => lineItemsController.getLineItemById(req, res)
);

// Get a line item by order ID and product ID
router.get(
  '/line-items/:orderLineItemId/:productId',
  validate([
    param('orderLineItemId').isString(),
    param('productId').isString(),
  ]),
  (req, res) => lineItemsController.getLineItemByorderLineItemIdAndProductId(req, res)
);

// Update a line item by ID
router.put(
  '/line-items/:orderLineItemId',
  validate([
    param('orderLineItemId').isString(),
    body('orderId').optional().isString(),
    body('productId').optional().isString(),
    body('customerId').optional().isString(),
    body('quantity').optional().isInt(),
    body('unitPrice').optional().isFloat(),
    body('discount').optional().isFloat(),
    body('tax').optional().isFloat(),
    body('totalLinePrice').optional().isFloat(),
  ]),
  (req, res) => lineItemsController.updateLineItem(req, res)
);

// Get all line items
router.get('/line-items', (req, res) => lineItemsController.getAllLineItems(req, res));

export default router;