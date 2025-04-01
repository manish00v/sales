// billing-service/controllers/Payment.controller.js
const paymentService = require("../services/payment.service");
const KafkaProducer = require("../kafka/kafkaProducer");

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

    // Validation and payment creation logic...

    const payment = await paymentService.createPayment({
      paymentId,
      invoiceId,
      orderId,
      customerId,
      amountPaid,
      paymentDate,
      paymentMode,
    });

    // Publish payment event
    try {
      await KafkaProducer.connect();
      await KafkaProducer.publish('payment-events', {
        service: 'billing-service',
        event: 'payment.created',
        message: `Payment ${paymentId} created`,
        data: payment
      });
    } catch (kafkaError) {
      console.error("Failed to publish payment event:", kafkaError);
    }

    return res.status(201).json({ message: "Payment created successfully", payment });
  } catch (error) {
    console.error("Error creating payment:", error);
    return res.status(500).json({ message: error.message });
  }
};

exports.editPayment = async (req, res) => {
  try {
    const { paymentId } = req.params;
    const updatedData = req.body;

    const updatedPayment = await paymentService.editPayment(paymentId, updatedData);

    // Publish update event
    try {
      await KafkaProducer.connect();
      await KafkaProducer.publish('payment-events', {
        service: 'billing-service',
        event: 'payment.updated',
        message: `Payment ${paymentId} updated`,
        data: updatedPayment
      });
    } catch (kafkaError) {
      console.error("Failed to publish payment update event:", kafkaError);
    }

    res.status(200).json({
      message: "Payment updated successfully",
      payment: updatedPayment,
    });
  } catch (error) {
    console.error("Error updating payment:", error);
    res.status(500).json({ error: "Failed to update payment: " + error.message });
  }
};

// ... keep other methods with the same CommonJS exports syntax

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
