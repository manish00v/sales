import express from 'express';
import { body, param, validationResult } from 'express-validator';
import SalesPersonController from '../controllers/salesPersonController.js';

const router = express.Router();
const salesPersonController = new SalesPersonController();

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

// Get all sales persons
router.get('/sales-persons', (req, res) => salesPersonController.getAllSalesPersons(req, res));

// Get sales person by salesPersonId
router.get(
  '/sales-persons/:salesPersonId',
  validate([
    param('salesPersonId').isNumeric().isLength({ max: 20 }),
  ]),
  (req, res) => salesPersonController.getSalesPersonBySalesPersonId(req, res)
);

// Get sales person by customerId
router.get(
  '/sales-persons/customer/:customerId',
  validate([
    param('customerId').isNumeric().isLength({ max: 20 }),
  ]),
  (req, res) => salesPersonController.getSalesPersonByCustomerId(req, res)
);

// Get sales person by orderId
router.get(
  '/sales-persons/order/:orderId',
  validate([
    param('orderId').isNumeric().isLength({ max: 20 }),
  ]),
  (req, res) => salesPersonController.getSalesPersonByOrderId(req, res)
);

// Get sales person by productId
router.get(
  '/sales-persons/product/:productId',
  validate([
    param('productId').isNumeric().isLength({ max: 20 }),
  ]),
  (req, res) => salesPersonController.getSalesPersonByProductId(req, res)
);

router.get(
    '/sales-persons/:salesPersonId/:customerId',
    validate([
      param('salesPersonId').isNumeric().isLength({ max: 20 }),
      param('customerId').isNumeric().isLength({ max: 20 }),
    ]),
    (req, res) => salesPersonController.getSalesPersonBySalesPersonIdAndCustomerId(req, res)
  );

router.get(
    '/sales-persons/:salesPersonId/:customerId/:orderId/:productId',
    validate([
      param('salesPersonId').isNumeric().isLength({ max: 20 }),
      param('customerId').isNumeric().isLength({ max: 20 }),
      param('orderId').isNumeric().isLength({ max: 20 }),
      param('productId').isNumeric().isLength({ max: 20 }),
    ]),
    (req, res) => salesPersonController.getSalesPersonByCompositeKeys(req, res)
  );
  

// Create a new sales person
router.post(
  '/sales-persons',
  validate([
    body('customerId').isNumeric().isLength({ max: 20 }),
    body('orderId').isNumeric().isLength({ max: 20 }),
    body('productId').isNumeric().isLength({ max: 20 }),
    body('salesPersonName').isString().isLength({ max: 255 }),
    body('emailId').isEmail().isLength({ max: 100 }),
    body('phoneNumber').isString().isLength({ min: 10, max: 15 }),
    body('region').isString().isLength({ max: 100 }),
    body('target').isString().isLength({ max: 100 }),
  ]),
  (req, res) => salesPersonController.createSalesPerson(req, res)
);

// Update sales person by salesPersonId
router.put(
    '/sales-persons/:salesPersonId/:customerId',
    validate([
      param('salesPersonId').isNumeric().isLength({ max: 20 }),
      param('customerId').isNumeric().isLength({ max: 20 }),
      body('orderId').optional().isNumeric().isLength({max: 20}),
      body('salesPersonName').optional().isString().isLength({ max: 255 }),
      body('emailId').optional().isEmail().isLength({ max: 100 }),
      body('phoneNumber').optional().isString().isLength({ min: 10, max: 15 }),
      body('region').optional().isString().isLength({ max: 100 }),
      body('target').optional().isString().isLength({ max: 100 }),
    ]),
    (req, res) => salesPersonController.updateSalesPersonBySalesPersonIdAndCustomerId(req, res)
  );


export default router;