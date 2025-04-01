import React, { useState } from "react";
import "../../../../components/Layout/Styles/BoxFormStyles.css";
import { useNavigate } from "react-router-dom";

export default function CreateShipmentForm() {
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    shipmentId: "",
    orderId: "",
    trackingNumber: "",
    shipmentStatus: "PENDING",
    dispatchDate: "",
    estimatedDeliveryDate: "",
  });

  const [errors, setErrors] = useState({});
  const [isChecking, setIsChecking] = useState(false);

  // Check if shipment ID exists
  const checkShipmentExists = async (shipmentId) => {
    try {
      const response = await fetch(
        `http://localhost:6744/api/shipment/get-shipment?shipmentId=${shipmentId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.ok;
    } catch (error) {
      console.error("Error checking shipment:", error);
      return false;
    }
  };

  // Check if order ID exists
  const checkOrderExists = async (orderId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/sales-orders/${orderId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.ok;
    } catch (error) {
      console.error("Error checking order:", error);
      return false;
    }
  };

  // Check if tracking number is unique
  const checkTrackingNumberUnique = async (trackingNumber) => {
    try {
      const response = await fetch(
        `http://localhost:6744/api/shipment/tracking/${trackingNumber}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return !response.ok; // If response is not ok (404), then it's unique
    } catch (error) {
      console.error("Error checking tracking number:", error);
      return false;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "trackingNumber" ? value.replace(/\D/, "") : value,
    }));
  };

  const validateForm = () => {
    let errors = {};

    if (!formData.shipmentId.trim())
      errors.shipmentId = "Shipment ID is required.";
    if (!formData.orderId.trim()) errors.orderId = "Order ID is required.";

    if (!formData.trackingNumber.trim()) {
      errors.trackingNumber = "Tracking Number is required.";
    } else if (isNaN(formData.trackingNumber)) {
      errors.trackingNumber = "Tracking Number must be a valid number.";
    }

    if (!formData.dispatchDate) {
      errors.dispatchDate = "Dispatch Date is required.";
    } else if (new Date(formData.dispatchDate) < new Date()) {
      errors.dispatchDate = "Dispatch Date cannot be in the past.";
    }

    if (!formData.estimatedDeliveryDate) {
      errors.estimatedDeliveryDate = "Estimated Delivery Date is required.";
    } else if (
      new Date(formData.estimatedDeliveryDate) <=
      new Date(formData.dispatchDate)
    ) {
      errors.estimatedDeliveryDate =
        "Estimated Delivery Date must be after Dispatch Date.";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsChecking(true);

    try {
      // Check if shipment ID already exists
      const shipmentExists = await checkShipmentExists(formData.shipmentId);
      if (shipmentExists) {
        alert("Shipment ID already exists in database");
        setErrors((prev) => ({
          ...prev,
          shipmentId: "Shipment ID already exists",
        }));
        setIsChecking(false);
        return;
      }

      // Check if order ID exists
      const orderExists = await checkOrderExists(formData.orderId);
      if (!orderExists) {
        alert("Order ID does not exist in database");
        setErrors((prev) => ({
          ...prev,
          orderId: "Order ID not found",
        }));
        setIsChecking(false);
        return;
      }

      // Check if tracking number is unique
      const trackingUnique = await checkTrackingNumberUnique(formData.trackingNumber);
      if (!trackingUnique) {
        alert("Tracking Number must be unique");
        setErrors((prev) => ({
          ...prev,
          trackingNumber: "Tracking Number must be unique",
        }));
        setIsChecking(false);
        return;
      }

      // All checks passed, proceed with submission
      const payload = {
        ...formData,
        trackingNumber: Number(formData.trackingNumber),
      };

      const response = await fetch(
        "http://localhost:6744/api/shipment/create-shipment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();
      if (response.ok) {
        console.log("Shipment created:", data);
        alert("Shipment created successfully!");
        setFormData({
          shipmentId: "",
          orderId: "",
          trackingNumber: "",
          shipmentStatus: "PENDING",
          dispatchDate: "",
          estimatedDeliveryDate: "",
        });
        setErrors({});
        navigate("/shipment");
      } else {
        alert(data.message || "Failed to create shipment.");
      }
    } catch (error) {
      console.log("Error:", error);
      alert("An error occurred while creating the shipment.");
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>Create Shipment</h2>

        <form onSubmit={handleSubmit}>
          {/* Header Box */}
          <div className="header-box">
            <h2>Header</h2>
            <div className="data-container">
              <div className="data">
                <label htmlFor="shipmentId">Shipment ID</label>
                <input
                  type="text"
                  id="shipmentId"
                  name="shipmentId"
                  placeholder="(Primary Key)"
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
                  placeholder="(Foreign Key to Sales Order)"
                  value={formData.orderId}
                  onChange={handleChange}
                  required
                />
                {errors.orderId && (
                  <span className="error">{errors.orderId}</span>
                )}
              </div>
            </div>
          </div>

          {/* Item Box */}
          <div className="item-box">
            <h2>Item</h2>
            <div className="data-container">
              <div className="data">
                <label htmlFor="trackingNumber">Tracking Number</label>
                <input
                  type="number"
                  id="trackingNumber"
                  name="trackingNumber"
                  value={formData.trackingNumber}
                  onChange={handleChange}
                  required
                />
                {errors.trackingNumber && (
                  <span className="error">{errors.trackingNumber}</span>
                )}
              </div>

              <div className="data">
                <label htmlFor="shipmentStatus">Shipment Status</label>
                <select
                  name="shipmentStatus"
                  id="shipmentStatus"
                  value={formData.shipmentStatus}
                  onChange={handleChange}
                >
                  <option value="PENDING">Pending</option>
                  <option value="DISPATCHED">Dispatch</option>
                  <option value="IN_TRANSIT">In-Transit</option>
                  <option value="DELIVERED">Delivered</option>
                  <option value="CANCELLED">Cancelled</option>
                </select>
              </div>

              <div className="data">
                <label htmlFor="dispatchDate">Dispatch Date</label>
                <input
                  type="date"
                  id="dispatchDate"
                  name="dispatchDate"
                  value={formData.dispatchDate}
                  onChange={handleChange}
                  required
                />
                {errors.dispatchDate && (
                  <span className="error">{errors.dispatchDate}</span>
                )}
              </div>

              <div className="data">
                <label htmlFor="estimatedDeliveryDate">
                  Estimated Delivery Date
                </label>
                <input
                  type="date"
                  id="estimatedDeliveryDate"
                  name="estimatedDeliveryDate"
                  value={formData.estimatedDeliveryDate}
                  onChange={handleChange}
                  required
                />
                {errors.estimatedDeliveryDate && (
                  <span className="error">{errors.estimatedDeliveryDate}</span>
                )}
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            className="submit-btn"
            disabled={isChecking}
          >
            {isChecking ? "Validating..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}