const prisma = require('../prisma/client');

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 20;

const getAllBankDetails = async (queryParams) => {
  const { page = DEFAULT_PAGE, limit = DEFAULT_LIMIT, search } = queryParams;
  const skip = (page - 1) * limit;
  
  const where = {};
  
  if (search) {
    where.OR = [
      { bankName: { contains: search, mode: 'insensitive' } },
      { holderName: { contains: search, mode: 'insensitive' } },
      { branchName: { contains: search, mode: 'insensitive' } },
      { ifscCode: { contains: search, mode: 'insensitive' } }
    ];
  }

  const bankDetails = await prisma.bankDetail.findMany({
    where,
    skip,
    take: limit,
    orderBy: { createdAt: 'desc' }
  });

  const total = await prisma.bankDetail.count({ where });

  return {
    data: bankDetails,
    meta: {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / limit)
    }
  };
};

const getBankDetailById = async (id) => {
  return await prisma.bankDetail.findUnique({ where: { id } });
};

const createBankDetail = async (data) => {
  return await prisma.bankDetail.create({ 
    data: {
      ...data,
      // Ensure addressLine2 is set to null if empty
      addressLine2: data.addressLine2 || null
    }
  });
};

const updateBankDetail = async (id, data) => {
  return await prisma.bankDetail.update({
    where: { id },
    data: {
      ...data,
      addressLine2: data.addressLine2 || null
    }
  });
};

const deleteBankDetail = async (id) => {
  return await prisma.bankDetail.delete({ where: { id } });
};

const getAccountTypes = async () => {
  return Object.values(prisma.BankAccountType);
};

module.exports = {
  getAllBankDetails,
  getBankDetailById,
  createBankDetail,
  updateBankDetail,
  deleteBankDetail,
  getAccountTypes
};