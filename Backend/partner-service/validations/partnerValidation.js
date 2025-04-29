const { body, query, param } = require('express-validator');

const partnerValidationRules = () => {
  return [
    body('partnerType').isString().trim().isLength({ min: 1, max: 3 }),
    body('partnerCategory').isString().trim().isLength({ min: 1, max: 1 }),
    body('function').isString().trim().isLength({ min: 1, max: 3 }),
    body('partnerId').isInt({ min: 1 }).toInt()
  ];
};

const partnerQueryValidationRules = () => {
  return [
    query('page').optional().isInt({ min: 1 }).default(1).toInt(),
    query('limit').optional().isInt({ min: 1, max: 100 }).default(20).toInt(),
    query('search').optional().isString().trim(),
    query('partnerType').optional().isString().trim(),
    query('partnerCategory').optional().isString().trim(),
    query('function').optional().isString().trim()
  ];
};

module.exports = {
  partnerValidationRules,
  partnerQueryValidationRules
};