const Joi = require('joi');

const relatedPartySchema = Joi.object({
  orderingParty: Joi.string().max(20).optional(),
  receivingParty: Joi.string().max(20).optional(),
  invoicingParty: Joi.string().max(20).optional(),
  payingParty: Joi.string().max(20).optional(),
  groupOrganisation: Joi.string().max(20).optional(),
  salesPersonId: Joi.string().length(4).optional(),
  sourcingPersonId: Joi.string().length(4).optional(),
  contactPersonId: Joi.string().length(20).optional()
});

function validateRelatedParty(relatedParty) {
  return relatedPartySchema.validate(relatedParty);
}

module.exports = { validateRelatedParty };