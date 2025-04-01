const vehicleRouteService = require("../services/vehicleRoute.services");
exports.createVehicleRoute = async (req, res) => {
  try {
    const newRoute = await vehicleRouteService.createVehicleRoute(req.body);
    return res.status(201).json({ success: true, data: newRoute });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

// ✅ Edit Vehicle Route
exports.editVehicleRoute = async (req, res) => {
  try {
    const { routeId } = req.params; // Vehicle ID from params
    const updateData = req.body; // Data to update

    if (!routeId) {
      return res.status(400).json({ error: "Route ID is required" });
    }

    // Call service function
    const updatedVehicleRoute = await vehicleRouteService.editDeliveryRoute(
      routeId,
      updateData
    );

    return res.status(200).json({
      message: "VehicleRoute updated successfully",
      vehicleRoute: updatedVehicleRoute,
    });
  } catch (error) {
    console.error("Error updating vehicleRoute:", error);
    return res
      .status(500)
      .json({ error: error.message || "Internal Server Error" });
  }
};

exports.getVehicleRoute = async (req, res) => {
  try {
    const { routeId } = req.query;

    if (!routeId) {
      return res.status(400).json({ message: "routeId is required" });
    }

    const vehicleRoute = await vehicleRouteService.getVehicleRouteById(routeId);

    if (!vehicleRoute) {
      return res.status(404).json({ message: "Vehicle route not found" });
    }

    res.status(200).json(vehicleRoute);
  } catch (error) {
    console.error("Error fetching vehicle route:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getVehicleRouteByCarrier = async (req, res) => {
  try {
    const { routeId, carrierId } = req.query;

    if (!carrierId || !routeId) {
      return res.status(400).json({
        message: "Both carrierId and routeId are required as query parameters.",
      });
    }

    const vehicleRoute = await vehicleRouteService.getVehicleRouteByCarrier(
      String(routeId),
      String(carrierId)
    );

    if (!vehicleRoute) {
      return res.status(404).json({
        message:
          "VehicleRoute not found .Either routeId or carrierId is wrong or not found",
      });
    }

    return res.status(200).json(vehicleRoute);
  } catch (error) {
    console.error("Error fetching vehicleRoute:", error);
    return res.status(500).json({
      message: error.message || "Internal Server Error",
    });
  }
};
