const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const cors = require("cors");
const inventoryRouter = require("./routes/inventory.route");
const warehouseRouter = require("./routes/warehouse.route");
const productMovementRouter = require("./routes/productMovement.route");

app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use("/api/inventory", inventoryRouter);
app.use("/api/warehouse", warehouseRouter);
app.use("/api/productMovement", productMovementRouter);

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
