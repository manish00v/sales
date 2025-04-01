const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const axios = require('axios');

// Add a helper function for order verification
async function verifyOrderExists(orderId) {
  try {
    const response = await axios.get(`http://localhost:3000/api/sales-orders/${orderId}`, {
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    console.log('DEBUG - Order service response:', response.data); // Temporary debug log

    // Handle successful response (200)
    if (response.status === 200) {
      // Check for various possible success indicators
      if (response.data.exists !== undefined) {
        if (response.data.exists) return true;
        throw new Error(`Order ${orderId} not found (exists: false)`);
      }
      if (response.data.id || response.data.orderId) {
        return true; // Assume if we got order data, it exists
      }
      throw new Error("Order verification failed: Unexpected response format");
    }

    // Handle non-200 status codes
    throw new Error(`Order service returned status ${response.status}`);

  } catch (error) {
    // Improved error handling
    if (error.response) {
      if (error.response.status === 404) {
        throw new Error(`Order ${orderId} not found`);
      }
      throw new Error(`Order service error: ${error.response.status} ${error.response.statusText}`);
    }
    throw new Error(`Order verification failed: ${error.message}`);
  }
}
exports.createShipment = async (shipmentData) => {
  try {
    // 1. Check for duplicates
    const existingShipment = await prisma.shipment.findFirst({
      where: {
        OR: [
          { shipmentId: shipmentData.shipmentId },
          { trackingNumber: shipmentData.trackingNumber },
        ],
      },
    });

    if (existingShipment) {
      if (existingShipment.shipmentId === shipmentData.shipmentId) {
        throw new Error(`Shipment ID ${shipmentData.shipmentId} already exists`);
      }
      if (existingShipment.trackingNumber === shipmentData.trackingNumber) {
        throw new Error(`Tracking Number ${shipmentData.trackingNumber} already exists`);
      }
    }

    // 2. Verify order exists using our helper function
    await verifyOrderExists(shipmentData.orderId);

    // 3. Create shipment
    return await prisma.shipment.create({
      data: {
        ...shipmentData,
        dispatchDate: new Date(shipmentData.dispatchDate),
        estimatedDeliveryDate: new Date(shipmentData.estimatedDeliveryDate),
      }
    });
  } catch (error) {
    console.error("Shipment creation failed:", error.message);
    throw error;
  }
};

// ... rest of the service methods remain the same ...
exports.updateShipment = async ({
  shipmentId,
  orderId,
  trackingNumber,
  shipmentStatus,
  dispatchDate,
  estimatedDeliveryDate,
}) => {
  try {
    // 1. Check if the shipment exists
    const existingShipment = await prisma.shipment.findUnique({
      where: { shipmentId },
    });

    if (!existingShipment) {
      throw new Error("Shipment not found");
    }

    // 2. If orderId is being updated, verify it exists
    if (orderId && orderId !== existingShipment.orderId) {
      await verifyOrderExists(orderId);
      
      // Additional check if you want to ensure the order exists in your database too
      const existingSalesOrder = await prisma.salesOrder.findUnique({
        where: { orderId },
      });
      if (!existingSalesOrder) {
        throw new Error("Order ID does not exist in local database");
      }
    }

    // 3. Ensure tracking number is unique (if updated)
    if (trackingNumber && trackingNumber !== existingShipment.trackingNumber) {
      const existingTracking = await prisma.shipment.findFirst({
        where: {
          trackingNumber: Number(trackingNumber),
          shipmentId: { not: shipmentId },
        },
      });

      if (existingTracking) {
        throw new Error("Tracking number already exists");
      }
    }

    // 4. Prepare update data
    const updateData = {
      orderId: orderId || existingShipment.orderId,
      trackingNumber: trackingNumber ? Number(trackingNumber) : existingShipment.trackingNumber,
      shipmentStatus: shipmentStatus || existingShipment.shipmentStatus,
      dispatchDate: dispatchDate ? new Date(dispatchDate).toISOString() : existingShipment.dispatchDate,
      estimatedDeliveryDate: estimatedDeliveryDate ? new Date(estimatedDeliveryDate).toISOString() : existingShipment.estimatedDeliveryDate,
    };

    // 5. Perform the update
    return await prisma.shipment.update({
      where: { shipmentId },
      data: updateData,
    });

  } catch (error) {
    console.error("Shipment update failed:", error.message);
    throw error;
  }
};

exports.getShipmentById = async (shipmentId) => {
  if (!shipmentId) {
    throw new Error("Shipment ID is missing!"); // ✅ Throw explicit error
  }

  return await prisma.shipment.findUnique({
    where: { shipmentId: String(shipmentId) }, // ✅ Ensure it's a string
    include: {
      carriers: true,
      deliveryRoutes: true,
      deliveryVehicles: true,
    },
  });
};

exports.getShipmentByOrder = async (shipmentId, orderId) => {
  return await prisma.shipment.findFirst({
    where: {
      shipmentId,
      orderId,
    },
    include: {
      carriers: true,
      deliveryRoutes: true,
      deliveryVehicles: true,
    },
  });
};