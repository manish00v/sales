const express = require('express');
const router = express.Router();
const {
  createSourcingPerson,
  getSourcingPerson,
  getAllSourcingPersons,
  updateSourcingPerson,
  deleteSourcingPerson
} = require('../controllers/sourcingPersonController');

router.post('/', createSourcingPerson);
router.get('/', getAllSourcingPersons);
router.get('/:sourcingPersonId', getSourcingPerson);
router.put('/:sourcingPersonId', updateSourcingPerson);
router.delete('/:sourcingPersonId', deleteSourcingPerson);

module.exports = router;