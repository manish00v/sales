const express = require("express");
const {
  createPayment,
  editPayment,
  getPayment,
  getPaymentByInvoice,
} = require("../controllers/payment.controller");

const router = express.Router();

router.post("/create-payment", createPayment);
router.patch("/edit-payment/:paymentId", editPayment);
router.get("/get-payment", getPayment);
router.get("/get-paymentByInvoice", getPaymentByInvoice);

module.exports = router;
