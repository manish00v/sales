import React, { useContext, useEffect, useState } from "react";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function EditDeliveryVehicleForm() {
  const { setBtn, setUrl, setGoBackUrl } = useContext(FormPageHeaderContext);
  const token = localStorage.getItem("accessToken");
  const location = useLocation();
  const navigate = useNavigate();
  const { vehicleId } = useParams();

  // Getting vehicle data from location state (if available)
  const vehicleData = location.state?.vehicleData || {};

  // State to manage form inputs
  const [formData, setFormData] = useState({
    shipmentId: vehicleData.vehicle.shipmentId || "",
    carrierId: vehicleData.vehicle.carrierId || "",
    orderId: vehicleData.vehicle.orderId || "",
    vehicleId: vehicleData.vehicle.vehicleId || "",
    vehicleType: vehicleData.vehicle.vehicleType || "",
    vehicleCapacity: vehicleData.vehicle.vehicleCapacity
      ? String(vehicleData.vehicle.vehicleCapacity)
      : "",
    assignedDriver: vehicleData.vehicle.assignedDriver || "",
  });

  // State to track errors
  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Ensure vehicleCapacity is stored as a number
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "vehicleCapacity" ? value.replace(/\D/g, "") : value, // Prevent non-numeric input
    }));

    // Clear error when user types
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  // Handle form validation
  const validateForm = () => {
    let newErrors = {};

    if (!formData.shipmentId.trim())
      newErrors.shipmentId = "Shipment ID is required.";
    if (!formData.orderId.trim()) newErrors.orderId = "Order ID is required.";
    if (!formData.carrierId.trim())
      newErrors.carrierId = "Carrier ID is required.";
    if (!formData.vehicleType.trim())
      newErrors.vehicleType = "Vehicle Type is required.";
    if (!String(formData.vehicleCapacity).trim())
      newErrors.vehicleCapacity = "Vehicle Capacity is required.";
    if (!formData.assignedDriver.trim())
      newErrors.assignedDriver = "Assigned Driver is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form before submitting
    if (!validateForm()) {
      alert("Please fill in all required fields.");
      return;
    }

    // Convert vehicleCapacity to a number before sending it to the backend
    const updatedFormData = {
      ...formData,
      vehicleCapacity: Number(formData.vehicleCapacity), // Ensure number type
    };

    try {
      const response = await fetch(
        `http://localhost:6744/api/vehicle/edit-vehicle/${vehicleId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedFormData), // Sending updated form data
        }
      );

      const data = await response.json();
      if (response.ok) {
        alert("Vehicle updated successfully!");
        navigate("/deliveryvehicle"); // Redirect after success
      } else {
        alert(` ${data.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong! Please try again.");
    }
  };

  // Set form header actions
  useEffect(() => {
    setBtn("Save");
    setUrl("/deliveryvehicle");
    setGoBackUrl("/deliveryvehicle");
  }, [setBtn, setUrl, setGoBackUrl]);

  return (
    <>
      <FormPageHeader />

      <div className="container">
        <div className="form-container">
          <h2>Edit Delivery Vehicle</h2>

          <form onSubmit={handleSubmit}>
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

            <button type="submit" className="edit-btn">
              Submit Edit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
