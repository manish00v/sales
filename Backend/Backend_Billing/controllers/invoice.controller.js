const invoiceService = require("../services/invoice.service");
const KafkaProducer = require("../kafka/kafkaProducer");

exports.createInvoice = async (req, res) => {
  try {
    const invoiceData = req.body;
    const invoice = await invoiceService.createInvoice(invoiceData);

    // Publish Kafka event
    await KafkaProducer.publish('invoice-events', {
      service: 'billing-service',
      event: 'invoice.created',
      message: `Invoice ${invoice.invoiceId} created for order ${invoice.orderId}`,
      data: invoice
    });

    res.status(201).json({
      success: true,
      message: "Invoice created successfully",
      data: invoice,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating invoice",
      error: error.message,
    });
  }
};

exports.editInvoice = async (req, res) => {
  try {
    const { invoiceId } = req.params;
    const updateData = req.body;

    const updatedInvoice = await invoiceService.updateInvoice(invoiceId, updateData);

    // Publish Kafka event
    await KafkaProducer.publish('invoice-events', {
      service: 'billing-service',
      event: 'invoice.updated',
      message: `Invoice ${invoiceId} updated`,
      data: updatedInvoice
    });

    res.status(200).json({ 
      message: "Invoice updated successfully", 
      updatedInvoice 
    });
  } catch (error) {
    console.error("Error updating invoice:", error);
    res.status(500).json({ message: error.message });
  }
};

// getInvoice and getInvoiceByOrder remain the same (but ensure they don't try to include Order)

exports.getInvoice = async (req, res) => {
  try {
    const { invoiceId } = req.query;

    // Check if invoiceId is provided
    if (!invoiceId) {
      return res.status(400).json({ message: "invoiceId is required" });
    }

    const invoiceData = await invoiceService.getInvoiceById(invoiceId);

    if (!invoiceData) {
      return res.status(404).json({ message: "Invoice record not found" });
    }

    res.status(200).json(invoiceData);
  } catch (error) {
    console.error("Error fetching Invoice data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getInvoiceByOrder = async (req, res) => {
  try {
    const { orderId, invoiceId } = req.query;

    // Check if taxId is provided
    if (!orderId || !invoiceId) {
      return res
        .status(400)
        .json({ message: "orderId  or InvoiceID is required" });
    }

    const invoiceData = await invoiceService.getInvoiceByOrder(
      orderId,
      invoiceId
    );

    if (!invoiceData) {
      return res.status(404).json({ message: "invoice record not found" });
    }

    res.status(200).json(invoiceData);
  } catch (error) {
    console.error("Error fetching invoice data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
