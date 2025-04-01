const paymentService = require("../services/payment.service");

exports.createPayment = async (req, res) => {
  try {
    const {
      paymentId,
      invoiceId,
      orderId,
      customerId,
      amountPaid,
      paymentDate,
      paymentMode,
    } = req.body;

    // Validate required fields
    if (
      !paymentId ||
      !invoiceId ||
      !orderId ||
      !customerId ||
      !amountPaid ||
      !paymentDate ||
      !paymentMode
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Ensure amountPaid is a valid float
    if (isNaN(parseFloat(amountPaid))) {
      return res
        .status(400)
        .json({ message: "amountPaid must be a valid number." });
    }

    // Ensure payment mode is valid
    if (!["ONLINE", "CASH"].includes(paymentMode)) {
      return res
        .status(400)
        .json({ message: "Invalid payment mode. Must be 'ONLINE' or 'CASH'." });
    }

    // Call service to create payment
    const payment = await paymentService.createPayment({
      paymentId,
      invoiceId,
      orderId,
      customerId,
      amountPaid,
      paymentDate,
      paymentMode,
    });

    return res
      .status(201)
      .json({ message: "Payment created successfully", payment });
  } catch (error) {
    console.error("Error creating payment:", error);
    return res.status(500).json({ message: error.message });
  }
};

exports.editPayment = async (req, res) => {
  try {
    const { paymentId } = req.params;
    const updatedData = req.body;

    console.log("Editing Payment ID:", paymentId);
    console.log("Updated Data:", updatedData);

    const updatedPayment = await paymentService.editPayment(
      paymentId,
      updatedData
    );

    res.status(200).json({
      message: "Payment updated successfully",
      payment: updatedPayment,
    });
  } catch (error) {
    console.error("Error updating payment:", error);
    res
      .status(500)
      .json({ error: "Failed to update payment: " + error.message });
  }
};

exports.getPayment = async (req, res) => {
  try {
    const { paymentId } = req.query;

    // Check if paymentId is provided
    if (!paymentId) {
      return res.status(400).json({ message: "paymentId is required" });
    }

    const paymentData = await paymentService.getPaymentById(paymentId);

    if (!paymentData) {
      return res.status(404).json({ message: "Payment record not found" });
    }

    res.status(200).json(paymentData);
  } catch (error) {
    console.error("Error fetching Payment data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getPaymentByInvoice = async (req, res) => {
  try {
    const { paymentId, invoiceId } = req.query;

    // Check if taxId is provided
    if (!paymentId || !invoiceId) {
      return res
        .status(400)
        .json({ message: "paymentId  or InvoiceID is required" });
    }

    const paymentData = await paymentService.getPaymentByInvoice(
      paymentId,
      invoiceId
    );

    if (!paymentData) {
      return res.status(404).json({ message: "Payment record not found" });
    }

    res.status(200).json(paymentData);
  } catch (error) {
    console.error("Error fetching Payment data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
