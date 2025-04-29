// accountRoutes.js
const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');
const { accountValidationRules } = require('../validations/accountValidation');
const validate = require('../middlewares/validate');

router.get('/', accountController.getAllAccounts);
router.get('/dropdown-options', accountController.getDropdownOptions);
router.get('/:id', accountController.getAccount);
router.post('/', accountValidationRules(), validate, accountController.createAccount);
router.put('/:id', accountValidationRules(), validate, accountController.updateAccount);
router.delete('/:id', accountController.deleteAccount);

module.exports = router;