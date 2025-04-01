const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const cors = require("cors");
const invoiceRouter = require("./routes/invoice.routes");
const paymentRouter = require("./routes/payment.routes");
const taxRouter = require("./routes/tax.routes");
const currencyRouter = require("./routes/currencyExchange.route");

app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use("/api/invoice", invoiceRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/tax", taxRouter);
app.use("/api/currency", currencyRouter);

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
