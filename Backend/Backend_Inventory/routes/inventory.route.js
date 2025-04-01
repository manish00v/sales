const express = require("express");
const {
  createInventory,
  editInventory,
  getInventory,
} = require("../controllers/inventory.controller");

const router = express.Router();

router.post("/create-inventory", createInventory);
router.patch("/edit-inventory/:inventoryId", editInventory);
router.get("/get-inventory", getInventory);

module.exports = router;
