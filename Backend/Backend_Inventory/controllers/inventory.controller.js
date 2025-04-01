const inventoryService = require("../services/inventory.services");
const KafkaProducer = require("../kafka/kafkaProducer"); // Import Kafka producer

exports.createInventory = async (req, res) => {
  try {
    const {
      inventoryId,
      productId,
      location,
      stockLevel,
      reorderLevel,
      safetyStock,
      lotNumber
    } = req.body;

    // Validate required fields
    if (!inventoryId || !productId || !location || !stockLevel || !reorderLevel || !safetyStock || !lotNumber) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Create inventory
    const inventory = await inventoryService.createInventory(req.body);

    // Publish inventory created event
    try {
      await KafkaProducer.connect();
      await KafkaProducer.publish('inventory-events', {
        service: 'inventory-service',
        event: 'inventory.created',
        message: `Inventory ${inventoryId} created for product ${productId}`,
        data: inventory
      });
    } catch (kafkaError) {
      console.error("Failed to publish inventory event:", kafkaError);
      // Implement retry logic or store failed events
    }

    return res.status(201).json({ 
      message: "Inventory Created Successfully", 
      inventory 
    });
  } catch (error) {
    console.error("Error in inventory controller:", error);
    return res.status(500).json({ error: error.message });
  }
};

exports.getInventory = async (req, res) => {
  try {
    const { inventoryId } = req.query;

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
    const { inventoryId } = req.params;
    const updateData = req.body;

    const updatedInventory = await inventoryService.editInventory(
      inventoryId,
      updateData
    );

    // Publish inventory updated event
    try {
      await KafkaProducer.connect();
      await KafkaProducer.publish('inventory-events', {
        service: 'inventory-service',
        event: 'inventory.updated',
        message: `Inventory ${inventoryId} updated`,
        data: updatedInventory
      });
    } catch (kafkaError) {
      console.error("Failed to publish inventory update event:", kafkaError);
    }

    res.json({
      message: "Inventory updated successfully",
      inventory: updatedInventory,
    });
  } catch (error) {
    console.error("Error updating inventory:", error);
    res.status(500).json({ error: "Failed to update inventory: " + error.message });
  }
};