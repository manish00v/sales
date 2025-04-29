const express = require('express');
const FactoryUnitController = require('../controllers/factoryUnitController');

const router = express.Router();

router.post('/', FactoryUnitController.createFactoryUnit);
router.get('/', FactoryUnitController.getAllFactoryUnits);
router.get('/:code', FactoryUnitController.getFactoryUnitByCode);
router.put('/:code', FactoryUnitController.updateFactoryUnitByCode);
router.delete('/:code', FactoryUnitController.deleteFactoryUnitByCode);

module.exports = router;