const Joi = require('joi');
const axios = require('axios');

const departments = [
  'Purchasing', 'Sales', 'Finance', 'Production', 'Export',
  'Marketing', 'Transport', 'Management', 'IT', 'External Sales',
  'Internal Sales', 'Warehouse', 'Worksafety', 'Other'
];

const functions = [
  'Marketing Staff', 'Managing Director', 'Purchasing Manager', 'Buyer',
  'Warehouse Staff', 'IT Manager', 'Sales Person', 'Invoice Recipient',
  'Sales Manager', 'HR Manager', 'Product Manager'
];

const genders = ['Male', 'Female', 'Other'];

const createContactPersonSchema = Joi.object({
  CustomerId: Joi.string()
    .max(20)
    .required()
    .messages({
      'any.required': 'Customer ID is required'
    }),
  ContactPersonId: Joi.string()
    .pattern(/^[0-9]{1,20}$/)
    .required()
    .messages({
      'string.pattern.base': 'Contact Person ID must be numeric (max 20 digits)',
      'any.required': 'Contact Person ID is required'
    }),
  FirstName: Joi.string()
    .max(35)
    .required()
    .messages({
      'any.required': 'First Name is required'
    }),
  MiddleName: Joi.string()
    .max(35)
    .allow(null, ''),
  LastName: Joi.string()
    .max(35)
    .required()
    .messages({
      'any.required': 'Last Name is required'
    }),
  Department: Joi.string()
    .valid(...departments)
    .required()
    .messages({
      'any.only': `Department must be one of: ${departments.join(', ')}`,
      'any.required': 'Department is required'
    }),
  Function: Joi.string()
    .valid(...functions)
    .required()
    .messages({
      'any.only': `Function must be one of: ${functions.join(', ')}`,
      'any.required': 'Function is required'
    }),
  Gender: Joi.string()
    .valid(...genders)
    .required()
    .messages({
      'any.only': `Gender must be one of: ${genders.join(', ')}`,
      'any.required': 'Gender is required'
    }),
  Street1: Joi.string()
    .max(50)
    .required()
    .messages({
      'any.required': 'Street 1 is required'
    }),
  Street2: Joi.string()
    .max(50)
    .allow(null, ''),
  City: Joi.string()
    .pattern(/^[a-zA-Z ]+$/)
    .max(30)
    .required()
    .messages({
      'string.pattern.base': 'City must contain only letters',
      'any.required': 'City is required'
    }),
  State: Joi.string()
    .pattern(/^[a-zA-Z ]+$/)
    .max(30)
    .required()
    .messages({
      'string.pattern.base': 'State must contain only letters',
      'any.required': 'State is required'
    }),
  Region: Joi.string()
    .max(50)
    .required()
    .messages({
      'any.required': 'Region is required'
    }),
  Country: Joi.string()
    .pattern(/^[a-zA-Z ]+$/)
    .max(30)
    .required()
    .messages({
      'string.pattern.base': 'Country must contain only letters',
      'any.required': 'Country is required'
    }),
  PinCode: Joi.string()
    .pattern(/^[0-9]{4,6}$/)
    .required()
    .messages({
      'string.pattern.base': 'Pin Code must be 4-6 digits',
      'any.required': 'Pin Code is required'
    }),
  BusinessUnitCode: Joi.string()
    .pattern(/^[a-zA-Z0-9]{4}$/)
    .required()
    .external(async (value) => {
      try {
        const response = await axios.get(`http://localhost:3003/api/business-units?code=${value}`);
        if (!response.data || response.data.length === 0) {
          throw new Error('Business Unit Code does not exist');
        }
      } catch (error) {
        throw new Error('Failed to validate Business Unit Code');
      }
    })
    .messages({
      'string.pattern.base': 'Business Unit Code must be 4 alphanumeric characters',
      'any.required': 'Business Unit Code is required',
      'any.external': 'Business Unit Code does not exist in the system'
    }),
  SalesChannelId: Joi.string()
    .max(30)
    .required()
    .external(async (value) => {
      try {
        const response = await axios.get(`http://localhost:3003/api/sales-channels/${value}`);
        if (!response.data) {
          throw new Error('Sales Channel ID does not exist');
        }
      } catch (error) {
        throw new Error('Failed to validate Sales Channel ID');
      }
    })
    .messages({
      'any.required': 'Sales Channel ID is required',
      'any.external': 'Sales Channel ID does not exist in the system'
    })
});

const updateContactPersonSchema = Joi.object({
  FirstName: Joi.string()
    .max(35),
  MiddleName: Joi.string()
    .max(35)
    .allow(null, ''),
  LastName: Joi.string()
    .max(35),
  Department: Joi.string()
    .valid(...departments),
  Function: Joi.string()
    .valid(...functions),
  Gender: Joi.string()
    .valid(...genders),
  Street1: Joi.string()
    .max(50),
  Street2: Joi.string()
    .max(50)
    .allow(null, ''),
  City: Joi.string()
    .pattern(/^[a-zA-Z ]+$/)
    .max(30),
  State: Joi.string()
    .pattern(/^[a-zA-Z ]+$/)
    .max(30),
  Region: Joi.string()
    .max(50),
  Country: Joi.string()
    .pattern(/^[a-zA-Z ]+$/)
    .max(30),
  PinCode: Joi.string()
    .pattern(/^[0-9]{4,6}$/),
  SalesChannelId: Joi.string()
    .max(30)
    .external(async (value) => {
      try {
        const response = await axios.get(`http://localhost:3003/api/sales-channels/${value}`);
        if (!response.data) {
          throw new Error('Sales Channel ID does not exist');
        }
      } catch (error) {
        throw new Error('Failed to validate Sales Channel ID');
      }
    })
}).min(1).message('At least one field must be provided for update');

module.exports = {
  createContactPersonSchema,
  updateContactPersonSchema
};