const Joi = require('joi');

const factoryUnitSchema = Joi.object({
  factoryUnitCode: Joi.string()
    .length(4)
    .pattern(/^[a-zA-Z0-9]+$/)
    .required()
    .messages({
      'string.base': 'Factory Unit Code should be a string',
      'string.length': 'Factory Unit Code should be exactly 4 characters',
      'string.pattern.base': 'Factory Unit Code should be alphanumeric',
      'any.required': 'Factory Unit Code is required'
    }),
  
  factoryUnitName: Joi.string()
    .max(30)
    .pattern(/^[a-zA-Z0-9 ]+$/)
    .required()
    .messages({
      'string.base': 'Factory Unit Name should be a string',
      'string.max': 'Factory Unit Name should not exceed 30 characters',
      'string.pattern.base': 'Factory Unit Name should be alphanumeric',
      'any.required': 'Factory Unit Name is required'
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
  
  factoryPhone: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required()
    .messages({
      'string.base': 'Factory Phone should be a string',
      'string.length': 'Factory Phone should be exactly 10 digits',
      'string.pattern.base': 'Factory Phone should contain only numbers',
      'any.required': 'Factory Phone is required'
    }),
  
  mobileNumber: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required()
    .messages({
      'string.base': 'Mobile Number should be a string',
      'string.length': 'Mobile Number should be exactly 10 digits',
      'string.pattern.base': 'Mobile Number should contain only numbers',
      'any.required': 'Mobile Number is required'
    }),
  
  factoryEmail: Joi.string()
    .max(20)
    .email()
    .required()
    .messages({
      'string.base': 'Factory Email should be a string',
      'string.max': 'Factory Email should not exceed 20 characters',
      'string.email': 'Factory Email should be a valid email address',
      'any.required': 'Factory Email is required'
    }),

    language: Joi.string()
    .valid('EN', 'ES', 'FR', 'DE', 'IT', 'NL', 'ID', 'VI')
    .required()
    .messages({
      'string.base': 'Language should be a string',
      'any.only': 'Language must be one of EN, ES, FR, DE, IT, NL, ID, VI',
      'any.required': 'Language is required'
    }),
  
  businessEntityCode: Joi.string()
    .length(4)
    .required()
    .messages({
      'string.base': 'Business Entity Code must be a string',
      'string.length': 'Business Entity Code must be 4 characters',
      'any.required': 'Business Entity Code is required'
    })
});

const updateFactoryUnitSchema = Joi.object({
  factoryUnitName: Joi.string()
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
  factoryPhone: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/),
  mobileNumber: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/),
  language: Joi.string()
    .valid('EN', 'ES', 'FR', 'DE', 'IT', 'NL', 'ID', 'VI'),
  businessEntityCode: Joi.string()
    .length(4),
  factoryEmail: Joi.string()
    .max(20)
    .email()
}).min(1);

const validateFactoryUnit = (data) => {
  return factoryUnitSchema.validate(data, { abortEarly: false });
};

const validateFactoryUnitUpdate = (data) => {
  return updateFactoryUnitSchema.validate(data, { abortEarly: false });
};

module.exports = {
  validateFactoryUnit,
  validateFactoryUnitUpdate
};