const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const axios = require('axios');

// Verification helper functions
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

async function verifyCustomerExists(customerId) {
  try {
    const response = await axios.get(`http://localhost:3000/api/customers/${customerId}`, {
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    if (response.status === 200) {
      if (response.data.exists !== undefined) {
        if (response.data.exists) return true;
        throw new Error(`Customer ${customerId} not found`);
      }
      if (response.data.id || response.data.customerId) {
        return true;
      }
      throw new Error("Invalid customer data format");
    }
    throw new Error(`Customer service returned status ${response.status}`);
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error(`Customer ${customerId} not found`);
    }
    throw new Error(`Customer verification failed: ${error.message}`);
  }
}

exports.createInvoice = async (invoiceData) => {
  try {
    const { invoiceId, orderId, customerId } = invoiceData;

    // 1. Check for duplicate invoice ID
    const existingInvoice = await prisma.invoice.findUnique({
      where: { invoiceId }
    });

    if (existingInvoice) {
      throw new Error(`Invoice ID ${invoiceId} already exists`);
    }

    // 2. Validate order exists via API
    await verifyOrderExists(orderId);

    // 3. Validate customer exists via API
    await verifyCustomerExists(customerId);

    // 4. Validate order-customer relationship (optional)
    // This would require an additional API call to verify the customer placed the order
    // Implement if your business logic requires it

    // 5. Create invoice
    return await prisma.invoice.create({
      data: {
        ...invoiceData,
        invoiceDate: new Date(invoiceData.invoiceDate),
        totalTax: invoiceData.totalTax || 0
      }
    });

  } catch (error) {
    console.error("Invoice creation failed:", error.message);
    throw error;
  }
};

exports.getInvoiceById = async (invoiceId) => {
  try {
    return await prisma.invoice.findUnique({
      where: { invoiceId },
      include: {
        order: true,
        customer: true
      }
    });
  } catch (error) {
    console.error("Failed to fetch invoice:", error.message);
    throw error;
  }
};

exports.updateInvoice = async (invoiceId, updateData) => {
  try {
    // 1. Find existing invoice
    const existingInvoice = await prisma.invoice.findUnique({
      where: { invoiceId }
    });

    if (!existingInvoice) {
      throw new Error("Invoice not found");
    }

    // 2. If orderId is updated, verify it exists
    if (updateData.orderId && updateData.orderId !== existingInvoice.orderId) {
      await verifyOrderExists(updateData.orderId);
    }

    // 3. If customerId is updated, verify it exists
    if (updateData.customerId && updateData.customerId !== existingInvoice.customerId) {
      await verifyCustomerExists(updateData.customerId);
    }

    // 4. Prepare update data
    const updateValues = {
      orderId: updateData.orderId || existingInvoice.orderId,
      customerId: updateData.customerId || existingInvoice.customerId,
      totalAmount: updateData.totalAmount || existingInvoice.totalAmount,
      invoiceDate: updateData.invoiceDate ? 
        new Date(updateData.invoiceDate) : existingInvoice.invoiceDate,
      totalTax: updateData.totalTax || existingInvoice.totalTax,
      paymentStatus: updateData.paymentStatus || existingInvoice.paymentStatus
    };

    // 5. Update invoice
    return await prisma.invoice.update({
      where: { invoiceId },
      data: updateValues
    });

  } catch (error) {
    console.error("Invoice update failed:", error.message);
    throw error;
  }
};

exports.getInvoiceByOrder = async (orderId, invoiceId) => {
  try {
    // Verify order exists first
    await verifyOrderExists(orderId);

    return await prisma.invoice.findFirst({
      where: {
        orderId,
        invoiceId
      },
      include: {
        customer: true
      }
    });
  } catch (error) {
    console.error("Failed to fetch invoice by order:", error.message);
    throw error;
  }
};