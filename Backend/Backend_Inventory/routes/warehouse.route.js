const express = require("express");
const router = express.Router();
const warehouseController = require("../controllers/warehouse.controller");

router.post("/create-warehouse", warehouseController.createWarehouse);
router.patch("/edit-warehouse/:warehouseId", warehouseController.editWarehouse);
router.get("/get-warehouse", warehouseController.getWarehouse);
router.get(
  "/get-warehouseWithInventory",
  warehouseController.getWarehouseWithInventory
);

module.exports = router;
