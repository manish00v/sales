const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const axios = require('axios');

// Add the same helper function for order verification as in ShipmentService
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

exports.validateShipmentForOrder = async (shipmentId, orderId) => {
  const shipment = await prisma.shipment.findUnique({
    where: { shipmentId },
  });

  return shipment && shipment.orderId === orderId;
};

exports.getCarrierById = async (carrierId) => {
  return await prisma.carrier.findUnique({
    where: { carrierId },
  });
};

exports.createCarrier = async (carrierData) => {
  try {
    // Verify order exists before creating carrier
    await verifyOrderExists(carrierData.orderId);

    return await prisma.carrier.create({
      data: {
        carrierId: carrierData.carrierId,
        orderId: carrierData.orderId,
        name: carrierData.name,
        serviceType: carrierData.serviceType,
        contactDetails: carrierData.contactDetails,
        costStructure: carrierData.costStructure,
        shipmentId: carrierData.shipmentId,
      },
    });
  } catch (error) {
    console.error("Carrier creation failed:", error.message);
    throw error;
  }
};

exports.updateCarrier = async (carrierId, updatedData) => {
  try {
    // Get existing carrier first
    const existingCarrier = await prisma.carrier.findUnique({
      where: { carrierId },
    });

    if (!existingCarrier) {
      throw new Error("Carrier not found");
    }

    // If orderId is being updated, verify it exists
    if (updatedData.orderId && updatedData.orderId !== existingCarrier.orderId) {
      await verifyOrderExists(updatedData.orderId);
    }

    return await prisma.carrier.update({
      where: { carrierId },
      data: updatedData,
    });
  } catch (error) {
    console.error("Carrier update failed:", error.message);
    throw error;
  }
};

exports.getCarrierByOrder = async (carrierId, orderId) => {
  try {
    // Verify order exists first
    await verifyOrderExists(orderId);

    return await prisma.carrier.findFirst({
      where: {
        carrierId: carrierId,
        orderId: orderId,
      },
      include: {
        shipment: true,
        deliveryRoutes: true,
        deliveryVehicles: true,
      },
    });
  } catch (error) {
    console.error("Failed to get carrier by order:", error.message);
    throw error;
  }
};