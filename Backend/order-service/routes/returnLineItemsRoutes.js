import express from 'express';
import { body, param, validationResult } from 'express-validator';
import ReturnLineItemController from '../controllers/returnLineItemsController.js';

const router = express.Router();
const returnLineItemController = new ReturnLineItemController();

const validate = (validations) => {
  return async (req, res, next) => {
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

// Get all return line items
router.get('/return-line-items', (req, res) => 
  returnLineItemController.getAllReturnLineItems(req, res)
);

// Get return line item by ID
router.get(
  '/return-line-items/:lineItemId',
  validate([
    param('lineItemId').isString().withMessage('Line Item ID must be a string')
  ]),
  (req, res) => returnLineItemController.getReturnLineItemByLineItemId(req, res)
);

// Get return line item by ID and Product ID
router.get(
  '/return-line-items/:lineItemId/:productId',
  validate([
    param('lineItemId').isString(),
    param('productId').isString()
  ]),
  (req, res) => returnLineItemController.getReturnLineItemByLineItemIdAndProductId(req, res)
);

// Create a new return line item
router.post(
  '/return-line-items',
  validate([
    body('lineItemId').isString(),
    body('productId').isString(),
    body('productName').isString(),
    body('quantityReturned').isInt({ min: 1 }),
    body('conditionOfProduct').isString(),
    body('originalPrice').isFloat({ min: 0 }),
    body('refundAmount').isFloat({ min: 0 }),
    body('replacementStatus').isString(),
  ]),
  (req, res) => returnLineItemController.createReturnLineItem(req, res)
);

// Add this new route
// Update the PUT route to include the full path
router.put(
  '/return-line-items/:lineItemId',
  validate([
    param('lineItemId').isString(),
    body('productId').optional().isString(),
    body('productName').optional().isString(),
    body('quantityReturned').optional().isInt({ min: 1 }),
    body('conditionOfProduct').optional().isString(),
    body('originalPrice').optional().isFloat({ min: 0 }),
    body('refundAmount').optional().isFloat({ min: 0 }),
    body('replacementStatus').optional().isString(),
  ]),
  (req, res) => returnLineItemController.updateReturnLineItem(req, res)
);
export default router;