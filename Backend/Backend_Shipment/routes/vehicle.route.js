const express = require("express");
const {
  createVehicle,
  editVehicle,
  getVehicle,
  getVehicleByCarrier,
} = require("../controllers/vehicle.controller");

const router = express.Router();

router.post("/create-vehicle", createVehicle);
router.patch("/edit-vehicle/:vehicleId", editVehicle);
router.get("/get-vehicle", getVehicle);
router.get("/get-vehicleByCarrier", getVehicleByCarrier);

module.exports = router;
