import express from 'express';
import { body, param, validationResult } from 'express-validator';
import SalesOrderController from '../controllers/salesOrderController.js';

const router = express.Router();
const salesOrderController = new SalesOrderController();

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

// Create a new sales order
router.post(
    '/sales-orders',
    validate([
      body('orderId').isString().isLength({ max: 20 }),
      body('orderDate').isISO8601(),
      body('requiredDate').isISO8601(),
      body('orderStatus').isString().isLength({ max: 50 }),
      body('paymentStatus').isString().isLength({ max: 50 }),
      body('deliveryBlock').isString().isLength({ max: 20 }),
      body('totalAmount').isDecimal({ decimal_digits: '0,2' }),
    ]),
    (req, res) => salesOrderController.createSalesOrder(req, res)
  );

// Get a sales order by ID
router.get(
  '/sales-orders/:orderId',
   validate([param('orderId').isString().isLength({ max: 20 })]),
  (req, res) => salesOrderController.getSalesOrderById(req, res)
);

// Get sales order by salesId and customerId (New Endpoint)
router.get(
    '/sales-orders/:orderId/:customerId',
    validate([
      param('orderId').isString(), // Validate orderId as numeric
      param('customerId').isString(), // Validate customerId as numeric
    ]),
    (req, res) => salesOrderController.getSalesOrderByOrderIdAndCustomerId(req, res)
  );

// Update a sales order by ID
router.put(
    '/sales-orders/:orderId',
    validate([
      param('orderId').isString().isLength({ max: 20 }), // Validate the `id` parameter
      body('orderDate').optional().isISO8601(),
      body('requiredDate').optional().isISO8601(),
      body('customerId').optional().isString(), // Validate customerId as an integer
      body('orderStatus').optional().isString().isLength({ max: 50 }),
      body('paymentStatus').optional().isString().isLength({ max: 50 }),
      body('deliveryBlock').optional().isString().isLength({max: 20}),
      body('totalAmount').optional().isDecimal({ decimal_digits: '0,2' }),
    ]),
    (req, res) => salesOrderController.updateSalesOrder(req, res)
  );
// Get all sales orders
router.get('/sales-orders', (req, res) => salesOrderController.getAllSalesOrders(req, res));

export default router;