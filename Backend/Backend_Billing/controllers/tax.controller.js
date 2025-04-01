const taxService = require("../services/tax.service");

exports.createTax = async (req, res) => {
  try {
    const {
      taxId,
      invoiceId,
      orderId,
      customerId,
      region,
      taxType,
      taxPercentage,
    } = req.body;

    // Validate required fields
    if (!invoiceId || !orderId || !customerId || !taxPercentage) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Call the service function
    const { newTax, updatedInvoice } = await taxService.createTax({
      taxId,
      invoiceId,
      orderId,
      customerId,
      region,
      taxType,
      taxPercentage,
    });

    return res.status(201).json({
      message: "Tax created successfully and invoice updated",
      tax: newTax,
      updatedInvoice,
    });
  } catch (error) {
    console.error("Error creating tax:", error);
    return res
      .status(500)
      .json({ message: error.message || "Internal Server Error" });
  }
};

exports.editTax = async (req, res) => {
  try {
    const { taxId } = req.params;
    const updatedData = req.body;

    console.log("Updating tax ID:", taxId);
    console.log("Update Data:", updatedData);

    const updatedTax = await taxService.editTax(taxId, updatedData);

    res.json({
      message: "Tax updated successfully",
      tax: updatedTax,
    });
  } catch (error) {
    console.error("Error updating tax:", error);
    res.status(500).json({ error: "Failed to update tax: " + error.message });
  }
};
exports.getTax = async (req, res) => {
  try {
    const { taxId } = req.query;

    // Check if taxId is provided
    if (!taxId) {
      return res.status(400).json({ message: "Tax ID is required" });
    }

    const taxData = await taxService.getTaxById(taxId);

    if (!taxData) {
      return res.status(404).json({ message: "Tax record not found" });
    }

    res.status(200).json(taxData);
  } catch (error) {
    console.error("Error fetching tax data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getTaxByInvoice = async (req, res) => {
  try {
    const { taxId, invoiceId } = req.query;

    // Check if taxId is provided
    if (!taxId || !invoiceId) {
      return res
        .status(400)
        .json({ message: "TaxID  or InvoiceID is required" });
    }

    const taxData = await taxService.getTaxByInvoice(taxId, invoiceId);

    if (!taxData) {
      return res.status(404).json({ message: "Tax record not found" });
    }

    res.status(200).json(taxData);
  } catch (error) {
    console.error("Error fetching tax data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
