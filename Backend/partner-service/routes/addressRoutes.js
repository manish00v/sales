const express = require('express');
const router = express.Router();
const addressController = require('../controllers/addressController');
const { 
  addressValidationRules, 
  addressQueryValidationRules 
} = require('../validations/addressValidation');
const validate = require('../middlewares/validate');

router.get('/', addressQueryValidationRules(), validate, addressController.getAllAddresses);
router.get('/:id', addressController.getAddress);
router.post('/', addressValidationRules(), validate, addressController.createAddress);
router.put('/:id', addressValidationRules(), validate, addressController.updateAddress);
router.delete('/:id', addressController.deleteAddress);

module.exports = router;