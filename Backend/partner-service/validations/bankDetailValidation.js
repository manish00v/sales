// const { body, query } = require('express-validator');

// const bankDetailValidationRules = () => {
//   return [
//     body('accountType').notEmpty().isString().isIn(['CURRENT', 'SAVINGS']),
//     body('bankName').notEmpty().isString().isLength({ max: 40 }),
//     body('holderName').notEmpty().isString().isLength({ max: 40 }),
//     body('branchName').notEmpty().isString().isLength({ max: 40 }),
//     body('addressLine1').notEmpty().isString().isLength({ max: 50 }).matches(/^[a-zA-Z0-9\s,.-]*$/),
//     body('addressLine2').optional().isString().isLength({ max: 50 }).matches(/^[a-zA-Z0-9\s,.-]*$/),
//     body('city').notEmpty().isString().isLength({ max: 40 }),
//     body('state').notEmpty().isString().isLength({ max: 40 }),
//     body('country').notEmpty().isString().isLength({ max: 40 }),
//     body('pinCode').notEmpty().isString().isLength({ max: 10 }).matches(/^[0-9]*$/),
//     body('ifscCode').notEmpty().isString().isLength({ max: 20 }).matches(/^[A-Za-z0-9]*$/),
//     body('micrCode').notEmpty().isString().isLength({ max: 20 }).matches(/^[A-Za-z0-9]*$/)
//   ];
// };

const { body, query } = require('express-validator');

// For query parameters (GET requests)
exports.bankDetailQueryValidationRules = () => {
  return [
    query('page').optional().isInt({ min: 1 }).toInt(),
    query('limit').optional().isInt({ min: 1, max: 100 }).toInt(),
    query('search').optional().isString().trim()
  ];
};

// For request body (POST/PUT requests)
exports.bankDetailValidationRules = () => {
  return [
    body('accountType').notEmpty().isString().isIn(['CURRENT', 'SAVINGS']),
    body('bankName').notEmpty().isString().isLength({ max: 40 }),
    body('holderName').notEmpty().isString().isLength({ max: 40 }),
    body('branchName').notEmpty().isString().isLength({ max: 40 }),
    body('addressLine1').notEmpty().isString().isLength({ max: 50 }).matches(/^[a-zA-Z0-9\s,.-]*$/),
    body('addressLine2').optional().isString().isLength({ max: 50 }).matches(/^[a-zA-Z0-9\s,.-]*$/),
    body('city').notEmpty().isString().isLength({ max: 40 }),
    body('state').notEmpty().isString().isLength({ max: 40 }),
    body('country').notEmpty().isString().isLength({ max: 40 }),
    body('pinCode').notEmpty().isString().isLength({ max: 10 }).matches(/^[0-9]*$/),
    body('ifscCode').notEmpty().isString().isLength({ max: 20 }).matches(/^[A-Za-z0-9]*$/),
    body('micrCode').notEmpty().isString().isLength({ max: 20 }).matches(/^[A-Za-z0-9]*$/)
  ];
};