const warehouseService = require("../services/warehouse.services");

exports.createWarehouse = async (req, res) => {
  try {
    const {
      warehouseId,
      inventoryId,
      productId,
      warehouseName,
      warehouseAddress,
      warehouseCapacity,
      warehouseType,
    } = req.body;

    if (
      !warehouseId ||
      !inventoryId ||
      !productId ||
      !warehouseName ||
      !warehouseAddress ||
      !warehouseCapacity ||
      !warehouseType
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const warehouse = await warehouseService.createWarehouse({
      warehouseId,
      inventoryId,
      productId,
      warehouseName,
      warehouseAddress,
      warehouseCapacity,
      warehouseType,
    });

    return res
      .status(201)
      .json({ message: "Warehouse Created Successfully", warehouse });
  } catch (error) {
    console.error("Error in warehouse controller:", error);
    return res
      .status(500)
      .json({ error: error.message || "Internal Server Error" });
  }
};

exports.editWarehouse = async (req, res) => {
  try {
    const { warehouseId } = req.params; // Extract inventoryId from URL params
    const updateData = req.body;

    console.log("Updating Inventory ID:", warehouseId);
    console.log("Update Data:", updateData);

    const updatedWarehouse = await warehouseService.editWarehouse(
      warehouseId,
      updateData
    );

    res.json({
      message: "warehouse updated successfully",
      warehouse: updatedWarehouse,
    });
  } catch (error) {
    console.error("Error updating warehouse:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.getWarehouse = async (req, res) => {
  try {
    const { warehouseId } = req.query; // ✅ Use query parameters

    if (!warehouseId) {
      return res.status(400).json({ error: "warehouseId is required" });
    }

    const warehouse = await warehouseService.getWarehouseById(warehouseId);

    if (!warehouse) {
      return res.status(404).json({ error: "warehouse not found" });
    }

    res.json(warehouse);
  } catch (error) {
    console.error("Error fetching warehouse:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getWarehouseWithInventory = async (req, res) => {
  try {
    const { warehouseId, inventoryId } = req.query; // ✅ Use query parameters

    if (!warehouseId || !inventoryId) {
      return res
        .status(400)
        .json({ error: "warehouseId and inventoryId are required" });
    }

    const warehouse = await warehouseService.getWarehouseByInventory(
      warehouseId,
      inventoryId
    );

    if (!warehouse) {
      return res
        .status(404)
        .json({ error: "Warehouse with given inventoryId not found" });
    }

    res.status(200).json(warehouse);
  } catch (error) {
    console.error("Error fetching warehouse:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
