const carrierService = require("../services/carrier.services");

exports.createCarrier = async (req, res) => {
  try {
    const {
      carrierId,
      orderId,
      name,
      serviceType,
      contactDetails,
      costStructure,
      shipmentId,
    } = req.body;

    // Validate required fields
    if (
      !carrierId ||
      !orderId ||
      !name ||
      !serviceType ||
      !contactDetails ||
      !costStructure ||
      !shipmentId
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if carrierId already exists
    const existingCarrier = await carrierService.getCarrierById(carrierId);
    if (existingCarrier) {
      return res.status(409).json({ message: "Carrier ID already exists." });
    }

    // Validate that shipmentId is associated with the given orderId
    const isValidShipment = await carrierService.validateShipmentForOrder(
      shipmentId,
      orderId
    );
    if (!isValidShipment) {
      return res
        .status(400)
        .json({ message: "Invalid shipmentId for the given orderId." });
    }

    // Create the carrier
    const newCarrier = await carrierService.createCarrier({
      carrierId,
      orderId,
      name,
      serviceType,
      contactDetails,
      costStructure,
      shipmentId,
    });

    return res.status(201).json(newCarrier);
  } catch (error) {
    console.error("Error creating carrier:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.editCarrier = async (req, res) => {
  try {
    const { carrierId } = req.params; // Get carrierId from URL params
    const {
      orderId,
      name,
      serviceType,
      contactDetails,
      costStructure,
      shipmentId,
    } = req.body;

    // Fetch existing carrier details
    const existingCarrier = await carrierService.getCarrierById(carrierId);
    if (!existingCarrier) {
      return res.status(404).json({ message: "Carrier not found." });
    }

    // If shipmentId is being updated, validate it with orderId
    if (shipmentId && orderId) {
      const isValidShipment = await carrierService.validateShipmentForOrder(
        shipmentId,
        orderId
      );
      if (!isValidShipment) {
        return res
          .status(400)
          .json({ message: "Invalid shipmentId for the given orderId." });
      }
    }

    // Prepare updated carrier data (keep old values if not provided)
    const updatedCarrierData = {
      orderId: orderId || existingCarrier.orderId,
      name: name || existingCarrier.name,
      serviceType: serviceType || existingCarrier.serviceType,
      contactDetails: contactDetails || existingCarrier.contactDetails,
      costStructure: costStructure || existingCarrier.costStructure,
      shipmentId: shipmentId || existingCarrier.shipmentId,
    };

    // Update carrier
    const updatedCarrier = await carrierService.updateCarrier(
      carrierId,
      updatedCarrierData
    );

    return res.status(200).json(updatedCarrier);
  } catch (error) {
    console.error("Error updating carrier:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.getCarrier = async (req, res) => {
  try {
    const { carrierId } = req.query; // Get carrierId from query parameters

    if (!carrierId) {
      return res
        .status(400)
        .json({ message: "Carrier ID is required as a query parameter." });
    }

    const carrier = await carrierService.getCarrierById(carrierId);

    if (!carrier) {
      return res.status(404).json({ message: "carrier not found." });
    }

    return res.status(200).json(carrier);
  } catch (error) {
    console.error("Error fetching carrier:", error); // ✅ Log error for debugging
    return res
      .status(500)
      .json({ message: error.message || "Internal Server Error" });
  }
};

exports.getCarrierByOrder = async (req, res) => {
  try {
    const { carrierId, orderId } = req.query; // Get carrierId and orderId from query parameters

    // Require both carrierId and orderId
    if (!carrierId || !orderId) {
      return res.status(400).json({
        message: "Both carrierId and orderId are required as query parameters.",
      });
    }

    const carrier = await carrierService.getCarrierByOrder(carrierId, orderId);

    if (!carrier) {
      return res.status(404).json({ message: "Carrier not found." });
    }

    return res.status(200).json(carrier);
  } catch (error) {
    console.error("Error fetching carrier:", error);
    return res
      .status(500)
      .json({ message: error.message || "Internal Server Error" });
  }
};
