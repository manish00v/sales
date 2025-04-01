const express = require("express");
const {
  createCarrier,
  editCarrier,
  getCarrier,
  getCarrierByOrder,
} = require("../controllers/carrier.controller");

const router = express.Router();

router.post("/create-carrier", createCarrier);
router.patch("/edit-carrier/:carrierId", editCarrier);
router.get("/get-carrier", getCarrier);
router.get("/get-carrierByOrder", getCarrierByOrder);

module.exports = router;
