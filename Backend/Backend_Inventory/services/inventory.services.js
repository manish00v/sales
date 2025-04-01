const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const axios = require('axios');

// Product verification helper function
async function verifyProductExists(productId) {
  try {
    const response = await axios.get(`http://localhost:3001/api/products/${productId}`, {
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    if (response.status === 200) {
      if (response.data.exists !== undefined) {
        if (response.data.exists) return true;
        throw new Error(`Product ${productId} not found`);
      }
      if (response.data.id || response.data.productId) {
        return true;
      }
      throw new Error("Invalid product data format");
    }
    throw new Error(`Product service returned status ${response.status}`);
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error(`Product ${productId} not found`);
    }
    throw new Error(`Product verification failed: ${error.message}`);
  }
}

exports.createInventory = async (inventoryData) => {
  try {
    const { inventoryId, productId } = inventoryData;

    // 1. Check for duplicate inventory ID
    const existingInventory = await prisma.inventory.findUnique({
      where: { inventoryId }
    });

    if (existingInventory) {
      throw new Error(`Inventory ID ${inventoryId} already exists`);
    }

    // 2. Verify product exists
    await verifyProductExists(productId);

    // 3. Create inventory record
    const newInventory = await prisma.inventory.create({
      data: {
        ...inventoryData,
        stockLevel: Number(inventoryData.stockLevel),
        reorderLevel: Number(inventoryData.reorderLevel),
        safetyStock: Number(inventoryData.safetyStock)
      }
    });

    return newInventory;
  } catch (error) {
    console.error("Inventory creation failed:", error.message);
    throw error;
  }
};

exports.editInventory = async (inventoryId, updateData) => {
  try {
    // 1. Check inventory exists
    const existingInventory = await prisma.inventory.findUnique({
      where: { inventoryId }
    });

    if (!existingInventory) {
      throw new Error("Inventory not found");
    }

    // 2. Verify product if being updated
    if (updateData.productId && updateData.productId !== existingInventory.productId) {
      await verifyProductExists(updateData.productId);
    }

    // 3. Update inventory
    return await prisma.inventory.update({
      where: { inventoryId },
      data: {
        ...updateData,
        stockLevel: updateData.stockLevel ? Number(updateData.stockLevel) : existingInventory.stockLevel,
        reorderLevel: updateData.reorderLevel ? Number(updateData.reorderLevel) : existingInventory.reorderLevel,
        safetyStock: updateData.safetyStock ? Number(updateData.safetyStock) : existingInventory.safetyStock
      }
    });
  } catch (error) {
    console.error("Inventory update failed:", error.message);
    throw error;
  }
};

exports.getInventoryById = async (inventoryId) => {
  try {
    return await prisma.inventory.findUnique({
      where: { inventoryId },
      include: { product: true }
    });
  } catch (error) {
    console.error("Failed to fetch inventory:", error.message);
    throw error;
  }
};