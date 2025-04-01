import React, { useState } from "react";
import "../../../../components/Layout/Styles/BoxFormStyles.css";
import { useNavigate } from "react-router-dom";

export default function CreateProductMovementForm() {
  const [formData, setFormData] = useState({
    movementId: "",
    inventoryId: "",
    warehouseId: "",
    productId: "",
    sourceLocation: "",
    destinationLocation: "",
    quantity: "",
    movementDate: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const validateForm = (data) => {
    let newErrors = {};

    if (!data.movementId.trim())
      newErrors.movementId = "Movement ID is required.";
    if (!data.inventoryId.trim())
      newErrors.inventoryId = "Inventory ID is required.";
    if (!data.warehouseId.trim())
      newErrors.warehouseId = "Warehouse ID is required.";
    if (!data.productId.trim()) newErrors.productId = "Product ID is required.";
    if (!data.sourceLocation.trim())
      newErrors.sourceLocation = "Source Location is required.";
    if (!data.destinationLocation.trim())
      newErrors.destinationLocation = "Destination Location is required.";

    if (!data.quantity.trim()) {
      newErrors.quantity = "Quantity is required.";
    } else if (!/^\d+$/.test(data.quantity)) {
      newErrors.quantity = "Quantity must be a valid number.";
    }

    if (!data.movementDate) {
      newErrors.movementDate = "Movement Date is required.";
    } else if (new Date(data.movementDate) < new Date()) {
      newErrors.movementDate = "Movement Date cannot be in the past.";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Validate the field immediately
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateForm({ ...formData, [name]: value })[name],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      console.log("Form validation failed:", validationErrors);
      return;
    }

    try {
      const payload = {
        ...formData,
        quantity: Number(formData.quantity), // Convert quantity to number
      };

      const response = await fetch(
        "http://localhost:7857/api/productMovement/create-productMovement",
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
        console.log("Product movement created successfully:", data);
        alert(`${data.message} + ${data.alert == null ? "" : data.alert}`);
        setFormData({
          movementId: "",
          inventoryId: "",
          warehouseId: "",
          productId: "",
          sourceLocation: "",
          destinationLocation: "",
          quantity: "",
          movementDate: "",
        });
        setErrors({});
        navigate("/productMovement");
      } else {
        if (data.error) {
          alert(data.error);
        }
        console.log("Error:", data.error);
      }
    } catch (error) {
      console.error("Request failed:", error);
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>Create Product Movement</h2>

        <form onSubmit={handleSubmit}>
          <div className="header-box">
            <h2>Header</h2>
            <div className="data-container">
              <div className="data">
                <label htmlFor="movementId">Movement ID</label>
                <input
                  type="text"
                  id="movementId"
                  name="movementId"
                  value={formData.movementId}
                  onChange={handleChange}
                  required
                />
                {errors.movementId && (
                  <p className="error-message">{errors.movementId}</p>
                )}
              </div>

              <div className="data">
                <label htmlFor="productId">Product ID</label>
                <input
                  type="text"
                  id="productId"
                  name="productId"
                  value={formData.productId}
                  onChange={handleChange}
                  required
                />
                {errors.productId && (
                  <p className="error-message">{errors.productId}</p>
                )}
              </div>

              <div className="data">
                <label htmlFor="warehouseId">Warehouse ID</label>
                <input
                  type="text"
                  id="warehouseId"
                  name="warehouseId"
                  value={formData.warehouseId}
                  onChange={handleChange}
                  required
                />
                {errors.warehouseId && (
                  <p className="error-message">{errors.warehouseId}</p>
                )}
              </div>
            </div>
          </div>

          <div className="item-box">
            <h2>Item</h2>
            <div className="data-container">
              <div className="data">
                <label htmlFor="inventoryId">Inventory ID</label>
                <input
                  type="text"
                  id="inventoryId"
                  name="inventoryId"
                  value={formData.inventoryId}
                  onChange={handleChange}
                  required
                />
                {errors.inventoryId && (
                  <p className="error-message">{errors.inventoryId}</p>
                )}
              </div>

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
                {errors.sourceLocation && (
                  <p className="error-message">{errors.sourceLocation}</p>
                )}
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
                {errors.destinationLocation && (
                  <p className="error-message">{errors.destinationLocation}</p>
                )}
              </div>

              <div className="data">
                <label htmlFor="quantity">Quantity</label>
                <input
                  type="text"
                  id="quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                />
                {errors.quantity && (
                  <p className="error-message">{errors.quantity}</p>
                )}
              </div>

              <div className="data">
                <label htmlFor="movementDate">Movement Date</label>
                <input
                  type="date"
                  id="movementDate"
                  name="movementDate"
                  value={formData.movementDate}
                  onChange={handleChange}
                  required
                  min={new Date().toISOString().split("T")[0]}
                />
                {errors.movementDate && (
                  <p className="error-message">{errors.movementDate}</p>
                )}
              </div>
            </div>
          </div>

          <button className="submit-btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
