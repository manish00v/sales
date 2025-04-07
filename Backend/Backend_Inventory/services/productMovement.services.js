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

exports.createProductMovement = async (movementData) => {
  try {
    const { movementId, productId } = movementData;

    // 1. Check for duplicate movement ID
    const existingMovement = await prisma.productMovement.findUnique({
      where: { movementId }
    });

    if (existingMovement) {
      return {
        status: 400,
        data: { error: "Product Movement ID already exists" }
      };
    }

    // 2. Verify product exists via API
    await verifyProductExists(productId);

    // 3. Validate warehouse-inventory-product relationship
    const warehouse = await prisma.warehouse.findFirst({
      where: {
        warehouseId: movementData.warehouseId,
        inventoryId: movementData.inventoryId,
        productId
      }
    });

    if (!warehouse) {
      return {
        status: 404,
        data: { error: "Warehouse doesn't contain specified product/inventory" }
      };
    }

    // 4. Validate inventory stock
    const inventory = await prisma.inventory.findUnique({
      where: { inventoryId: movementData.inventoryId }
    });

    if (!inventory) {
      return { status: 404, data: { error: "Inventory not found" } };
    }

    if (inventory.productId !== productId) {
      return {
        status: 400,
        data: { error: "Product ID doesn't match inventory" }
      };
    }

    if (movementData.quantity > inventory.stockLevel) {
      return { status: 400, data: { error: "Insufficient stock" } };
    }

    // 5. Create movement and update inventory
    const [newMovement, updatedInventory] = await prisma.$transaction([
      prisma.productMovement.create({
        data: {
          ...movementData,
          movementDate: new Date(movementData.movementDate)
        }
      }),
      prisma.inventory.update({
        where: { inventoryId: movementData.inventoryId },
        data: { stockLevel: inventory.stockLevel - movementData.quantity }
      })
    ]);

    // 6. Check stock alerts
    let alert = null;
    if (updatedInventory.stockLevel < updatedInventory.safetyStock) {
      alert = `⚠️ Stock (${updatedInventory.stockLevel}) below safety level (${updatedInventory.safetyStock})`;
    }
    if (updatedInventory.stockLevel < updatedInventory.reorderLevel) {
      alert = `⚠️ Stock (${updatedInventory.stockLevel}) below reorder level (${updatedInventory.reorderLevel})`;
    }

    return {
      status: 201,
      data: {
        message: "Movement recorded successfully",
        movement: newMovement,
        alert
      }
    };

  } catch (error) {
    console.error("Movement creation failed:", error.message);
    return { status: 500, data: { error: "Internal server error" } };
  }
};

exports.getProductMovementById = async (movementId) => {
  try {
    return await prisma.productMovement.findUnique({
      where: { movementId },
      include: {
        product: true,
        inventory: true,
        warehouse: true
      }
    });
  } catch (error) {
    console.error("Failed to fetch movement:", error.message);
    throw error;
  }
};

exports.getProductMovementWithProduct = async (movementId, productId) => {
  try {
    // Verify product exists first
    await verifyProductExists(productId);
    
    return await prisma.productMovement.findUnique({
      where: { movementId, productId }
    });
  } catch (error) {
    console.error("Failed to fetch movement:", error.message);
    throw error;
  }
};

exports.editProductMovement = async (movementId, updateData) => {
  try {
    // 1. Check existing movement
    const existingMovement = await prisma.productMovement.findUnique({
      where: { movementId }
    });

    if (!existingMovement) {
      return { status: 404, data: { error: "Movement not found" } };
    }

    // 2. If productId is updated, verify it exists
    if (updateData.productId && updateData.productId !== existingMovement.productId) {
      await verifyProductExists(updateData.productId);
    }

    // 3. Rest of your existing edit logic remains the same
    // ... [keep all your existing editProductMovement code]

  } catch (error) {
    console.error("Movement update failed:", error.message);
    return { status: 500, data: { error: "Internal server error" } };
  }
};