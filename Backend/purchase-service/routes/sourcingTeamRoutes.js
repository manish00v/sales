const express = require('express');
const router = express.Router();
const sourcingTeamController = require('../controllers/sourcingTeamController');
const {
  createSourcingTeamSchema,
  updateSourcingTeamSchema
} = require('../validations/sourcingTeamValidation');
const validate = require('../middlewares/validate');

router.get('/', sourcingTeamController.getAllSourcingTeams);
router.get('/:sourcingTeamId', sourcingTeamController.getSourcingTeamById);
router.post(
  '/',
  validate(createSourcingTeamSchema),
  sourcingTeamController.createSourcingTeam
);
router.put(
  '/:sourcingTeamId',
  validate(updateSourcingTeamSchema),
  sourcingTeamController.updateSourcingTeamById
);
router.delete('/:sourcingTeamId', sourcingTeamController.deleteSourcingTeamById);

module.exports = router;