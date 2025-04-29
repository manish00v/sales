const express = require('express');
const router = express.Router();
const bankDetailController = require('../controllers/bankDetailController');
const { 
  bankDetailValidationRules, 
  bankDetailQueryValidationRules 
} = require('../validations/bankDetailValidation');
const validate = require('../middlewares/validate');

// GET /api/bank-details
router.get('/', bankDetailQueryValidationRules(), validate, bankDetailController.getAllBankDetails);

// GET /api/bank-details/account-types
router.get('/account-types', bankDetailController.getAccountTypes);

// GET /api/bank-details/:id
router.get('/:id', bankDetailController.getBankDetail);

// POST /api/bank-details
router.post('/', bankDetailValidationRules(), validate, bankDetailController.createBankDetail);

// PUT /api/bank-details/:id
router.put('/:id', bankDetailValidationRules(), validate, bankDetailController.updateBankDetail);

// DELETE /api/bank-details/:id
router.delete('/:id', bankDetailController.deleteBankDetail);

module.exports = router;