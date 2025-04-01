const shipmentService = require("../services/shipment.services");
exports.createShipment = async (req, res) => {
  try {
    // Validate required fields
    const requiredFields = [
      'shipmentId', 
      'orderId',
      'trackingNumber',
      'shipmentStatus',
      'dispatchDate',
      'estimatedDeliveryDate'
    ];
    
    const missingFields = requiredFields.filter(field => !req.body[field]);
    if (missingFields.length) {
      return res.status(400).json({
        message: 'Missing required fields',
        missingFields
      });
    }

    // Process request
    const shipment = await shipmentService.createShipment(req.body);
    
    return res.status(201).json({
      success: true,
      shipment
    });

  } catch (error) {
    // Structured error handling
    const errorMap = {
      'already exists': 409,
      'not found': 404,
      'Order service': 503,
      'verification failed': 502
    };

    const status = Object.entries(errorMap).find(([key]) => 
      error.message.includes(key)
    )?.[1] || 500;

    return res.status(status).json({
      success: false,
      error: error.message,
      ...(status === 503 && {
        action: 'Retry after 30 seconds',
        serviceStatusUrl: `${ORDER_SERVICE_URL}/health`
      })
    });
  }
};
// ... other controller methods remain the same, but remove the duplicate getShipmentByOrder ...
exports.getShipment = async (req, res) => {
  try {
    const { shipmentId } = req.query; // Get shipmentId from query parameters

    if (!shipmentId) {
      return res
        .status(400)
        .json({ message: "Shipment ID is required as a query parameter." });
    }

    const shipment = await shipmentService.getShipmentById(shipmentId);

    if (!shipment) {
      return res.status(404).json({ message: "Shipment not found." });
    }

    return res.status(200).json(shipment);
  } catch (error) {
    console.error("Error fetching shipment:", error); // ✅ Log error for debugging
    return res
      .status(500)
      .json({ message: error.message || "Internal Server Error" });
  }
};

exports.editShipment = async (req, res) => {
  try {
    const { shipmentId } = req.params;
    const updateData = req.body;

    // Validate at least one field is being updated
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ 
        success: false,
        error: "No update data provided" 
      });
    }

    const updatedShipment = await shipmentService.updateShipment({
      shipmentId,
      ...updateData
    });

    if (!updatedShipment) {
      return res.status(404).json({ 
        success: false,
        error: "Shipment not found" 
      });
    }

    return res.status(200).json({ 
      success: true,
      shipment: updatedShipment 
    });

  } catch (error) {
    console.error("Error updating shipment:", error);
    
    const statusMap = {
      "not found": 404,
      "already exists": 409,
      "Order service": 503,
      "verification failed": 502
    };

    const status = Object.entries(statusMap).find(([key]) => 
      error.message.includes(key)
    )?.[1] || 500;

    return res.status(status).json({ 
      success: false,
      error: error.message 
    });
  }
};

exports.getShipmentByOrder = async (req, res) => {
  try {
    const { shipmentId, orderId } = req.query; // Get shipmentId and orderId from query params

    if (!shipmentId || !orderId) {
      return res.status(400).json({
        message:
          "Both shipmentId and orderId are required as query parameters.",
      });
    }

    const shipment = await shipmentService.getShipmentByOrder(
      shipmentId,
      orderId
    );

    if (!shipment) {
      return res.status(404).json({ message: "Shipment not found." });
    }

    return res.status(200).json(shipment);
  } catch (error) {
    console.error("Error fetching shipment:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};
exports.getShipmentByOrder = async (req, res) => {
  try {
    const { shipmentId, orderId } = req.query; // Get shipmentId and orderId from query params

    if (!shipmentId || !orderId) {
      return res.status(400).json({
        message:
          "Both shipmentId and orderId are required as query parameters.",
      });
    }

    const shipment = await shipmentService.getShipmentByOrder(
      shipmentId,
      orderId
    );

    if (!shipment) {
      return res.status(404).json({ message: "Shipment not found." });
    }

    return res.status(200).json(shipment);
  } catch (error) {
    console.error("Error fetching shipment:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};
