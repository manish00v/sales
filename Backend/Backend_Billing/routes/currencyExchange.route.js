const express = require("express");
const {
  createCurrencyExchange,
  editCurrencyExchange,
  getCurrencyExchange,
  getCurrencyExchangeByOrder,
} = require("../controllers/currencyExchange.controller");

const router = express.Router();

router.post("/create-currencyExchange", createCurrencyExchange);
router.patch(
  "/edit-currencyExchange/:currencyExchangeId",
  editCurrencyExchange
);
router.get("/get-currencyExchange", getCurrencyExchange);
router.get("/get-currencyExchangeByOrder", getCurrencyExchangeByOrder);

module.exports = router;
