const { body, query } = require('express-validator');

const addressValidationRules = () => {
  return [
    body('street1').optional().isString().isLength({ max: 50 }).matches(/^[a-zA-Z0-9\s,.-]*$/),
    body('street2').optional().isString().isLength({ max: 50 }).matches(/^[a-zA-Z0-9\s,.-]*$/),
    body('city').optional().isString().isLength({ max: 20 }).matches(/^[a-zA-Z\s]*$/),
    body('region').optional().isString().isLength({ max: 20 }).matches(/^[a-zA-Z0-9\s]*$/),
    body('country').optional().isString().isLength({ max: 20 }).matches(/^[a-zA-Z0-9\s]*$/),
    body('pinCode').optional().isString().isLength({ max: 10 }).matches(/^[0-9]*$/)
  ];
};

const addressQueryValidationRules = () => {
  return [
    query('page').optional().isInt({ min: 1 }).toInt(),
    query('limit').optional().isInt({ min: 1, max: 100 }).toInt(),
    query('search').optional().isString().trim()
  ];
};

module.exports = {
  addressValidationRules,
  addressQueryValidationRules
};