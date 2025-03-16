import express from 'express';
import { body, param, validationResult } from 'express-validator';
import CustomerController from '../controllers/customerController.js';

const router = express.Router();
const customerController = new CustomerController();

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

// Get all customers
router.get('/customers', (req, res) => customerController.getAllCustomers(req, res));

router.get(
  '/customers/:customerId',
  validate([
    param('customerId').isNumeric().isLength({ max: 20 }),
  ]),
  (req, res) => customerController.getCustomerByCustomerId(req, res)
);

// Get customer by customerId and productId
router.get(
  '/customers/:customerId/:productId',
  validate([
    param('customerId').isInt().isLength({ max: 20 }),
    param('productId').isString(),
  ]),
  (req, res) => customerController.getCustomerByCustomerIdAndProductId(req, res)
);

// Get customer by customerId, productId, and orderId
router.get(
  '/customers/:customerId/:productId/:orderId',
  validate([
    param('customerId').isNumeric().isLength({ max: 20 }),
    param('productId').isString(),
    param('orderId').isNumeric(),
  ]),
  (req, res) => customerController.getCustomerByCustomerIdProductIdAndOrderId(req, res)
);

// Update customer by customerId and productId
router.put(
  '/customers/:customerId/:productId',
  validate([
    param('customerId').isNumeric().isLength({ max: 20 }),
    param('productId').isString(),
    body('customerName').optional().isString().isLength({ max: 255 }),
    body('email').optional().isEmail().isLength({ max: 100 }),
    body('phoneNumber').optional().isNumeric().isLength({ min: 10, max: 15 }),
    body('creditLimit').optional().isDecimal(),
    body('billingAddress').optional().isString().isLength({ max: 500 }),
    body('shippingAddress').optional().isString().isLength({ max: 500 }),
    body('customerGroup').optional().isString().isLength({ max: 50 }),
    body('status').optional().isString().isLength({ max: 50 }),
  ]),
  (req, res) => customerController.updateCustomerByCustomerIdAndProductId(req, res)
);

// Create a new customer
router.post(
  '/customers',
  validate([
    body('customerId').isNumeric().isLength({ max: 20 }),
    // body('productId'). 
    body('customerName').isString().isLength({ max: 255 }),
    body('emailId').isEmail().isLength({ max: 100 }),
    body('phoneNumber').isNumeric().isLength({ min: 10, max: 15 }),
    body('creditLimit').isDecimal(),
    body('billingAddress').isString().isLength({ max: 500 }),
    body('shippingAddress').isString().isLength({ max: 500 }),
    body('customerGroup').isString().isLength({ max: 50 }),
    body('status').isString().isLength({ max: 50 }),
  ]),
  (req, res) => customerController.createCustomer(req, res)
);

export default router;