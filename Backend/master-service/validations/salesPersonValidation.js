const Joi = require('joi');

const salesPersonIdRegex = /^[A-Z0-9]{4}$/;
const alphanumeric30Regex = /^[a-zA-Z0-9 ]{1,30}$/;
const alphanumeric50Regex = /^[a-zA-Z0-9 ]{1,50}$/;
const alphabetic30Regex = /^[a-zA-Z ]{1,30}$/;
const pinCodeRegex = /^\d{4,6}$/;
const phoneRegex = /^\d{10}$/;
const emailRegex = /^[^\s@]{1,20}@[^\s@]+\.[^\s@]+$/;

const departments = [
  'Purchasing', 'Sales', 'Finance', 'Production', 'Export', 
  'Marketing', 'Transport', 'Management', 'IT', 
  'External Sales', 'Internal Sales', 'Warehouse'
];

const salesPersonRoles = [
  'Sales Trainer', 'Business Analyst', 'Channel Sales Manager',
  'Key Account Manager', 'Sales Coordinator', 'Zonal Sales Manager',
  'Regional Sales Manager', 'Area Sales Manager', 'Sales Officer',
  'Senior Sales Executive', 'Sales Representative'
];

const createSalesPersonSchema = Joi.object({
  SalesPersonId: Joi.string().pattern(salesPersonIdRegex).required(),
  SalesPersonName: Joi.string().pattern(alphanumeric30Regex).required(),
  street1: Joi.string().pattern(alphanumeric50Regex).required(),
  street2: Joi.string().pattern(alphanumeric50Regex).optional(),
  city: Joi.string().pattern(alphabetic30Regex).required(),
  state: Joi.string().pattern(alphabetic30Regex).required(),
  region: Joi.string().pattern(alphanumeric50Regex).required(),
  country: Joi.string().pattern(alphabetic30Regex).required(),
  pinCode: Joi.string().pattern(pinCodeRegex).required(),
  phoneNumber: Joi.string().pattern(phoneRegex).required(),
  mobileNumber: Joi.string().pattern(phoneRegex).required(),
  email: Joi.string().pattern(emailRegex).required(),
  department: Joi.string().valid(...departments).required(),
  salesPersonRole: Joi.string().valid(...salesPersonRoles).required()
});

const updateSalesPersonSchema = Joi.object({
  SalesPersonName: Joi.string().pattern(alphanumeric30Regex),
  street1: Joi.string().pattern(alphanumeric50Regex),
  street2: Joi.string().pattern(alphanumeric50Regex),
  city: Joi.string().pattern(alphabetic30Regex),
  state: Joi.string().pattern(alphabetic30Regex),
  region: Joi.string().pattern(alphanumeric50Regex),
  country: Joi.string().pattern(alphabetic30Regex),
  pinCode: Joi.string().pattern(pinCodeRegex),
  phoneNumber: Joi.string().pattern(phoneRegex),
  mobileNumber: Joi.string().pattern(phoneRegex),
  email: Joi.string().pattern(emailRegex),
  department: Joi.string().valid(...departments),
  salesPersonRole: Joi.string().valid(...salesPersonRoles)
}).min(1);

module.exports = {
  createSalesPersonSchema,
  updateSalesPersonSchema,
  salesPersonIdRegex
};