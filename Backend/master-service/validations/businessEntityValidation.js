const Joi = require('joi');

const businessEntitySchema = Joi.object({
  businessEntityCode: Joi.string()
    .length(4)
    .pattern(/^[a-zA-Z0-9]+$/)
    .required()
    .messages({
      'string.base': 'Business Entity Code should be a string',
      'string.length': 'Business Entity Code should be exactly 4 characters',
      'string.pattern.base': 'Business Entity Code should be alphanumeric',
      'any.required': 'Business Entity Code is required'
    }),
  
    
  businessEntityName: Joi.string()
    .max(30)
    .pattern(/^[a-zA-Z0-9 ]+$/)
    .required()
    .messages({
      'string.base': 'Business Entity Name should be a string',
      'string.max': 'Business Entity Name should not exceed 30 characters',
      'string.pattern.base': 'Business Entity Name should be alphanumeric',
      'any.required': 'Business Entity Name is required'
    }),
  
  street1: Joi.string()
    .max(50)
    .required()
    .messages({
      'string.base': 'Street 1 should be a string',
      'string.max': 'Street 1 should not exceed 50 characters',
      'any.required': 'Street 1 is required'
    }),
  
  street2: Joi.string()
    .max(50)
    .allow('', null)
    .messages({
      'string.base': 'Street 2 should be a string',
      'string.max': 'Street 2 should not exceed 50 characters'
    }),
  
  city: Joi.string()
    .max(30)
    .pattern(/^[a-zA-Z ]+$/)
    .required()
    .messages({
      'string.base': 'City should be a string',
      'string.max': 'City should not exceed 30 characters',
      'string.pattern.base': 'City should contain only letters',
      'any.required': 'City is required'
    }),
  
  state: Joi.string()
    .max(30)
    .pattern(/^[a-zA-Z ]+$/)
    .required()
    .messages({
      'string.base': 'State should be a string',
      'string.max': 'State should not exceed 30 characters',
      'string.pattern.base': 'State should contain only letters',
      'any.required': 'State is required'
    }),
  
  region: Joi.string()
    .max(50)
    .allow('', null)
    .messages({
      'string.base': 'Region should be a string',
      'string.max': 'Region should not exceed 50 characters'
    }),
  
  country: Joi.string()
    .max(30)
    .pattern(/^[a-zA-Z ]+$/)
    .required()
    .messages({
      'string.base': 'Country should be a string',
      'string.max': 'Country should not exceed 30 characters',
      'string.pattern.base': 'Country should contain only letters',
      'any.required': 'Country is required'
    }),
  
  pinCode: Joi.string()
    .min(4)
    .max(6)
    .pattern(/^[0-9]+$/)
    .required()
    .messages({
      'string.base': 'Pin Code should be a string',
      'string.min': 'Pin Code should be between 4 to 6 digits',
      'string.max': 'Pin Code should be between 4 to 6 digits',
      'string.pattern.base': 'Pin Code should contain only numbers',
      'any.required': 'Pin Code is required'
    }),

    language: Joi.string()
  .valid('EN', 'ES', 'FR', 'DE', 'IT', 'NL', 'ID', 'VI')
  .required()
  .messages({
    'string.base': 'Language should be a string',
    'any.only': 'Language must be one of EN, ES, FR, DE, IT, NL, ID, VI',
    'any.required': 'Language is required'
  }),

});



const validateBusinessEntity = (data) => {
  return businessEntitySchema.validate(data, { abortEarly: false });
};

// module.exports = {
//   validateBusinessEntity
// };

// Add these new schemas at the bottom of the file
const createBusinessEntitySchema = businessEntitySchema; // Uses all original validations

const updateBusinessEntitySchema = Joi.object({
  businessEntityName: Joi.string()
    .max(30)
    .pattern(/^[a-zA-Z0-9 ]+$/),
  street1: Joi.string().max(50),
  street2: Joi.string().max(50).allow('', null),
  city: Joi.string()
    .max(30)
    .pattern(/^[a-zA-Z ]+$/),
  state: Joi.string()
    .max(30)
    .pattern(/^[a-zA-Z ]+$/),
  region: Joi.string().max(50).allow('', null),
  country: Joi.string()
    .max(30)
    .pattern(/^[a-zA-Z ]+$/),
  pinCode: Joi.string()
    .min(4)
    .max(6)
    .pattern(/^[0-9]+$/),
    language: Joi.string()
  .valid('EN', 'ES', 'FR', 'DE', 'IT', 'NL', 'ID', 'VI')
  .messages({
    'string.base': 'Language should be a string',
    'any.only': 'Language must be one of EN, ES, FR, DE, IT, NL, ID, VI'
  }),
}).min(1); // At least one field must be provided

const validateBusinessEntityCreate = (data) => {
  return createBusinessEntitySchema.validate(data, { abortEarly: false });
};

const validateBusinessEntityUpdate = (data) => {
  return updateBusinessEntitySchema.validate(data, { abortEarly: false });
};

module.exports = {
  validateBusinessEntity,
  validateBusinessEntityCreate,
  validateBusinessEntityUpdate
};