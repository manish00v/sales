import React, { useState } from "react";
import "../../../../components/Layout/Styles/BoxFormStyles.css";
import { useNavigate } from "react-router-dom";

export default function CreateDeliveryVehicleForm() {
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    vehicleId: "",
    orderId: "",
    vehicleType: "",
    vehicleCapacity: "",
    assignedDriver: "",
    shipmentId: "",
    carrierId: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Ensure vehicleCapacity is a number
    if (name === "vehicleCapacity") {
      if (!/^\d*$/.test(value)) return; // Allow only numbers
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let validationErrors = {};

    if (!formData.vehicleId.trim())
      validationErrors.vehicleId = "Vehicle ID is required";
    if (!formData.shipmentId.trim())
      validationErrors.shipmentId = "Shipment ID is required";
    if (!formData.orderId.trim())
      validationErrors.orderId = "Order ID is required";
    if (!formData.carrierId.trim())
      validationErrors.carrierId = "Carrier ID is required";
    if (!formData.vehicleType.trim())
      validationErrors.vehicleType = "Vehicle Type is required";
    if (!formData.assignedDriver.trim())
      validationErrors.assignedDriver = "Assigned Driver is required";

    if (!formData.vehicleCapacity.trim()) {
      validationErrors.vehicleCapacity = "Vehicle Capacity is required";
    } else if (
      isNaN(Number(formData.vehicleCapacity)) ||
      Number(formData.vehicleCapacity) <= 0
    ) {
      validationErrors.vehicleCapacity =
        "Vehicle Capacity must be a positive number";
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:6744/api/vehicle/create-vehicle",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...formData,
            vehicleCapacity: Number(formData.vehicleCapacity), // Convert to number
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        console.log(data);
        navigate("/deliveryvehicle");
      } else {
        console.log(data.message);
        alert(data.message);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>Create Delivery Vehicle</h2>

        <form onSubmit={handleSubmit}>
          {/* Header Box */}
          <div className="header-box">
            <h2>Header</h2>

            <div className="data-container">
              <div className="data">
                <label htmlFor="vehicleId">Vehicle ID</label>
                <input
                  type="text"
                  id="vehicleId"
                  name="vehicleId"
                  value={formData.vehicleId}
                  onChange={handleChange}
                  required
                />
                {errors.vehicleId && (
                  <span className="error">{errors.vehicleId}</span>
                )}
              </div>

              <div className="data">
                <label htmlFor="shipmentId">Shipment ID</label>
                <input
                  type="text"
                  id="shipmentId"
                  name="shipmentId"
                  value={formData.shipmentId}
                  onChange={handleChange}
                  required
                />
                {errors.shipmentId && (
                  <span className="error">{errors.shipmentId}</span>
                )}
              </div>

              <div className="data">
                <label htmlFor="orderId">Order ID</label>
                <input
                  type="text"
                  id="orderId"
                  name="orderId"
                  value={formData.orderId}
                  onChange={handleChange}
                  required
                />
                {errors.orderId && (
                  <span className="error">{errors.orderId}</span>
                )}
              </div>

              <div className="data">
                <label htmlFor="carrierId">Carrier ID</label>
                <input
                  type="text"
                  id="carrierId"
                  name="carrierId"
                  value={formData.carrierId}
                  onChange={handleChange}
                  required
                />
                {errors.carrierId && (
                  <span className="error">{errors.carrierId}</span>
                )}
              </div>
            </div>
          </div>

          {/* Item Box */}
          <div className="item-box">
            <h2>Item</h2>

            <div className="data-container">
              <div className="data">
                <label htmlFor="vehicleType">Vehicle Type</label>
                <input
                  type="text"
                  id="vehicleType"
                  name="vehicleType"
                  value={formData.vehicleType}
                  onChange={handleChange}
                  required
                />
                {errors.vehicleType && (
                  <span className="error">{errors.vehicleType}</span>
                )}
              </div>

              <div className="data">
                <label htmlFor="vehicleCapacity">Vehicle Capacity</label>
                <input
                  type="text"
                  id="vehicleCapacity"
                  name="vehicleCapacity"
                  value={formData.vehicleCapacity}
                  onChange={handleChange}
                  required
                />
                {errors.vehicleCapacity && (
                  <span className="error">{errors.vehicleCapacity}</span>
                )}
              </div>

              <div className="data">
                <label htmlFor="assignedDriver">Assigned Driver</label>
                <input
                  type="text"
                  id="assignedDriver"
                  name="assignedDriver"
                  value={formData.assignedDriver}
                  onChange={handleChange}
                  required
                />
                {errors.assignedDriver && (
                  <span className="error">{errors.assignedDriver}</span>
                )}
              </div>
            </div>
          </div>

          <button type="submit" className="submit-btn">
            Create Vehicle
          </button>
        </form>
      </div>
    </div>
  );
}
