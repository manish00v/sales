const express = require("express");
const {
  createVehicleRoute,
  editVehicleRoute,
  getVehicleRoute,
  getVehicleRouteByCarrier,
} = require("../controllers/vehicleRoute.controller");

const router = express.Router();

router.post("/create-vehicleRoute", createVehicleRoute);
router.patch("/edit-vehicleRoute/:routeId", editVehicleRoute);
router.get("/get-vehicleRoute", getVehicleRoute);
router.get("/get-vehicleRouteByCarrier", getVehicleRouteByCarrier);

module.exports = router;
