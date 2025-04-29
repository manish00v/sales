const Joi = require('joi');

const roles = [
  'Sales Trainer', 'Business Analyst', 'Channel Sales Manager', 'Key Account Manager',
  'Sales Coordinator', 'Zonal Sales Manager', 'Regional Sales Manager', 'Area Sales Manager',
  'Sales Officer', 'Senior Sales Executive', 'Sales Representative'
];

const departments = [
  'Purchasing', 'Sales', 'Finance', 'Production', 'Export', 'Marketing',
  'Transport', 'Management', 'IT', 'External Sales', 'Internal Sales', 'Warehouse'
];

const sourcingPersonSchema = Joi.object({
  sourcingPersonId: Joi.string().length(4).alphanum().required()
    .messages({
      'string.length': 'Sourcing Person ID must be exactly 4 characters',
      'string.alphanum': 'Sourcing Person ID must be alphanumeric'
    }),
  sourcingPersonName: Joi.string().max(30).required()
    .messages({
      'string.max': 'Sourcing Person Name must be less than 30 characters'
    }),
  sourcingPersonRole: Joi.string().valid(...roles).required()
    .messages({
      'any.only': 'Invalid sourcing person role'
    }),
  street1: Joi.string().max(50).required(),
  street2: Joi.string().max(50).allow(null, ''),
  city: Joi.string().max(30).regex(/^[A-Za-z\s]+$/).required(),
  state: Joi.string().max(30).regex(/^[A-Za-z\s]+$/).required(),
  region: Joi.string().max(50).required(),
  country: Joi.string().max(30).regex(/^[A-Za-z\s]+$/).required(),
  pinCode: Joi.string().min(4).max(6).regex(/^\d+$/).required(),
  phoneNumber: Joi.string().length(10).regex(/^\d+$/).required(),
  mobileNumber: Joi.string().length(10).regex(/^\d+$/).required(),
  email: Joi.string().max(20).email().required(),
  department: Joi.string().valid(...departments).required()
});

function validateSourcingPerson(sourcingPerson) {
  return sourcingPersonSchema.validate(sourcingPerson, { abortEarly: false });
}

module.exports = { validateSourcingPerson };