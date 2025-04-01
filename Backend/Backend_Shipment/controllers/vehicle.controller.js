const vehicleService = require("../services/vehicle.services");

exports.createVehicle = async (req, res) => {
  try {
    const vehicleData = req.body;

    if (
      !vehicleData.carrierId ||
      !vehicleData.shipmentId ||
      !vehicleData.orderId
    ) {
      return res
        .status(400)
        .json({ message: "carrierId, shipmentId, and orderId are required." });
    }

    const newVehicle = await vehicleService.createVehicle(vehicleData);

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
    const { vehicleId } = req.params; // Vehicle ID from params
    const updateData = req.body; // Data to update

    if (!vehicleId) {
      return res.status(400).json({ error: "Vehicle ID is required" });
    }

    // Call service function
    const updatedVehicle = await vehicleService.editVehicle(
      vehicleId,
      updateData
    );

    return res.status(200).json({
      message: "Vehicle updated successfully",
      vehicle: updatedVehicle,
    });
  } catch (error) {
    console.error("Error updating vehicle:", error);
    return res
      .status(500)
      .json({ error: error.message || "Internal Server Error" });
  }
};

exports.getVehicle = async (req, res) => {
  try {
    const { vehicleId } = req.query; // ✅ Get vehicleId from query params

    const vehicle = await vehicleService.getVehicle(vehicleId); // ✅ Call service function

    return res.status(200).json({ success: true, vehicle });
  } catch (error) {
    console.error("Error in getVehicleController:", error.message);

    return res.status(400).json({ success: false, message: error.message }); // ✅ Send error response
  }
};

exports.getVehicleByCarrier = async (req, res) => {
  try {
    const { vehicleId, carrierId } = req.query;

    if (!carrierId || !vehicleId) {
      return res.status(400).json({
        message:
          "Both carrierId and vehicleId are required as query parameters.",
      });
    }

    const vehicle = await vehicleService.getVehicleByCarrier(
      String(vehicleId),
      String(carrierId)
    );

    if (!vehicle) {
      return res
        .status(404)
        .json({
          message:
            "Vehicle not found .Either vehicleId or carrierId is wrong or not found",
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
