const Joi = require('joi');

const inventoryBayIdRegex = /^[a-zA-Z0-9]{4}$/;
const inventoryUnitIdRegex = /^[a-zA-Z0-9]{4}$/;
const nameRegex = /^[a-zA-Z0-9 ]{1,30}$/;
const stockingTypes = ['Rack', 'Bin', 'Shelf', 'Floor', 'External Storage', 'Cold Storage'];
const streetAddressRegex = /^[a-zA-Z0-9 ,.-]{1,50}$/;
const cityRegex = /^[a-zA-Z ]{1,30}$/;
const regionRegex = /^[a-zA-Z0-9 ]{1,20}$/;
const countryRegex = /^[a-zA-Z ]{1,30}$/;
const pinCodeRegex = /^[0-9]{6}$/;

const createInventoryBaySchema = Joi.object({
  InventoryBayId: Joi.string()
    .pattern(inventoryBayIdRegex)
    .required(),
  InventoryBayName: Joi.string()
    .pattern(nameRegex)
    .max(30)
    .required(),
  StockingType: Joi.string()
    .valid(...stockingTypes)
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
  Country: Joi.string()
    .pattern(countryRegex)
    .max(30)
    .required(),
  PinCode: Joi.string()
    .pattern(pinCodeRegex)
    .required(),
  inventoryUnitId: Joi.string()
    .pattern(inventoryUnitIdRegex)
    .optional()
    .allow(null, '')
    .messages({
      'string.pattern.base': 'Inventory Unit ID must be 4 character alphanumeric'
    })
});

const updateInventoryBaySchema = Joi.object({
  InventoryBayName: Joi.string()
    .pattern(nameRegex)
    .max(30),
  StockingType: Joi.string()
    .valid(...stockingTypes),
  StreetAddress: Joi.string()
    .pattern(streetAddressRegex)
    .max(50),
  City: Joi.string()
    .pattern(cityRegex)
    .max(30),
  Region: Joi.string()
    .pattern(regionRegex)
    .max(20),
  Country: Joi.string()
    .pattern(countryRegex)
    .max(30),
  PinCode: Joi.string()
    .pattern(pinCodeRegex),
  inventoryUnitId: Joi.string()
    .pattern(inventoryUnitIdRegex)
    .optional()
    .allow(null, '')
}).min(1).message('At least one field must be provided for update');

module.exports = {
  createInventoryBaySchema,
  updateInventoryBaySchema
};