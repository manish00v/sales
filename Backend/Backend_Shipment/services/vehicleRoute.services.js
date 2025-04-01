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

exports.createVehicleRoute = async (routeData) => {
  try {
    const {
      routeId,
      carrierId,
      shipmentId,
      orderId,
      sourceLocation,
      destinationLocation,
      routeTime,
      distance,
    } = routeData;

    // 1. Verify order exists first
    await verifyOrderExists(orderId);

    // 2. Check if routeId already exists
    const existingRoute = await prisma.deliveryRoute.findUnique({
      where: { routeId },
    });

    if (existingRoute) {
      throw new Error("routeId already exists. Please provide a unique routeId.");
    }

    // 3. Validate carrier exists
    const carrierIdValidation = await prisma.carrier.findUnique({
      where: { carrierId },
    });

    if (!carrierIdValidation) {
      throw new Error("Invalid carrierId: CarrierId not found");
    }

    // 4. Validate carrier is associated with shipment and order
    const carrier = await prisma.carrier.findFirst({
      where: { carrierId, shipmentId, orderId },
    });

    if (!carrier) {
      throw new Error(
        "Invalid carrierId: Either carrierId is not associated with shipmentId or orderId"
      );
    }

    // 5. Create DeliveryRoute
    return await prisma.deliveryRoute.create({
      data: {
        routeId,
        orderId,
        shipmentId,
        sourceLocation,
        destinationLocation,
        routeTime,
        distance,
        carrierId,
      },
    });
  } catch (error) {
    console.error("Vehicle route creation failed:", error.message);
    throw error;
  }
};

exports.getVehicleRouteById = async (routeId) => {
  try {
    return await prisma.deliveryRoute.findUnique({
      where: { routeId },
    });
  } catch (error) {
    console.error("Failed to get vehicle route:", error.message);
    throw error;
  }
};

exports.editDeliveryRoute = async (routeId, updateData) => {
  try {
    // 1. Check if route exists
    const existingRoute = await prisma.deliveryRoute.findUnique({
      where: { routeId },
    });

    if (!existingRoute) {
      throw new Error("Vehicle route not found");
    }

    // 2. If orderId is being updated, verify it exists
    if (updateData.orderId && updateData.orderId !== existingRoute.orderId) {
      await verifyOrderExists(updateData.orderId);
    }

    const { carrierId, shipmentId, orderId } = updateData;

    // 3. Validate carrier exists and is associated with shipment and order
    const carrier = await prisma.carrier.findFirst({
      where: { 
        carrierId: carrierId || existingRoute.carrierId,
        shipmentId: shipmentId || existingRoute.shipmentId,
        orderId: orderId || existingRoute.orderId
      },
    });

    if (!carrier) {
      throw new Error(
        "Invalid carrierId: Carrier does not exist associated with these shipmentId and orderId."
      );
    }

    // 4. Update the route with new data
    return await prisma.deliveryRoute.update({
      where: { routeId },
      data: updateData,
    });
  } catch (error) {
    console.error("Error updating vehicle route:", error.message);
    throw error;
  }
};

exports.getVehicleRouteByCarrier = async (routeId, carrierId) => {
  try {
    return await prisma.deliveryRoute.findFirst({
      where: {
        carrierId: String(carrierId),
        routeId: String(routeId),
      },
    });
  } catch (error) {
    console.error("Failed to fetch vehicle route:", error.message);
    throw new Error("Failed to fetch vehicleRoute from database");
  }
};