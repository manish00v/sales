const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const axios = require('axios');

// Order verification helper function
async function verifyOrderExists(orderId) {
  try {
    const response = await axios.get(`http://localhost:3000/api/sales-orders/${orderId}`, {
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    if (response.status === 200) {
      if (response.data.exists !== undefined) {
        if (response.data.exists) return true;
        throw new Error(`Order ${orderId} not found`);
      }
      if (response.data.id || response.data.orderId) {
        return true;
      }
      throw new Error("Invalid order data format");
    }
    throw new Error(`Order service returned status ${response.status}`);
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error(`Order ${orderId} not found`);
    }
    throw new Error(`Order verification failed: ${error.message}`);
  }
}

exports.createCurrencyExchange = async (exchangeData) => {
  try {
    const { invoiceId, orderId, customerId, currencyCode, effectiveDate, exchangeRate } = exchangeData;

    // 1. Check for duplicate currency exchange record
    const existingExchange = await prisma.currencyExchangeRate.findFirst({
      where: { invoiceId }
    });

    if (existingExchange) {
      throw new Error(`Currency exchange record for invoice ${invoiceId} already exists`);
    }

    // 2. Validate required fields
    if (!invoiceId || !orderId || !customerId || !currencyCode || !effectiveDate || exchangeRate === undefined) {
      throw new Error("All fields are required");
    }

    // 3. Validate order exists via API
    await verifyOrderExists(orderId);

    // 4. Validate exchange rate
    const parsedRate = parseFloat(exchangeRate);
    if (isNaN(parsedRate)) {
      throw new Error("Exchange rate must be a number");
    }

    // 5. Validate invoice relationships
    const invoice = await prisma.invoice.findUnique({
      where: { invoiceId }
    });

    if (!invoice) {
      throw new Error("Invoice not found");
    }

    if (invoice.customerId !== customerId || invoice.orderId !== orderId) {
      throw new Error("Invoice doesn't match provided customer/order");
    }

    // 6. Create new record
    return await prisma.currencyExchangeRate.create({
      data: {
        invoiceId,
        orderId,
        customerId,
        currencyCode,
        effectiveDate: new Date(effectiveDate),
        exchangeRate: parsedRate
      }
    });

  } catch (error) {
    console.error("Currency exchange creation failed:", error.message);
    throw error;
  }
};

exports.getCurrencyExchangeByInvoiceId = async (invoiceId) => {
  try {
    return await prisma.currencyExchangeRate.findFirst({
      where: { invoiceId },
      include: {
        invoice: true,
        order: true
      }
    });
  } catch (error) {
    console.error("Failed to fetch currency exchange:", error.message);
    throw error;
  }
};

exports.editCurrencyExchange = async (invoiceId, updateData) => {
  try {
    // 1. Find existing record
    const existingRecord = await prisma.currencyExchangeRate.findFirst({
      where: { invoiceId }
    });

    if (!existingRecord) {
      throw new Error("Currency exchange record not found");
    }

    // 2. If orderId is updated, verify it exists
    if (updateData.orderId && updateData.orderId !== existingRecord.orderId) {
      await verifyOrderExists(updateData.orderId);
    }

    // 3. Validate invoice relationships if updated
    if (updateData.customerId || updateData.orderId) {
      const invoice = await prisma.invoice.findUnique({
        where: { invoiceId }
      });

      if (!invoice) {
        throw new Error("Invoice not found");
      }

      const effectiveCustomerId = updateData.customerId || existingRecord.customerId;
      const effectiveOrderId = updateData.orderId || existingRecord.orderId;

      if (invoice.customerId !== effectiveCustomerId || invoice.orderId !== effectiveOrderId) {
        throw new Error("Updated values don't match invoice records");
      }
    }

    // 4. Prepare update data
    const updateValues = {
      currencyCode: updateData.currencyCode || existingRecord.currencyCode,
      effectiveDate: updateData.effectiveDate ? 
        new Date(updateData.effectiveDate) : existingRecord.effectiveDate,
      exchangeRate: updateData.exchangeRate ? 
        parseFloat(updateData.exchangeRate) : existingRecord.exchangeRate,
      orderId: updateData.orderId || existingRecord.orderId,
      customerId: updateData.customerId || existingRecord.customerId
    };

    // 5. Update record
    return await prisma.currencyExchangeRate.update({
      where: { id: existingRecord.id },
      data: updateValues
    });

  } catch (error) {
    console.error("Currency exchange update failed:", error.message);
    throw error;
  }
};

exports.getCurrencyExchangeByOrder = async (invoiceId, orderId) => {
  try {
    // Verify order exists first
    await verifyOrderExists(orderId);

    return await prisma.currencyExchangeRate.findFirst({
      where: { invoiceId, orderId },
      include: {
        invoice: true
      }
    });
  } catch (error) {
    console.error("Failed to fetch currency exchange by order:", error.message);
    throw error;
  }
};