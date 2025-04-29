const Joi = require('joi');

const sourcingTeamIdRegex = /^[a-zA-Z0-9]{4}$/;
const sourcingUnitIdRegex = /^[a-zA-Z0-9]{4}$/;
const nameRegex = /^[a-zA-Z0-9 ]{1,30}$/;
const teamTypes = ['Individual', 'Group'];
const streetAddressRegex = /^[a-zA-Z0-9 ,.-]{1,50}$/;
const cityRegex = /^[a-zA-Z ]{1,30}$/;
const regionRegex = /^[a-zA-Z0-9 ]{1,20}$/;
const countryCodeRegex = /^[a-zA-Z0-9+ -]{1,5}$/;
const pinCodeRegex = /^[0-9]{6}$/;
const phoneRegex = /^[0-9]{10,12}$/;
const landlineRegex = /^[0-9]{10,12}$/;
const emailRegex = /^[^\s@]{1,20}@[^\s@]+\.[^\s@]+$/;

const createSourcingTeamSchema = Joi.object({
  SourcingTeamId: Joi.string()
    .pattern(sourcingTeamIdRegex)
    .required()
    .messages({
      'string.pattern.base': 'Sourcing Team ID must be 4 character alphanumeric',
      'any.required': 'Sourcing Team ID is required'
    }),
  SourcingTeamName: Joi.string()
    .pattern(nameRegex)
    .max(30)
    .required(),
  TeamType: Joi.string()
    .valid(...teamTypes)
    .required(),
  StreetAddress: Joi.string()
    .pattern(streetAddressRegex)
    .max(50)
    .required(),
  City: Joi.string()
    .pattern(cityRegex)
    .max(30)
    .required(),
  Region: Joi.string()
    .pattern(regionRegex)
    .max(20)
    .required(),
  CountryCode: Joi.string()
    .pattern(countryCodeRegex)
    .max(5)
    .required(),
  PinCode: Joi.string()
    .pattern(pinCodeRegex)
    .required(),
  PhoneNumber: Joi.string()
    .pattern(phoneRegex)
    .required(),
  LandlineNumber: Joi.string()
    .pattern(landlineRegex)
    .required(),
  Email: Joi.string()
    .pattern(emailRegex)
    .max(20)
    .required(),
  sourcingUnitId: Joi.string()
    .pattern(sourcingUnitIdRegex)
    .optional()
    .allow('', null)
    .messages({
      'string.pattern.base': 'Sourcing Unit ID must be 4 character alphanumeric'
    })
});

const updateSourcingTeamSchema = Joi.object({
  SourcingTeamName: Joi.string()
    .pattern(nameRegex)
    .max(30),
  TeamType: Joi.string()
    .valid(...teamTypes),
  StreetAddress: Joi.string()
    .pattern(streetAddressRegex)
    .max(50),
  City: Joi.string()
    .pattern(cityRegex)
    .max(30),
  Region: Joi.string()
    .pattern(regionRegex)
    .max(20),
  CountryCode: Joi.string()
    .pattern(countryCodeRegex)
    .max(5),
  PinCode: Joi.string()
    .pattern(pinCodeRegex),
  PhoneNumber: Joi.string()
    .pattern(phoneRegex),
  LandlineNumber: Joi.string()
    .pattern(landlineRegex),
  Email: Joi.string()
    .pattern(emailRegex)
    .max(20),
  sourcingUnitId: Joi.string()
    .pattern(sourcingUnitIdRegex)
    .optional()
    .allow('', null)
    .messages({
      'string.pattern.base': 'Sourcing Unit ID must be 4 character alphanumeric'
    })
}).min(1).message('At least one field must be provided for update');

module.exports = {
  createSourcingTeamSchema,
  updateSourcingTeamSchema
};