const invoiceService = require("../services/invoice.service");

exports.createInvoice = async (req, res) => {
  try {
    const invoiceData = req.body; // Extract invoice details from request body
    const invoice = await invoiceService.createInvoice(invoiceData);

    res.status(201).json({
      success: true,
      message: "Invoice created successfully",
      data: invoice,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "InvoiceId already exists",
      error: error.message,
    });
  }
};

exports.editInvoice = async (req, res) => {
  try {
    const { invoiceId } = req.params;
    const updateData = req.body;

    if (!invoiceId) {
      return res.status(400).json({ message: "Invoice ID is required." });
    }

    const updatedInvoice = await invoiceService.updateInvoice(
      invoiceId,
      updateData
    );

    if (!updatedInvoice) {
      return res
        .status(404)
        .json({ message: "Invoice not found or update failed." });
    }

    return res
      .status(200)
      .json({ message: "Invoice updated successfully", updatedInvoice });
  } catch (error) {
    console.error("Error updating invoice:", error);
    return res.status(500).json({ message: error });
  }
};

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
