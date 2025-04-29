const Joi = require('joi');

const salesOfficeSchema = Joi.object({
  salesOfficeCode: Joi.string()
    .length(4)
    .pattern(/^[a-zA-Z0-9]+$/)
    .required()
    .messages({
      'string.base': 'Sales Office Code should be a string',
      'string.length': 'Sales Office Code should be exactly 4 characters',
      'string.pattern.base': 'Sales Office Code should be alphanumeric',
      'any.required': 'Sales Office Code is required'
    }),
  
  salesOfficeDesc: Joi.string()
    .max(30)
    .pattern(/^[a-zA-Z0-9 ]+$/)
    .required()
    .messages({
      'string.base': 'Sales Office Description should be a string',
      'string.max': 'Sales Office Description should not exceed 30 characters',
      'string.pattern.base': 'Sales Office Description should be alphanumeric',
      'any.required': 'Sales Office Description is required'
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
    })
});

const updateSalesOfficeSchema = Joi.object({
  salesOfficeDesc: Joi.string()
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
    .pattern(/^[0-9]+$/)
}).min(1);

const validateSalesOffice = (data) => {
  return salesOfficeSchema.validate(data, { abortEarly: false });
};

const validateSalesOfficeUpdate = (data) => {
  return updateSalesOfficeSchema.validate(data, { abortEarly: false });
};

module.exports = {
  validateSalesOffice,
  validateSalesOfficeUpdate
};