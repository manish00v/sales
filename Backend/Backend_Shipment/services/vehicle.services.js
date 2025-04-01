const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const axios = require('axios');

// Order verification helper function
async function verifyOrderExists(orderId) {
  try {
    const response = await axios.get(`http://localhost:3000/api/sales-orders/${orderId}`, {
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    console.log('DEBUG - Order service response:', response.data);

    if (response.status === 200) {
      if (response.data.exists !== undefined) {
        if (response.data.exists) return true;
        throw new Error(`Order ${orderId} not found (exists: false)`);
      }
      if (response.data.id || response.data.orderId) {
        return true;
      }
      throw new Error("Order verification failed: Unexpected response format");
    }

    throw new Error(`Order service returned status ${response.status}`);

  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        throw new Error(`Order ${orderId} not found`);
      }
      throw new Error(`Order service error: ${error.response.status} ${error.response.statusText}`);
    }
    throw new Error(`Order verification failed: ${error.message}`);
  }
}

exports.createVehicle = async (vehicleData) => {
  try {
    const { vehicleId, carrierId, shipmentId, orderId } = vehicleData;

    // 1. Check if vehicle ID already exists
    const existingVehicle = await prisma.deliveryVehicle.findUnique({
      where: { vehicleId }
    });

    if (existingVehicle) {
      throw new Error(`Vehicle ID ${vehicleId} already exists. Please use a unique vehicle ID.`);
    }

    // 2. Verify order exists
    await verifyOrderExists(orderId);

    // 3. Validate carrier existence & association
    const carrier = await prisma.carrier.findFirst({
      where: { carrierId, shipmentId, orderId },
    });

    if (!carrier) {
      throw new Error(
        "Invalid carrierId: The given carrier is not associated with the provided shipmentId and orderId."
      );
    }

    // 4. Create the vehicle after validation
    return await prisma.deliveryVehicle.create({
      data: vehicleData,
    });
  } catch (error) {
    console.error("Vehicle creation failed:", error.message);
    throw error;
  }
};

exports.getVehicle = async (vehicleId) => {
  try {
    if (!vehicleId) {
      throw new Error("Vehicle ID is required.");
    }

    const vehicle = await prisma.deliveryVehicle.findUnique({
      where: { vehicleId },
    });

    if (!vehicle) {
      throw new Error("Vehicle not found.");
    }

    return vehicle;
  } catch (error) {
    console.error("Failed to get vehicle:", error.message);
    throw error;
  }
};

exports.editVehicle = async (vehicleId, updateData) => {
  try {
    const { carrierId, shipmentId, orderId } = updateData;

    // 1. Check if vehicle exists
    const existingVehicle = await prisma.deliveryVehicle.findUnique({
      where: { vehicleId },
    });

    if (!existingVehicle) {
      throw new Error("Vehicle not found");
    }

    // 2. If orderId is being updated, verify it exists
    if (orderId && orderId !== existingVehicle.orderId) {
      await verifyOrderExists(orderId);
    }

    // 3. Check if carrier exists
    const carrier = await prisma.carrier.findFirst({
      where: { 
        carrierId: carrierId || existingVehicle.carrierId,
        shipmentId: shipmentId || existingVehicle.shipmentId,
        orderId: orderId || existingVehicle.orderId
      },
    });

    if (!carrier) {
      throw new Error(
        "Invalid carrierId: Carrier does not exist associated with these shipmentId and orderId."
      );
    }

    // 4. Update vehicle data
    return await prisma.deliveryVehicle.update({
      where: { vehicleId },
      data: updateData,
    });
  } catch (error) {
    console.error("Vehicle update failed:", error.message);
    throw error;
  }
};

exports.getVehicleByCarrier = async (vehicleId, carrierId) => {
  try {
    return await prisma.deliveryVehicle.findFirst({
      where: {
        carrierId: String(carrierId),
        vehicleId: String(vehicleId),
      },
    });
  } catch (error) {
    console.error("Failed to fetch vehicle by carrier:", error.message);
    throw new Error("Failed to fetch vehicle from database");
  }
};