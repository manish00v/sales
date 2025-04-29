const express = require('express');
const router = express.Router();
const inventoryBayController = require('../controllers/inventoryBayController');
const {
  createInventoryBaySchema,
  updateInventoryBaySchema
} = require('../validations/inventoryBayValidation');
const validate = require('../middlewares/validate');

router.get('/', inventoryBayController.getAllInventoryBays);
router.get('/:id', inventoryBayController.getInventoryBayById);
router.post(
  '/',
  validate(createInventoryBaySchema),
  inventoryBayController.createInventoryBay
);
router.put(
  '/:id',
  validate(updateInventoryBaySchema),
  inventoryBayController.updateInventoryBay
);
router.delete('/:id', inventoryBayController.deleteInventoryBay);

module.exports = router;