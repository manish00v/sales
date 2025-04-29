const { body, query } = require('express-validator');

const accountValidationRules = () => {
  return [
    body('businessEntityCode').notEmpty().isAlphanumeric().isLength({ min: 1, max: 4 }),
    body('accountReceivableGL').notEmpty().isAlphanumeric().isLength({ max: 4 }),
    body('accountPayableGL').notEmpty().isAlphanumeric().isLength({ max: 4 }),
    body('vatNumber').notEmpty().isAlphanumeric().isLength({ max: 15 }),
    body('gstin').notEmpty().isLength({ max: 20 }).matches(/^[0-9A-Z]{15}$/),
    body('pan').notEmpty().isLength({ min: 10, max: 10 }).matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/),
    body('tan').notEmpty().isLength({ min: 10, max: 10 }).matches(/^[A-Z]{4}[0-9]{5}[A-Z]{1}$/),
    body('currency').notEmpty().isIn(['INR', 'EURO', 'USD']),
    body('paymentMethod').notEmpty().isIn(['BANK_TRANSFER', 'CARD', 'DIGITAL_PAYMENT', 'PLATFORMS']),
    body('invoicingMethod').notEmpty().isIn(['EMAIL', 'E_INVOICE', 'POST']),
    body('paymentToleranceDays').notEmpty().isInt().isIn([3, 5, 7, 14]),
    body('creditStatus').notEmpty().isIn(['PAY_IN_ADVANCE', 'OUTSTANDING_PAYMENTS']),
    body('accountantPhone').notEmpty().isNumeric().isLength({ max: 30 }),
    body('accountantEmail').notEmpty().isEmail().isLength({ max: 30 })
  ];
};

module.exports = {
  accountValidationRules
};