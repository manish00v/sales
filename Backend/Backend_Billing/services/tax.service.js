const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const axios = require('axios');

// Verification helper functions (for external services)
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

exports.createTax = async (taxData) => {
  try {
    const { taxId, invoiceId, orderId, customerId, taxPercentage } = taxData;

    // 1. Check for duplicate tax ID
    const existingTax = await prisma.tax.findUnique({
      where: { taxId }
    });

    if (existingTax) {
      throw new Error(`Tax ID ${taxId} already exists`);
    }

    // 2. Validate tax percentage
    const taxRate = parseFloat(taxPercentage);
    if (isNaN(taxRate)) {
      throw new Error("Tax percentage must be a number");
    }

    // 3. Verify Order and Customer exist via API
    await verifyOrderExists(orderId);
    await verifyCustomerExists(customerId);

    // 4. Validate invoice using Prisma
    const invoice = await prisma.invoice.findUnique({
      where: { invoiceId },
      select: {
        orderId: true,
        customerId: true,
        totalAmount: true,
        totalTax: true
      }
    });

    if (!invoice) {
      throw new Error("Invoice not found");
    }

    // 5. Verify invoice relationships
    if (invoice.orderId !== orderId || invoice.customerId !== customerId) {
      throw new Error("Order/Customer doesn't match invoice records");
    }

    // 6. Calculate tax amount (on pre-tax amount)
    const baseAmount = invoice.totalAmount - (invoice.totalTax || 0);
    const taxAmount = (baseAmount * taxRate) / 100;

    // 7. Create tax record and update invoice in transaction
    const [newTax, updatedInvoice] = await prisma.$transaction([
      prisma.tax.create({
        data: {
          ...taxData,
          taxPercentage: taxRate
        }
      }),
      prisma.invoice.update({
        where: { invoiceId },
        data: {
          totalTax: (invoice.totalTax || 0) + taxAmount,
          totalAmount: invoice.totalAmount + taxAmount
        }
      })
    ]);

    return { 
      taxRecord: newTax,
      updatedInvoice: {
        invoiceId: updatedInvoice.invoiceId,
        newTotalAmount: updatedInvoice.totalAmount,
        newTotalTax: updatedInvoice.totalTax
      }
    };

  } catch (error) {
    console.error("Tax creation failed:", error.message);
    throw error;
  }
};

// ... [rest of the methods remain the same with Prisma for invoice validation]