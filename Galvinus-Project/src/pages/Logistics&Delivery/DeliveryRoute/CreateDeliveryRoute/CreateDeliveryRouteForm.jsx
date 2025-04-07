import React, { useState } from "react";
import "../../../../components/Layout/Styles/BoxFormStyles.css";
import { useNavigate } from "react-router-dom";

export default function CreateDeliveryRouteForm() {
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    routeId: "",
    orderId: "",
    sourceLocation: "",
    destinationLocation: "",
    routeTime: "",
    distance: "",
    shipmentId: "",
    carrierId: "",
  });

  const [errors, setErrors] = useState({ distance: "" });

  const alphanumericRegex = /^[a-zA-Z0-9]+$/;

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (["routeId", "shipmentId", "orderId", "carrierId"].includes(name)) {
      if (!alphanumericRegex.test(value) && value !== "") {
        return;
      }
    }

    if (name === "distance") {
      if (!/^\d*$/.test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          distance: "Distance must be a valid number.",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          distance: "",
        }));
      }
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (errors.distance) {
      alert("Please correct the errors before submitting.");
      return;
    }

    const payload = {
      ...formData,
      distance: Number(formData.distance) || 0,
    };

    try {
      const response = await fetch(
        "http://localhost:6744/api/vehicleRoute/create-vehicleRoute",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );
      const data = await response.json();

      if (response.ok) {
        console.log(data);
        setFormData({
          routeId: "",
          orderId: "",
          sourceLocation: "",
          destinationLocation: "",
          routeTime: "",
          distance: "",
          shipmentId: "",
          carrierId: "",
        });
        navigate("/deliveryroute");
      } else {
        console.log(data.error);
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>Create Delivery Route</h2>

        <form onSubmit={handleSubmit}>
          {/* Header Box */}
          <div className="header-box">
            <h2>Header</h2>
            <div className="data-container">
              <div className="data">
                <label htmlFor="routeId">Route ID</label>
                <input
                  type="text"
                  id="routeId"
                  name="routeId"
                  placeholder="(Primary Key)"
                  value={formData.routeId}
                  onChange={handleChange}
                  required
                />
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
              </div>
            </div>
          </div>

          {/* Item Box */}
          <div className="item-box">
            <h2>Item</h2>

            <div className="data-container">
              <div className="data">
                <label htmlFor="sourceLocation">Source Location</label>
                <input
                  type="text"
                  id="sourceLocation"
                  name="sourceLocation"
                  value={formData.sourceLocation}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="data">
                <label htmlFor="destinationLocation">
                  Destination Location
                </label>
                <input
                  type="text"
                  id="destinationLocation"
                  name="destinationLocation"
                  value={formData.destinationLocation}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="data">
                <label htmlFor="routeTime">Route Time</label>
                <input
                  type="text"
                  id="routeTime"
                  name="routeTime"
                  value={formData.routeTime}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="data">
                <label htmlFor="distance">Distance</label>
                <input
                  type="text"
                  id="distance"
                  name="distance"
                  value={formData.distance}
                  onChange={handleChange}
                  required
                />
                {errors.distance && <p className="error">{errors.distance}</p>}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="submit-btn"
            disabled={!!errors.distance}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
