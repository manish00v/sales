const { PrismaClient } = require('@prisma/client');
const axios = require('axios');
const prisma = new PrismaClient();

const BUSINESS_UNITS_API = 'http://localhost:3003/api/business-units';
const SALES_CHANNELS_API = 'http://localhost:3003/api/sales-channels';

const getAllContactPersons = async () => {
  return await prisma.contactPerson.findMany({
    orderBy: { createdAt: 'desc' }
  });
};

const getContactPersonByContactPersonId = async (contactPersonId) => {
  const contactPerson = await prisma.contactPerson.findUnique({
    where: { ContactPersonId: contactPersonId }
  });

  if (!contactPerson) {
    throw new Error('Contact person not found');
  }
  return contactPerson;
};

const validateBusinessUnit = async (businessUnitCode) => {
  try {
    const response = await axios.get(`${BUSINESS_UNITS_API}/${businessUnitCode}`);
    
    if (!response.data) {
      throw new Error(`Business Unit "${businessUnitCode}" does not exist`);
    }
    
    return true;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error(`Business Unit "${businessUnitCode}" does not exist`);
    }
    throw new Error(`Business Unit validation error: ${error.message}`);
  }
};

const validateSalesChannel = async (salesChannelId) => {
  try {
    const response = await axios.get(`${SALES_CHANNELS_API}/${salesChannelId}`);
    
    if (!response.data) {
      throw new Error(`Sales Channel "${salesChannelId}" does not exist`);
    }
    
    return true;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error(`Sales Channel "${salesChannelId}" does not exist`);
    }
    throw new Error(`Sales Channel validation error: ${error.message}`);
  }
};

const createContactPerson = async (data) => {
  // Validate required fields first
  if (!data.ContactPersonId || !data.BusinessUnitCode || !data.SalesChannelId) {
    throw new Error('Missing required fields');
  }

  // Check for existing contact person
  const existingContact = await prisma.contactPerson.findUnique({
    where: { ContactPersonId: data.ContactPersonId }
  });

  if (existingContact) {
    throw new Error(`Contact Person ID "${data.ContactPersonId}" already exists`);
  }

  // Validate references
  await validateBusinessUnit(data.BusinessUnitCode);
  await validateSalesChannel(data.SalesChannelId);

  // Create new contact person
  return await prisma.contactPerson.create({
    data: {
      CustomerId: data.CustomerId,
      ContactPersonId: data.ContactPersonId,
      FirstName: data.FirstName,
      MiddleName: data.MiddleName || null,
      LastName: data.LastName,
      Department: data.Department,
      Function: data.Function,
      Gender: data.Gender,
      Street1: data.Street1,
      Street2: data.Street2 || null,
      City: data.City,
      State: data.State,
      Region: data.Region,
      Country: data.Country,
      PinCode: data.PinCode,
      BusinessUnitCode: data.BusinessUnitCode,
      SalesChannelId: data.SalesChannelId
    }
  });
};

const updateContactPersonByContactPersonId = async (contactPersonId, data) => {
  // Check if contact person exists
  const existing = await prisma.contactPerson.findUnique({ 
    where: { ContactPersonId: contactPersonId } 
  });
  if (!existing) {
    throw new Error('Contact person not found');
  }

  // Validate sales channel if being updated
  if (data.SalesChannelId && data.SalesChannelId !== existing.SalesChannelId) {
    await validateSalesChannel(data.SalesChannelId);
  }

  return await prisma.contactPerson.update({
    where: { ContactPersonId: contactPersonId },
    data: {
      FirstName: data.FirstName || existing.FirstName,
      MiddleName: data.MiddleName ?? existing.MiddleName,
      LastName: data.LastName || existing.LastName,
      Department: data.Department || existing.Department,
      Function: data.Function || existing.Function,
      Gender: data.Gender || existing.Gender,
      Street1: data.Street1 || existing.Street1,
      Street2: data.Street2 ?? existing.Street2,
      City: data.City || existing.City,
      State: data.State || existing.State,
      Region: data.Region || existing.Region,
      Country: data.Country || existing.Country,
      PinCode: data.PinCode || existing.PinCode,
      SalesChannelId: data.SalesChannelId || existing.SalesChannelId
    }
  });
};

const deleteContactPersonByContactPersonId = async (contactPersonId) => {
  const existing = await prisma.contactPerson.findUnique({ 
    where: { ContactPersonId: contactPersonId } 
  });
  if (!existing) {
    throw new Error('Contact person not found');
  }

  return await prisma.contactPerson.delete({
    where: { ContactPersonId: contactPersonId }
  });
};

module.exports = {
  getAllContactPersons,
  getContactPersonByContactPersonId,
  createContactPerson,
  updateContactPersonByContactPersonId,
  deleteContactPersonByContactPersonId
};