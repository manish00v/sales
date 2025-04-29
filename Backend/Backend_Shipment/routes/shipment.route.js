const express = require("express");
const {
  createShipment,
  editShipment,
  getShipment,
  getShipmentByOrder,
} = require("../controllers/shipment.controller");

const router = express.Router();

router.post("/create-shipment", createShipment);
router.patch("/edit-shipment/:shipmentId", editShipment);
router.get("/get-shipment", getShipment);
router.get("/get-shipmentByOrder", getShipmentByOrder);

module.exports = router;
