const express = require('express');
const router = express.Router();
const partnerController = require('../controllers/partnerController');
const { partnerValidationRules, partnerQueryValidationRules } = require('../validations/partnerValidation');
const validate = require('../middlewares/validate');

// GET /api/partners
router.get('/', partnerQueryValidationRules(), validate, partnerController.getAllPartners);
// GET /api/partners/dropdown-options
router.get('/dropdown-options', partnerController.getDropdownOptions);
// GET /api/partners/:id
router.get('/:id', partnerController.getPartner);
// POST /api/partners
router.post('/', partnerValidationRules(), validate, partnerController.createPartner);
// PUT /api/partners/:id
router.put('/:id', partnerValidationRules(), validate, partnerController.updatePartner);
// DELETE /api/partners/:id
router.delete('/:id', partnerController.deletePartner);

module.exports = router;