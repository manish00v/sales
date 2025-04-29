const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const axios = require('axios');

async function checkExternalIdExists(url, id) {
  try {
    const response = await axios.get(`${url}${id}`);
    return response.status === 200;
  } catch (error) {
    return false;
  }
}

async function createRelatedParty(data) {
  // Check if sourcingTeamId exists
  if (data.sourcingPersonId) {
    const sourcingPersonExists = await checkExternalIdExists(
      'http://localhost:3003/api/sourcing-persons/',
      data.sourcingPersonId
    );
    if (!sourcingPersonExists) {
      throw new Error('SourcingPersonId does not exist');
    }
  }

  // Check if contactPersonId exists
  if (data.contactPersonId) {
    const contactPersonExists = await checkExternalIdExists(
      'http://localhost:5003/api/contact-persons/',
      data.contactPersonId
    );
    if (!contactPersonExists) {
      throw new Error('ContactPersonId does not exist');
    }
  }

  // Check if salesPersonCode exists
  if (data.salesPersonId) {
    const salesPersonExists = await checkExternalIdExists(
      'http://localhost:3003/api/sales-persons/',
      data.salesPersonId
    );
    if (!salesPersonExists) {
      throw new Error('SalesPersonCode does not exist');
    }
  }

  return await prisma.relatedParty.create({
    data: {
      orderingParty: data.orderingParty,
      receivingParty: data.receivingParty,
      invoicingParty: data.invoicingParty,
      payingParty: data.payingParty,
      groupOrganisation: data.groupOrganisation,
      salesPersonId: data.salesPersonId,
      sourcingPersonId: data.sourcingPersonId,
      contactPersonId: data.contactPersonId
    }
  });
}

async function getRelatedPartyById(id) {
  return await prisma.relatedParty.findUnique({
    where: { id }
  });
}

async function getAllRelatedParties() {
  return await prisma.relatedParty.findMany();
}

async function updateRelatedParty(id, data) {
  return await prisma.relatedParty.update({
    where: { id },
    data: {
      orderingParty: data.orderingParty,
      receivingParty: data.receivingParty,
      invoicingParty: data.invoicingParty,
      payingParty: data.payingParty,
      groupOrganisation: data.groupOrganisation,
      salesPersonId: data.salesPersonId,
      sourcingPersonId: data.sourcingPersonId,
      contactPersonId: data.contactPersonId
    }
  });
}

async function deleteRelatedParty(id) {
  return await prisma.relatedParty.delete({
    where: { id }
  });
}

module.exports = {
  createRelatedParty,
  getRelatedPartyById,
  getAllRelatedParties,
  updateRelatedParty,
  deleteRelatedParty
};