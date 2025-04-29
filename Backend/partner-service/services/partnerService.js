const prisma = require('../prisma/client');

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 100;

const getAllPartners = async (queryParams) => {
  const { 
    page = DEFAULT_PAGE, 
    limit = DEFAULT_LIMIT, 
    search, 
    partnerType, 
    partnerCategory, 
    function: func 
  } = queryParams;
  
  const take = Math.min(limit, MAX_LIMIT);
  const skip = (page - 1) * take;
  
  const where = {};
  
  if (search) {
    where.OR = [
      { partnerType: { contains: search, mode: 'insensitive' } },
      { partnerCategory: { contains: search, mode: 'insensitive' } },
      { function: { contains: search, mode: 'insensitive' } }
    ];
  }
  
  if (partnerType) where.partnerType = partnerType;
  if (partnerCategory) where.partnerCategory = partnerCategory;
  if (func) where.function = func;

  const partners = await prisma.partner.findMany({
    where,
    skip,
    take,
    orderBy: { createdAt: 'desc' }
  });

  const total = await prisma.partner.count({ where });

  return {
    data: partners,
    meta: {
      total,
      page: Number(page),
      limit: take,
      totalPages: Math.ceil(total / take)
    }
  };
};

const getPartnerById = async (id) => {
  const partner = await prisma.partner.findUnique({ where: { id } });
  if (!partner) throw new Error('Partner not found');
  return partner;
};

const createPartner = async (data) => {
  return await prisma.partner.create({ data });
};

const updatePartner = async (id, data) => {
  try {
    return await prisma.partner.update({ 
      where: { id }, 
      data 
    });
  } catch (error) {
    if (error.code === 'P2025') {
      throw new Error('Partner not found');
    }
    throw error;
  }
};

const deletePartner = async (id) => {
  try {
    return await prisma.partner.delete({ where: { id } });
  } catch (error) {
    if (error.code === 'P2025') {
      throw new Error('Partner not found');
    }
    throw error;
  }
};

const getDropdownOptions = async () => {
  const partnerTypes = await prisma.partner.findMany({
    distinct: ['partnerType'],
    select: { partnerType: true },
    orderBy: { partnerType: 'asc' }
  });
  
  const partnerCategories = await prisma.partner.findMany({
    distinct: ['partnerCategory'],
    select: { partnerCategory: true },
    orderBy: { partnerCategory: 'asc' }
  });
  
  const functions = await prisma.partner.findMany({
    distinct: ['function'],
    select: { function: true },
    orderBy: { function: 'asc' }
  });

  return {
    partnerTypes: partnerTypes.map(p => p.partnerType),
    partnerCategories: partnerCategories.map(p => p.partnerCategory),
    functions: functions.map(p => p.function)
  };
};

module.exports = {
  getAllPartners,
  getPartnerById,
  createPartner,
  updatePartner,
  deletePartner,
  getDropdownOptions
};