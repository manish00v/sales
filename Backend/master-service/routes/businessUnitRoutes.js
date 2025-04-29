const express = require('express');
const BusinessUnitController = require('../controllers/businessUnitController');

const router = express.Router();

router.post('/', BusinessUnitController.createBusinessUnit);
router.get('/', BusinessUnitController.getAllBusinessUnits);
router.get('/:code', BusinessUnitController.getBusinessUnitByCode);
router.put('/:code', BusinessUnitController.updateBusinessUnitByCode);
router.delete('/:code', BusinessUnitController.deleteBusinessUnitByCode);

module.exports = router;