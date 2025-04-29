const express = require('express');
const router = express.Router();
const contactPersonController = require('../controllers/contactPersonController');
const {
  createContactPersonSchema,
  updateContactPersonSchema
} = require('../validations/contactPersonValidation');
const validate = require('../middlewares/validate');

router.get('/', contactPersonController.getAllContactPersons);
router.get('/:contactPersonId', contactPersonController.getContactPersonByContactPersonId);
router.post(
  '/',
  validate(createContactPersonSchema),
  contactPersonController.createContactPerson
);
router.put(
  '/:contactPersonId',
  validate(updateContactPersonSchema),
  contactPersonController.updateContactPersonByContactPersonId
);
router.delete('/:contactPersonId', contactPersonController.deleteContactPersonByContactPersonId);

module.exports = router;