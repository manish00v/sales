import React, { useContext, useEffect, useState } from "react";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function EditDeliveryRouteForm() {
  const { setBtn, setUrl, setGoBackUrl } = useContext(FormPageHeaderContext);
  const token = localStorage.getItem("accessToken");
  const location = useLocation();
  const navigate = useNavigate();
  const { routeId } = useParams();

  // Getting carrier data from location state (if available)
  const deliveryRoute = location.state?.deliveryRoute || {};

  // State to manage form inputs
  const [formData, setFormData] = useState({
    shipmentId: deliveryRoute.shipmentId || "",
    carrierId: deliveryRoute.carrierId || "",
    orderId: deliveryRoute.orderId || "",
    routeId: deliveryRoute.routeId || "",
    sourceLocation: deliveryRoute.sourceLocation || "",
    destinationLocation: deliveryRoute.destinationLocation || "",
    routeTime: deliveryRoute.routeTime || "",
    distance: deliveryRoute.distance || "",
  });

  // State to track errors
  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Form validation
  const validateForm = () => {
    let newErrors = {};

    if (!formData.shipmentId.trim())
      newErrors.shipmentId = "Shipment ID is required.";
    if (!formData.orderId.trim()) newErrors.orderId = "Order ID is required.";
    if (!formData.carrierId.trim())
      newErrors.carrierId = "Carrier ID is required.";

    // Validate distance as a number
    if (!String(formData.distance).trim()) {
      newErrors.distance = "Distance is required.";
    } else if (isNaN(formData.distance) || Number(formData.distance) < 0) {
      newErrors.distance = "Distance must be a valid non-negative number.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Convert distance to a number
    const updatedFormData = {
      ...formData,
      distance: Number(formData.distance),
    };

    try {
      const response = await fetch(
        `http://localhost:6744/api/vehicleRoute/edit-vehicleRoute/${routeId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedFormData),
        }
      );

      const data = await response.json();
      if (response.ok) {
        alert("Delivery route updated successfully!");
        navigate("/deliveryroute"); // Redirect after success
      } else {
        alert(`${data.error}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong! Please try again.");
    }
  };

  // Set form header actions
  useEffect(() => {
    setBtn("Save");
    setUrl("/deliveryroute");
    setGoBackUrl("/deliveryroute");
  }, []);

  return (
    <>
      <FormPageHeader />

      <div className="container">
        <div className="form-container">
          <h2>Edit Delivery Route</h2>

          <div className="header-box">
            <h2>Header</h2>

            <form onSubmit={handleSubmit}>
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
                    readOnly
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
                  {errors.shipmentId && (
                    <p className="error">{errors.shipmentId}</p>
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
                  {errors.orderId && <p className="error">{errors.orderId}</p>}
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
                    <p className="error">{errors.carrierId}</p>
                  )}
                </div>
              </div>
            </form>
          </div>

          <div className="item-box">
            <h2>Item</h2>

            <form onSubmit={handleSubmit}>
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
                  {errors.distance && (
                    <p className="error">{errors.distance}</p>
                  )}
                </div>
              </div>
              <button type="submit" className="edit-btn">
                Submit Edit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
