import React, { useContext, useEffect, useState } from "react";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function EditProductMovementForm() {
  const { movementId } = useParams();
  const { setUrl, setGoBackUrl } = useContext(FormPageHeaderContext);
  const token = localStorage.getItem("accessToken");
  const location = useLocation();
  const navigate = useNavigate();

  // Get inventory data from location state
  const movementData = location.state?.movementData || {};

  useEffect(() => {
    setUrl("/productMovement");
    setGoBackUrl("/productMovement");
  }, [setUrl, setGoBackUrl]);

  // Initialize form state
  const [formData, setFormData] = useState({
    movementId: movementData.movementId || "",
    inventoryId: movementData.inventoryId || "",
    productId: movementData.productId || "",
    warehouseId: movementData.warehouseId || "",
    sourceLocation: movementData.sourceLocation || "",
    destinationLocation: movementData.destinationLocation || "",
    quantity: movementData.quantity ? Number(movementData.quantity) : "",
    movementDate: movementData.movementDate
      ? new Date(movementData.movementDate).toISOString().split("T")[0]
      : "",
  });

  const [errors, setErrors] = useState({});

  // Validate numeric fields
  const validateNumberField = (name, value) => {
    if (!value.trim()) return `${name} is required.`;
    if (isNaN(Number(value))) return `${name} must be a valid number.`;
    if (Number(value) <= 0) return `${name} must be greater than zero.`;
    return "";
  };

  // Validate other (non-number) fields
  const validateField = (name, value) => (!value ? `${name} is required.` : "");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "quantity" ? value.replace(/\D/, "") : value, // Only allow numbers in quantity
    }));

    // Validate inputs
    const errorMsg =
      name === "quantity"
        ? validateNumberField(name, value)
        : validateField(name, value);

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMsg,
    }));
  };

  // Check if the form is valid
  const isFormValid = () =>
    [
      "inventoryId",
      "productId",
      "warehouseId",
      "sourceLocation",
      "destinationLocation",
      "quantity",
      "movementDate",
    ].every((field) => formData[field] && !errors[field]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      alert("Please fill all required fields correctly.");
      return;
    }

    try {
      const payload = {
        ...formData,
        quantity: Number(formData.quantity), // Convert quantity to number
      };

      const response = await fetch(
        `http://localhost:7857/api/productMovement/edit-productMovement/${formData.movementId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Product movement updated successfully!");
        navigate("/productMovement");
      } else {
        alert(data.error || "Failed to edit movement data.");
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <FormPageHeader />

      <div className="container">
        <div className="form-container">
          <h2>Edit Product Movement</h2>

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
                    readOnly
                  />
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
                  <span className="error">{errors.productId}</span>
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
                  <span className="error">{errors.warehouseId}</span>
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
                  <span className="error">{errors.inventoryId}</span>
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
                  <span className="error">{errors.sourceLocation}</span>
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
                  <span className="error">{errors.destinationLocation}</span>
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
                  <span className="error">{errors.quantity}</span>
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
                  />
                  <span className="error">{errors.movementDate}</span>
                </div>
              </div>
            </div>

            <button
              className="edit-btn"
              type="submit"
              disabled={!isFormValid()}
            >
              Submit Edit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
