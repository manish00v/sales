const express = require("express");
const {
  createTax,
  editTax,
  getTax,
  getTaxByInvoice,
} = require("../controllers/tax.controller");

const router = express.Router();

router.post("/create-tax", createTax);
router.patch("/edit-tax/:taxId", editTax);
router.get("/get-tax", getTax);
router.get("/get-taxByInvoice", getTaxByInvoice);

module.exports = router;
