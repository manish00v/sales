const inventoryService = require("../services/inventory.services");
exports.createInventory = async (req, res) => {
  try {
    const {
      inventoryId,
      productId,
      location,
      stockLevel,
      reorderLevel,
      safetyStock,
      lotNumber,
    } = req.body;

    // Validate required fields
    if (
      !inventoryId ||
      !productId ||
      !location ||
      !stockLevel ||
      !reorderLevel ||
      !safetyStock ||
      !lotNumber
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Call service function
    const inventory = await inventoryService.createInventory(req.body);

    // Response based on whether it's a new record or an update

    return res
      .status(201)
      .json({ message: "Inventory Created Successfully", inventory });
  } catch (error) {
    console.error("Error in inventory controller:", error);
    return res.status(500).json({ error: error });
  }
};

exports.getInventory = async (req, res) => {
  try {
    const { inventoryId } = req.query; // ✅ Use query parameters

    if (!inventoryId) {
      return res.status(400).json({ error: "inventoryId is required" });
    }

    const inventory = await inventoryService.getInventoryById(inventoryId);

    if (!inventory) {
      return res.status(404).json({ error: "Inventory not found" });
    }

    res.json(inventory);
  } catch (error) {
    console.error("Error fetching inventory:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.editInventory = async (req, res) => {
  try {
    const { inventoryId } = req.params; // Extract inventoryId from URL params
    const updateData = req.body;

    console.log("Updating Inventory ID:", inventoryId);
    console.log("Update Data:", updateData);

    const updatedInventory = await inventoryService.editInventory(
      inventoryId,
      updateData
    );

    res.json({
      message: "Inventory updated successfully",
      inventory: updatedInventory,
    });
  } catch (error) {
    console.error("Error updating inventory:", error);
    res
      .status(500)
      .json({ error: "Failed to update inventory: " + error.message });
  }
};
