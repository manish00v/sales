const Joi = require('joi');

const sourcingUnitIdRegex = /^[a-zA-Z0-9]{4}$/;
const descriptionRegex = /^[a-zA-Z0-9 ]{1,30}$/;

const createSourcingUnitSchema = Joi.object({
  SourcingUnitId: Joi.string()
    .pattern(sourcingUnitIdRegex)
    .required()
    .messages({
      'string.pattern.base': 'Sourcing Unit ID must be 4 character alphanumeric',
      'any.required': 'Sourcing Unit ID is required'
    }),
  SourcingUnitDesc: Joi.string()
    .pattern(descriptionRegex)
    .max(30)
    .required()
    .messages({
      'string.pattern.base': 'Description must be alphanumeric',
      'any.required': 'Description is required'
    }),
    factoryUnitCode: Joi.string()
    .required()
    .messages({
      'any.required': 'Factory Unit ID is required'
    })
});

const updateSourcingUnitSchema = Joi.object({
  SourcingUnitDesc: Joi.string()
    .pattern(descriptionRegex)
    .max(30)
}).min(1).message('At least one field must be provided for update');

module.exports = {
  createSourcingUnitSchema,
  updateSourcingUnitSchema
};