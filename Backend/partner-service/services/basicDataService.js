const prisma = require('../prisma/client');

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 20;

const getAllBasicData = async (queryParams) => {
  const { page = DEFAULT_PAGE, limit = DEFAULT_LIMIT, search } = queryParams;
  const skip = (page - 1) * limit;
  
  const where = {};
  
  if (search) {
    where.OR = [
      { firstName: { contains: search, mode: 'insensitive' } },
      { lastName: { contains: search, mode: 'insensitive' } },
      { businessName: { contains: search, mode: 'insensitive' } }
    ];
  }

  const data = await prisma.basicData.findMany({
    where,
    skip,
    take: limit,
    orderBy: { createdAt: 'desc' }
  });

  const total = await prisma.basicData.count({ where });

  return {
    data,
    meta: {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / limit)
    }
  };
};

const getBasicDataById = async (id) => {
  return await prisma.basicData.findUnique({ where: { id } });
};

const createBasicData = async (data) => {
  return await prisma.basicData.create({ data });
};

const updateBasicData = async (id, data) => {
  return await prisma.basicData.update({ 
    where: { id }, 
    data 
  });
};

const deleteBasicData = async (id) => {
  return await prisma.basicData.delete({ where: { id } });
};

const getDropdownOptions = async () => {
  return {
    titles: Object.values(prisma.Title),
    partnerClassifications: Object.values(prisma.PartnerClassification),
    lifeCycleStatuses: Object.values(prisma.LifeCycleStatus)
  };
};

module.exports = {
  getAllBasicData,
  getBasicDataById,
  createBasicData,
  updateBasicData,
  deleteBasicData,
  getDropdownOptions
};