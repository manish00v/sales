const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const roles = [
  'Sales Trainer', 'Business Analyst', 'Channel Sales Manager', 'Key Account Manager',
  'Sales Coordinator', 'Zonal Sales Manager', 'Regional Sales Manager', 'Area Sales Manager',
  'Sales Officer', 'Senior Sales Executive', 'Sales Representative'
];

const departments = [
  'Purchasing', 'Sales', 'Finance', 'Production', 'Export', 'Marketing',
  'Transport', 'Management', 'IT', 'External Sales', 'Internal Sales', 'Warehouse'
];

async function createSourcingPerson(data) {
  // Validate role
  if (!roles.includes(data.sourcingPersonRole)) {
    throw new Error('Invalid sourcing person role. Valid roles are: ' + roles.join(', '));
  }

  // Validate department
  if (!departments.includes(data.department)) {
    throw new Error('Invalid department. Valid departments are: ' + departments.join(', '));
  }

  return await prisma.sourcingPerson.create({
    data: {
      sourcingPersonId: data.sourcingPersonId,
      sourcingPersonName: data.sourcingPersonName,
      sourcingPersonRole: data.sourcingPersonRole,
      street1: data.street1,
      street2: data.street2 || null,
      city: data.city,
      state: data.state,
      region: data.region,
      country: data.country,
      pinCode: data.pinCode,
      phoneNumber: data.phoneNumber,
      mobileNumber: data.mobileNumber,
      email: data.email,
      department: data.department
    }
  });
}

async function getSourcingPersonById(id) {
  return await prisma.sourcingPerson.findUnique({
    where: { sourcingPersonId: id }
  });
}

async function getAllSourcingPersons() {
  return await prisma.sourcingPerson.findMany({
    orderBy: {
      sourcingPersonName: 'asc'
    }
  });
}

async function updateSourcingPerson(id, data) {
  // Validate role if provided
  if (data.sourcingPersonRole && !roles.includes(data.sourcingPersonRole)) {
    throw new Error('Invalid sourcing person role. Valid roles are: ' + roles.join(', '));
  }

  // Validate department if provided
  if (data.department && !departments.includes(data.department)) {
    throw new Error('Invalid department. Valid departments are: ' + departments.join(', '));
  }

  return await prisma.sourcingPerson.update({
    where: { sourcingPersonId: id },
    data: {
      sourcingPersonName: data.sourcingPersonName,
      sourcingPersonRole: data.sourcingPersonRole,
      street1: data.street1,
      street2: data.street2,
      city: data.city,
      state: data.state,
      region: data.region,
      country: data.country,
      pinCode: data.pinCode,
      phoneNumber: data.phoneNumber,
      mobileNumber: data.mobileNumber,
      email: data.email,
      department: data.department
    }
  });
}

async function deleteSourcingPerson(id) {
  return await prisma.sourcingPerson.delete({
    where: { sourcingPersonId: id }
  });
}

module.exports = {
  createSourcingPerson,
  getSourcingPersonById,
  getAllSourcingPersons,
  updateSourcingPerson,
  deleteSourcingPerson
};