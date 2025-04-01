const express = require("express");
const router = express.Router();
const productMovementController = require("../controllers/productMovement.controller");

router.post(
  "/create-productMovement",
  productMovementController.createProductMovement
);

router.get(
  "/get-productMovement",
  productMovementController.getProductMovement
);

router.get(
  "/get-productMovementWithProduct",
  productMovementController.getProductMovementWithProduct
);

router.patch(
  "/edit-productMovement/:movementId",
  productMovementController.editProductMovement
);

module.exports = router;
