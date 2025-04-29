const express = require('express');
const router = express.Router();
const inventoryUnitController = require('../controllers/inventoryUnitController');
const {
  createInventoryUnitSchema,
  updateInventoryUnitSchema
} = require('../validations/inventoryUnitValidation');
const validate = require('../middlewares/validate');

router.get('/', inventoryUnitController.getAllInventoryUnits);
router.get('/:id', inventoryUnitController.getInventoryUnitById);
router.post(
  '/',
  validate(createInventoryUnitSchema),
  inventoryUnitController.createInventoryUnit
);
router.put(
  '/:id',
  validate(updateInventoryUnitSchema),
  inventoryUnitController.updateInventoryUnit
);
router.delete('/:id', inventoryUnitController.deleteInventoryUnit);

module.exports = router;