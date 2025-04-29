const express = require('express');
const router = express.Router();
const sourcingUnitController = require('../controllers/sourcingUnitController');
const {
  createSourcingUnitSchema,
  updateSourcingUnitSchema
} = require('../validations/sourcingUnitValidation');
const validate = require('../middlewares/validate');

router.get('/', sourcingUnitController.getAllSourcingUnits);
router.get('/:id', sourcingUnitController.getSourcingUnitById);
router.post(
  '/',
  validate(createSourcingUnitSchema),
  sourcingUnitController.createSourcingUnit
);
router.put(
  '/:id',
  validate(updateSourcingUnitSchema),
  sourcingUnitController.updateSourcingUnit
);
router.delete('/:id', sourcingUnitController.deleteSourcingUnit);

module.exports = router;