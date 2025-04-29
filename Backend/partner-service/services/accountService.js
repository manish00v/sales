const axios = require('axios');
const prisma = require('../prisma/client');

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 100;

const BUSINESS_ENTITIES_API = 'http://localhost:3003/api/business-entities/';

// Helper function to check business entity existence
const checkBusinessEntityExists = async (businessEntityCode) => {
  try {
    const response = await axios.get(`${BUSINESS_ENTITIES_API}${businessEntityCode}`);
    return response.status === 200;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return false;
    }
    throw new Error(`Failed to verify business entity: ${error.message}`);
  }
};

const getAllAccounts = async (queryParams) => {
  try {
    const { 
      page = DEFAULT_PAGE, 
      limit = DEFAULT_LIMIT, 
      search, 
      businessEntityCode, 
      accountReceivableGL, 
      accountPayableGL, 
      accountantEmail 
    } = queryParams;
    
    const take = Math.min(limit, MAX_LIMIT);
    const skip = (page - 1) * take;
    
    const where = {};
    
    // Improved search functionality
    if (search) {
      where.OR = [
        { businessEntityCode: { contains: search, mode: 'insensitive' } },
        { accountReceivableGL: { contains: search, mode: 'insensitive' } },
        { accountPayableGL: { contains: search, mode: 'insensitive' } },
        { accountantEmail: { contains: search, mode: 'insensitive' } }
      ];
    } else {
      // Individual field searches
      if (businessEntityCode) {
        where.businessEntityCode = { contains: businessEntityCode, mode: 'insensitive' };
      }
      if (accountReceivableGL) {
        where.accountReceivableGL = { contains: accountReceivableGL, mode: 'insensitive' };
      }
      if (accountPayableGL) {
        where.accountPayableGL = { contains: accountPayableGL, mode: 'insensitive' };
      }
      if (accountantEmail) {
        where.accountantEmail = { contains: accountantEmail, mode: 'insensitive' };
      }
    }

    const [accounts, total] = await Promise.all([
      prisma.account.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.account.count({ where })
    ]);

    return {
      data: accounts,
      meta: {
        total,
        page: Number(page),
        limit: take,
        totalPages: Math.ceil(total / take)
      }
    };
  } catch (error) {
    throw new Error(`Failed to fetch accounts: ${error.message}`);
  }
};

const getAccountById = async (id) => {
  try {
    const account = await prisma.account.findUnique({ 
      where: { id } 
    });
    
    if (!account) {
      throw new Error('Account not found');
    }
    
    return account;
  } catch (error) {
    throw new Error(`Failed to fetch account: ${error.message}`);
  }
};

const createAccount = async (data) => {
  try {
    // First validate business entity exists
    const businessEntityExists = await checkBusinessEntityExists(data.businessEntityCode);
    if (!businessEntityExists) {
      throw new Error(`Business entity with code ${data.businessEntityCode} does not exist`);
    }

    // Field length validation with explicit error messages
    const fieldValidations = [
      { field: 'businessEntityCode', maxLength: 4, required: true },
      { field: 'accountReceivableGL', maxLength: 4, required: true },
      { field: 'accountPayableGL', maxLength: 4, required: true },
      { field: 'gstin', maxLength: 20, required: true },
      { field: 'vatNumber', maxLength: 15, required: true },
      { field: 'pan', exactLength: 10, required: true },
      { field: 'tan', exactLength: 10, required: true },
      { field: 'currency', maxLength: 30, required: true },
      { field: 'paymentMethod', maxLength: 15, required: true },
      { field: 'invoicingMethod', maxLength: 10, required: true },
      { field: 'accountantPhone', maxLength: 30, required: true },
      { field: 'accountantEmail', maxLength: 30, required: true }
    ];

    // Validate each field
    for (const validation of fieldValidations) {
      const value = data[validation.field];
      
      if (validation.required && !value) {
        throw new Error(`${validation.field} is required`);
      }

      if (value) {
        if (validation.exactLength && value.length !== validation.exactLength) {
          throw new Error(`${validation.field} must be exactly ${validation.exactLength} characters`);
        }
        
        if (validation.maxLength && value.length > validation.maxLength) {
          throw new Error(`${validation.field} must be ${validation.maxLength} characters or less`);
        }
      }
    }

    // Additional format validations
    if (data.pan && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(data.pan)) {
      throw new Error('PAN must be in the format AAAAA1111A');
    }

    if (data.tan && !/^[A-Z]{4}[0-9]{5}[A-Z]{1}$/.test(data.tan)) {
      throw new Error('TAN must be in the format AAAA11111A');
    }

    if (data.accountantEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.accountantEmail)) {
      throw new Error('Invalid email format');
    }

    const newAccount = await prisma.account.create({
      data: {
        ...data,
        paymentMethod: data.paymentMethod.toUpperCase(),
        invoicingMethod: data.invoicingMethod.toUpperCase(),
        currency: data.currency.toUpperCase()
      }
    });

    return newAccount;
  } catch (error) {
    console.error('Account creation failed:', error);
    
    if (error.code === 'P2002') {
      // Handle unique constraint violations
      const field = error.meta?.target?.join(', ') || 'unknown field';
      throw new Error(`Account with duplicate ${field} already exists`);
    }
    
    throw new Error(`Failed to create account: ${error.message}`);
  }
};

