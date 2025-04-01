const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const cors = require("cors");
const shipmentRouter = require("./routes/shipment.route");
const carrierRouter = require("./routes/carrier.route");
const vehicleRouter = require("./routes/vehicle.route");
const vehicleRouteRouter = require("./routes/vehicleRoute.route");

app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use("/api/shipment", shipmentRouter);
app.use("/api/carrier", carrierRouter);
app.use("/api/vehicle", vehicleRouter);
app.use("/api/vehicleRoute", vehicleRouteRouter);
const PORT = process.env.PORT || 3011;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
