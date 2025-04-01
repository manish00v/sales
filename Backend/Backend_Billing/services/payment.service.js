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

exports.createPayment = async (paymentData) => {
  try {
    const { paymentId, invoiceId, orderId, customerId } = paymentData;

    // 1. Check for duplicate payment ID
    const existingPayment = await prisma.payment.findUnique({
      where: { paymentId }
    });

    if (existingPayment) {
      throw new Error(`Payment ID ${paymentId} already exists`);
    }

    // 2. Verify references exist - order and customer via API, invoice via Prisma
    await verifyOrderExists(orderId);
    await verifyCustomerExists(customerId);
    
    // Prisma validation for invoice
    const invoice = await prisma.invoice.findUnique({
      where: { invoiceId },
      select: { orderId: true, customerId: true }
    });

    if (!invoice) {
      throw new Error(`Invoice ${invoiceId} not found in database`);
    }

    // 3. Validate invoice relationships
    if (invoice.orderId !== orderId || invoice.customerId !== customerId) {
      throw new Error("Order/Customer doesn't match invoice records");
    }

    // 4. Create payment
    return await prisma.payment.create({
      data: {
        ...paymentData,
        amountPaid: parseFloat(paymentData.amountPaid),
        paymentDate: new Date(paymentData.paymentDate)
      }
    });

  } catch (error) {
    console.error("Payment creation failed:", error.message);
    throw error;
  }
};

exports.getPaymentById = async (paymentId) => {
  try {
    return await prisma.payment.findUnique({
      where: { paymentId },
      // include: {
      //   invoice: true,
      //   // order: true,
      //   customer: true
      // }
    });
  } catch (error) {
    console.error("Failed to fetch payment:", error.message);
    throw error;
  }
};

exports.editPayment = async (paymentId, updateData) => {
  try {
    // 1. Find existing payment
    const existingPayment = await prisma.payment.findUnique({
      where: { paymentId }
    });

    if (!existingPayment) {
      throw new Error("Payment not found");
    }

    // 2. Verify updated references if provided
    if (updateData.orderId) await verifyOrderExists(updateData.orderId);
    if (updateData.customerId) await verifyCustomerExists(updateData.customerId);
    
    // 3. Validate invoice relationships if updated
    if (updateData.invoiceId || updateData.orderId || updateData.customerId) {
      const effectiveInvoiceId = updateData.invoiceId || existingPayment.invoiceId;
      const invoice = await prisma.invoice.findUnique({
        where: { invoiceId: effectiveInvoiceId }
      });

      if (!invoice) {
        throw new Error(`Invoice ${effectiveInvoiceId} not found`);
      }

      const effectiveOrderId = updateData.orderId || existingPayment.orderId;
      const effectiveCustomerId = updateData.customerId || existingPayment.customerId;

      if (invoice.orderId !== effectiveOrderId || invoice.customerId !== effectiveCustomerId) {
        throw new Error("Updated values don't match invoice records");
      }
    }

    // 4. Prepare update data
    const updateValues = {
      invoiceId: updateData.invoiceId || existingPayment.invoiceId,
      orderId: updateData.orderId || existingPayment.orderId,
      customerId: updateData.customerId || existingPayment.customerId,
      amountPaid: updateData.amountPaid ? 
        parseFloat(updateData.amountPaid) : existingPayment.amountPaid,
      paymentDate: updateData.paymentDate ? 
        new Date(updateData.paymentDate) : existingPayment.paymentDate,
      paymentMode: updateData.paymentMode || existingPayment.paymentMode
    };

    // 5. Update payment
    return await prisma.payment.update({
      where: { paymentId },
      data: updateValues
    });

  } catch (error) {
    console.error("Payment update failed:", error.message);
    throw error;
  }
};

exports.getPaymentByInvoice = async (paymentId, invoiceId) => {
  try {
    // Verify invoice exists via Prisma
    const invoiceExists = await prisma.invoice.findUnique({
      where: { invoiceId }
    });
    
    if (!invoiceExists) {
      throw new Error(`Invoice ${invoiceId} not found`);
    }

    return await prisma.payment.findUnique({
      where: { paymentId, invoiceId },
      include: {
        order: true,
        customer: true
      }
    });
  } catch (error) {
    console.error("Failed to fetch payment by invoice:", error.message);
    throw error;
  }
};