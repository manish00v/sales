const { body, query } = require('express-validator');

const basicDataValidationRules = () => {
  return [
    body('title').optional().isString().isIn(['Mr.', 'Ms.', 'Mrs.', 'Dr.']),
    body('firstName').optional().isString().isLength({ max: 35 }),
    body('middleName').optional().isString().isLength({ max: 35 }),
    body('lastName').optional().isString().isLength({ max: 35 }),
    body('businessName').optional().isString().isLength({ max: 60 }),
    body('tradeName').optional().isString().isLength({ max: 35 }),
    body('phone').optional().isString().isLength({ max: 20 }),
    body('email').optional().isEmail().isLength({ max: 35 }),
    body('website').optional().isURL().isLength({ max: 35 }),
    body('partnerClassification').optional().isString().isIn(['A', 'B', 'C']),
    body('lifeCycleStatus').optional().isString().isIn(['Active', 'Inactive', 'Duplicate', 'Obsolete'])
  ];
};

const basicDataQueryValidationRules = () => {
  return [
    query('page').optional().isInt({ min: 1 }).toInt(),
    query('limit').optional().isInt({ min: 1, max: 100 }).toInt(),
    query('search').optional().isString().trim()
  ];
};

module.exports = {
  basicDataValidationRules,
  basicDataQueryValidationRules
};