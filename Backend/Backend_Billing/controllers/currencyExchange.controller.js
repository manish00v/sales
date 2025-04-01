const currencyExchangeService = require("../services/currencyExchange.service");

exports.createCurrencyExchange = async (req, res) => {
  try {
    const {
      invoiceId,
      orderId,
      customerId,
      currencyCode,
      effectiveDate,
      exchangeRate,
    } = req.body;

    // Validate required fields
    if (
      !invoiceId ||
      !orderId ||
      !customerId ||
      !currencyCode ||
      !effectiveDate ||
      exchangeRate === undefined
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Call the service to create the currency exchange entry
    const newCurrencyExchange =
      await currencyExchangeService.createCurrencyExchange({
        invoiceId,
        orderId,
        customerId,
        currencyCode,
        effectiveDate,
        exchangeRate,
      });

    return res.status(201).json({
      message: "Currency exchange record created successfully.",
      data: newCurrencyExchange,
    });
  } catch (error) {
    console.error("Error creating currency exchange:", error);
    return res
      .status(500)
      .json({ message: error.message || "Internal Server Error" });
  }
};

exports.editCurrencyExchange = async (req, res) => {
  try {
    const {
      invoiceId,
      orderId,
      customerId,
      currencyCode,
      exchangeRate,
      effectiveDate,
    } = req.body;

    console.log(invoiceId);
    // Convert exchangeRate to a float
    const parsedExchangeRate = parseFloat(exchangeRate);

    // Validate exchangeRate is a valid positive float
    if (isNaN(parsedExchangeRate) || parsedExchangeRate <= 0) {
      return res
        .status(400)
        .json({ message: "Exchange rate must be a valid positive number." });
    }

    // Call service to validate invoiceId and update record
    const updatedExchangeRate =
      await currencyExchangeService.editCurrencyExchange(invoiceId, {
        orderId,
        customerId,
        currencyCode,
        exchangeRate: parsedExchangeRate, // Now correctly a float
        effectiveDate,
      });

    if (!updatedExchangeRate) {
      return res.status(404).json({
        message:
          "Currency exchange rate update failed. Check invoiceId, orderId, or customerId.",
      });
    }

    res.status(200).json({
      message: "Currency exchange rate updated successfully.",
      data: updatedExchangeRate,
    });
  } catch (error) {
    console.error("Error updating currency exchange:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

exports.getCurrencyExchange = async (req, res) => {
  try {
    const { invoiceId } = req.query;

    if (!invoiceId) {
      return res.status(400).json({ message: "Invoice ID is required" });
    }

    const currencyExchange =
      await currencyExchangeService.getCurrencyExchangeByInvoiceId(invoiceId);

    if (!currencyExchange || currencyExchange.length === 0) {
      return res.status(404).json({
        message: "No currency exchange data found for the given Invoice ID",
      });
    }

    return res.status(200).json(currencyExchange);
  } catch (error) {
    console.error("Error fetching currency exchange:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getCurrencyExchangeByOrder = async (req, res) => {
  try {
    const { orderId, invoiceId } = req.query;

    if (!orderId || !invoiceId) {
      return res
        .status(400)
        .json({ message: "orderId or invoiceId is required" });
    }

    const currencyData =
      await currencyExchangeService.getCurrencyExchangeByOrder(
        invoiceId,
        orderId
      );

    console.log("✅ Retrieved from DB:", currencyData);

    if (!currencyData) {
      return res.status(404).json({ message: "Currency record not found" });
    }

    res.status(200).json(currencyData);
  } catch (error) {
    console.error("❌ Error fetching currency data:", error);
    res.status(500).json({ message: error });
  }
};
