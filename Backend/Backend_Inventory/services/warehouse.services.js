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

exports.createWarehouse = async (warehouseData) => {
  try {
    const { warehouseId, inventoryId, productId } = warehouseData;

    // 1. Check for duplicate warehouse ID
    const existingWarehouse = await prisma.warehouse.findUnique({
      where: { warehouseId }
    });

    if (existingWarehouse) {
      throw { statusCode: 400, message: "Warehouse ID already exists" };
    }

    // 2. Verify product exists via API
    await verifyProductExists(productId);

    // 3. Validate inventory-product relationship
    const inventory = await prisma.inventory.findUnique({
      where: { inventoryId },
      select: { productId: true }
    });

    if (!inventory) {
      throw { statusCode: 404, message: "Inventory not found" };
    }

    if (inventory.productId !== productId) {
      throw {
        statusCode: 400,
        message: "Product ID does not match the inventory's product"
      };
    }

    // 4. Create warehouse
    return await prisma.warehouse.create({
      data: {
        ...warehouseData,
        warehouseCapacity: Number(warehouseData.warehouseCapacity)
      }
    });

  } catch (error) {
    console.error("Warehouse creation failed:", error.message);
    
    // Preserve existing error handling structure
    if (error.statusCode) throw error;
    throw { statusCode: 500, message: "Internal Server Error" };
  }
};

exports.getWarehouseById = async (warehouseId) => {
  try {
    return await prisma.warehouse.findUnique({
      where: { warehouseId },
      include: {
        inventory: true,
        product: true
      }
    });
  } catch (error) {
    console.error("Failed to fetch warehouse:", error.message);
    throw { statusCode: 500, message: "Failed to fetch warehouse" };
  }
};

exports.editWarehouse = async (warehouseId, updateData) => {
  try {
    // 1. Check warehouse exists
    const existingWarehouse = await prisma.warehouse.findUnique({
      where: { warehouseId }
    });

    if (!existingWarehouse) {
      throw new Error("Warehouse not found");
    }

    // 2. If productId is updated, verify it exists
    if (updateData.productId && updateData.productId !== existingWarehouse.productId) {
      await verifyProductExists(updateData.productId);
    }

    // 3. Validate inventory-product relationship if either is updated
    if (updateData.inventoryId || updateData.productId) {
      const inventory = await prisma.inventory.findUnique({
        where: { 
          inventoryId: updateData.inventoryId || existingWarehouse.inventoryId 
        }
      });

      if (!inventory) {
        throw new Error("Inventory not found");
      }

      const effectiveProductId = updateData.productId || existingWarehouse.productId;
      if (inventory.productId !== effectiveProductId) {
        throw new Error("Product ID doesn't match inventory's product");
      }
    }

    // 4. Update warehouse
    return await prisma.warehouse.update({
      where: { warehouseId },
      data: {
        ...updateData,
        warehouseCapacity: updateData.warehouseCapacity ? 
          Number(updateData.warehouseCapacity) : 
          existingWarehouse.warehouseCapacity
      }
    });

  } catch (error) {
    console.error("Warehouse update failed:", error.message);
    throw error;
  }
};

exports.getWarehouseByInventory = async (warehouseId, inventoryId) => {
  try {
    return await prisma.warehouse.findUnique({
      where: {
        warehouseId,
        inventoryId
      }
    });
  } catch (error) {
    console.error("Failed to fetch warehouse by inventory:", error.message);
    throw { statusCode: 500, message: "Failed to fetch warehouse" };
  }
};