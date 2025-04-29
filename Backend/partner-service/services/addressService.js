const prisma = require('../prisma/client');

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 20;

const getAllAddresses = async (queryParams) => {
  const { page = DEFAULT_PAGE, limit = DEFAULT_LIMIT, search } = queryParams;
  const skip = (page - 1) * limit;
  
  const where = {};
  
  if (search) {
    where.OR = [
      { street1: { contains: search, mode: 'insensitive' } },
      { street2: { contains: search, mode: 'insensitive' } },
      { city: { contains: search, mode: 'insensitive' } }
    ];
  }

  const addresses = await prisma.address.findMany({
    where,
    skip,
    take: limit,
    orderBy: { createdAt: 'desc' }
  });

  const total = await prisma.address.count({ where });

  return {
    data: addresses,
    meta: {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / limit)
    }
  };
};

const getAddressById = async (id) => {
  return await prisma.address.findUnique({ where: { id } });
};

const createAddress = async (data) => {
  return await prisma.address.create({ data });
};

const updateAddress = async (id, data) => {
  return await prisma.address.update({
    where: { id },
    data
  });
};

const deleteAddress = async (id) => {
  return await prisma.address.delete({ where: { id } });
};

module.exports = {
  getAllAddresses,
  getAddressById,
  createAddress,
  updateAddress,
  deleteAddress
};