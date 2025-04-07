const vehicleService = require("../services/vehicle.services");
const KafkaProducer = require("../kafka/kafkaProducer");

exports.createVehicle = async (req, res) => {
  try {
    const vehicleData = req.body;

    // Validate required fields
    if (!vehicleData.carrierId || !vehicleData.shipmentId || !vehicleData.orderId) {
      return res.status(400).json({ 
        message: "carrierId, shipmentId, and orderId are required." 
      });
    }

    const newVehicle = await vehicleService.createVehicle(vehicleData);

    // Publish vehicle created event
    try {
      await KafkaProducer.connect();
      await KafkaProducer.publish('vehicle-events', {
        service: 'vehicle-service',
        event: 'vehicle.created',
        message: `Vehicle ${newVehicle.vehicleId} created for shipment ${vehicleData.shipmentId}`,
        data: newVehicle
      });

      // Also publish to shipment-events if needed
      await KafkaProducer.publish('shipment-events', {
        service: 'vehicle-service',
        event: 'shipment.vehicle_assigned',
        message: `Vehicle ${newVehicle.vehicleId} assigned to shipment ${vehicleData.shipmentId}`,
        data: {
          shipmentId: vehicleData.shipmentId,
          vehicleId: newVehicle.vehicleId,
          carrierId: vehicleData.carrierId
        }
      });
    } catch (kafkaError) {
      console.error("Failed to publish vehicle event:", kafkaError);
    }

    return res.status(201).json({
      message: "Vehicle created successfully.",
      vehicle: newVehicle,
    });
  } catch (error) {
    console.error("Error creating vehicle:", error);
    return res.status(500).json({
      message: error.message || "Internal Server Error",
    });
  }
};

exports.editVehicle = async (req, res) => {
  try {
    const { vehicleId } = req.params;
    const updateData = req.body;

    if (!vehicleId) {
      return res.status(400).json({ error: "Vehicle ID is required" });
    }

    const updatedVehicle = await vehicleService.editVehicle(vehicleId, updateData);

    // Publish vehicle updated event
    try {
      await KafkaProducer.connect();
      await KafkaProducer.publish('vehicle-events', {
        service: 'vehicle-service',
        event: 'vehicle.updated',
        message: `Vehicle ${vehicleId} updated`,
        data: updatedVehicle
      });
    } catch (kafkaError) {
      console.error("Failed to publish vehicle update event:", kafkaError);
    }

    return res.status(200).json({
      message: "Vehicle updated successfully",
      vehicle: updatedVehicle,
    });
  } catch (error) {
    console.error("Error updating vehicle:", error);
    return res.status(500).json({ 
      error: error.message || "Internal Server Error" 
    });
  }
};

exports.getVehicle = async (req, res) => {
  try {
    const { vehicleId } = req.query;

    const vehicle = await vehicleService.getVehicle(vehicleId);

    return res.status(200).json({ 
      success: true, 
      vehicle 
    });
  } catch (error) {
    console.error("Error in getVehicleController:", error.message);
    return res.status(400).json({ 
      success: false, 
      message: error.message 
    });
  }
};

exports.getVehicleByCarrier = async (req, res) => {
  try {
    const { vehicleId, carrierId } = req.query;

    if (!carrierId || !vehicleId) {
      return res.status(400).json({
        message: "Both carrierId and vehicleId are required."
      });
    }

    const vehicle = await vehicleService.getVehicleByCarrier(
      String(vehicleId),
      String(carrierId)
    );

    if (!vehicle) {
      return res.status(404).json({
        message: "Vehicle not found. Either vehicleId or carrierId is wrong"
      });
    }

    return res.status(200).json(vehicle);
  } catch (error) {
    console.error("Error fetching vehicle:", error);
    return res.status(500).json({
      message: error.message || "Internal Server Error",
    });
  }
};