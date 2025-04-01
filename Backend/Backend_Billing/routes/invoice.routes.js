const express = require("express");
const {
  createInvoice,
  editInvoice,
  getInvoice,
  getInvoiceByOrder,
} = require("../controllers/invoice.controller");

const router = express.Router();

router.post("/create-invoice", createInvoice);
router.patch("/edit-invoice/:invoiceId", editInvoice);
router.get("/get-invoice", getInvoice);
router.get("/get-invoiceByOrder", getInvoiceByOrder);

module.exports = router;
