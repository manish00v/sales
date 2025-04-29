const Joi = require('joi');

const deliveryLocationSchema = Joi.object({
  deliveryLocationCode: Joi.string()
    .length(4)
    .pattern(/^[a-zA-Z0-9]+$/)
    .required()
    .messages({
      'string.base': 'Delivery Location Code should be a string',
      'string.length': 'Delivery Location Code should be exactly 4 characters',
      'string.pattern.base': 'Delivery Location Code should be alphanumeric',
      'any.required': 'Delivery Location Code is required'
    }),
  
  deliveryLocationName: Joi.string()
    .max(30)
    .pattern(/^[a-zA-Z0-9 ]+$/)
    .required()
    .messages({
      'string.base': 'Delivery Location Name should be a string',
      'string.max': 'Delivery Location Name should not exceed 30 characters',
      'string.pattern.base': 'Delivery Location Name should be alphanumeric',
      'any.required': 'Delivery Location Name is required'
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

const updateDeliveryLocationSchema = Joi.object({
  deliveryLocationName: Joi.string()
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

const validateDeliveryLocation = (data) => {
  return deliveryLocationSchema.validate(data, { abortEarly: false });
};

const validateDeliveryLocationUpdate = (data) => {
  return updateDeliveryLocationSchema.validate(data, { abortEarly: false });
};

module.exports = {
  validateDeliveryLocation,
  validateDeliveryLocationUpdate
};