const updateAccount = async (id, data) => {
  try {
    // Check if account exists
    const existingAccount = await prisma.account.findUnique({ where: { id } });
    if (!existingAccount) {
      throw new Error('Account not found');
    }

    // If businessEntityCode is being updated, validate it exists
    if (data.businessEntityCode && data.businessEntityCode !== existingAccount.businessEntityCode) {
      const businessEntityExists = await checkBusinessEntityExists(data.businessEntityCode);
      if (!businessEntityExists) {
        throw new Error(`Business entity with code ${data.businessEntityCode} does not exist`);
      }
    }

    const updatedAccount = await prisma.account.update({
      where: { id },
      data: {
        ...data,
        ...(data.paymentMethod && { paymentMethod: data.paymentMethod.toUpperCase() }),
        ...(data.invoicingMethod && { invoicingMethod: data.invoicingMethod.toUpperCase() }),
        ...(data.currency && { currency: data.currency.toUpperCase() })
      }
    });

    return updatedAccount;
  } catch (error) {
    if (error.code === 'P2002') {
      throw new Error('Account with similar unique fields already exists');
    }
    throw new Error(`Failed to update account: ${error.message}`);
  }
};

const deleteAccount = async (id) => {
  try {
    // Check if account exists
    const existingAccount = await prisma.account.findUnique({ where: { id } });
    if (!existingAccount) {
      throw new Error('Account not found');
    }

    await prisma.account.delete({ where: { id } });
    return { message: 'Account deleted successfully' };
  } catch (error) {
    throw new Error(`Failed to delete account: ${error.message}`);
  }
};

const getDropdownOptions = async () => {
  try {
    return {
      currencies: Object.values(prisma.Currency),
      paymentMethods: Object.values(prisma.PaymentMethod),
      invoicingMethods: Object.values(prisma.InvoicingMethod),
      creditStatuses: Object.values(prisma.CreditStatus),
      paymentToleranceDays: [3, 5, 7, 14]
    };
  } catch (error) {
    throw new Error(`Failed to fetch dropdown options: ${error.message}`);
  }
};

const searchAccounts = async (searchTerm) => {
  try {
    return await prisma.account.findMany({
      where: {
        OR: [
          { businessEntityCode: { contains: searchTerm, mode: 'insensitive' } },
          { gstin: { contains: searchTerm, mode: 'insensitive' } },
          { pan: { contains: searchTerm, mode: 'insensitive' } }
        ]
      },
      take: 10,
      orderBy: { businessEntityCode: 'asc' }
    });
  } catch (error) {
    throw new Error(`Failed to search accounts: ${error.message}`);
  }
};

module.exports = {
  getAllAccounts,
  getAccountById,
  createAccount,
  updateAccount,
  deleteAccount,
  getDropdownOptions,
  searchAccounts
};