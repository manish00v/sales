const express = require('express');
const router = express.Router();
const {
  createRelatedParty,
  getRelatedParty,
  getAllRelatedParties,
  updateRelatedParty,
  deleteRelatedParty
} = require('../controllers/relatedPartyController');

router.post('/', createRelatedParty);
router.get('/', getAllRelatedParties);
router.get('/:id', getRelatedParty);
router.put('/:id', updateRelatedParty);
router.delete('/:id', deleteRelatedParty);

module.exports = router;