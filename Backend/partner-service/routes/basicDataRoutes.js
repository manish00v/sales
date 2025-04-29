const express = require('express');
const router = express.Router();
const basicDataController = require('../controllers/basicDataController');
const { 
  basicDataValidationRules, 
  basicDataQueryValidationRules 
} = require('../validations/basicDataValidation');
const validate = require('../middlewares/validate');

router.get('/', basicDataQueryValidationRules(), validate, basicDataController.getAllBasicData);
router.get('/dropdown-options', basicDataController.getDropdownOptions);
router.get('/:id', basicDataController.getBasicData);
router.post('/', basicDataValidationRules(), validate, basicDataController.createBasicData);
router.put('/:id', basicDataValidationRules(), validate, basicDataController.updateBasicData);
router.delete('/:id', basicDataController.deleteBasicData);

module.exports = router;