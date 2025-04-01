import React, { useState } from "react";
import "../../../../components/Layout/Styles/BoxFormStyles.css";
import { useNavigate } from "react-router-dom";

export default function CreateWarehouseForm() {
  const token = localStorage.getItem("accessToken");
  const [formData, setFormData] = useState({
    warehouseId: "",
    inventoryId: "",
    productId: "",
    warehouseName: "",
    warehouseAddress: "",
    warehouseCapacity: "",
    warehouseType: "OWNED",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Validate numeric fields
  const validateNumberField = (name, value) => {
    if (!value) return `${name} is required.`;
    if (isNaN(value)) return `${name} must be a valid number.`;
    return "";
  };

  // Validate other (non-number) fields
  const validateField = (name, value) => {
    if (!value) return `${name} is required.`;
    return "";
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    let errorMsg = "";
    if (["warehouseCapacity"].includes(name)) {
      errorMsg = validateNumberField(name, value);
    } else {
      errorMsg = validateField(name, value);
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMsg,
    }));
  };

  // Check if the form is valid
  const isFormValid = () => {
    return (
      Object.values(errors).every((msg) => msg === "") &&
      Object.values(formData).every((value) => value !== "")
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      console.log("Form invalid, please correct the errors");
      return;
    }

    try {
      const payload = {
        ...formData,
        warehouseCapacity: Number(formData.warehouseCapacity),
      };

      const response = await fetch(
        "http://localhost:7857/api/warehouse/create-warehouse",
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
        console.log("Warehouse created successfully:", data);
        setFormData({
          warehouseId: "",
          inventoryId: "",
          productId: "",
          warehouseName: "",
          warehouseAddress: "",
          warehouseCapacity: "",
          warehouseType: "OWNED",
        });
        setErrors({});
        navigate("/warehouse");
      } else {
        // Handle backend validation errors
        if (data.error) {
          let newErrors = { ...errors };

          if (data.error.includes("Warehouse ID already exists")) {
            newErrors.warehouseId = "Warehouse ID already exists.";
          }

          if (data.error.includes("Provided productId does not match")) {
            newErrors.productId = data.error;
          }
          alert(data.error);
          setErrors(newErrors);
        } else {
          console.log("Error:", data.error);
        }
      }
    } catch (error) {
      console.error("Request failed:", error);
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>Create Warehouse</h2>

        <form onSubmit={handleSubmit}>
          {/* Header Box */}
          <div className="header-box">
            <h2>Header</h2>

            <div className="data-container">
              <div className="data">
                <label htmlFor="warehouseId">Warehouse ID</label>
                <input
                  type="text"
                  id="warehouseId"
                  name="warehouseId"
                  placeholder="(Primary Key)"
                  value={formData.warehouseId}
                  onChange={handleChange}
                  required
                />
                {errors.warehouseId && (
                  <p className="error-message">{errors.warehouseId}</p>
                )}
              </div>

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
            </div>
          </div>

          {/* Item Box */}
          <div className="item-box">
            <h2>Item</h2>

            <div className="data-container">
              <div className="data">
                <label htmlFor="warehouseName">Warehouse Name</label>
                <input
                  type="text"
                  id="warehouseName"
                  name="warehouseName"
                  value={formData.warehouseName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="data">
                <label htmlFor="warehouseAddress">Warehouse Address</label>
                <input
                  type="text"
                  id="warehouseAddress"
                  name="warehouseAddress"
                  value={formData.warehouseAddress}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="data">
                <label htmlFor="warehouseCapacity">Warehouse Capacity</label>
                <input
                  type="text"
                  id="warehouseCapacity"
                  name="warehouseCapacity"
                  value={formData.warehouseCapacity}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="data">
                <label htmlFor="warehouseType">Warehouse Type</label>
                <select
                  id="warehouseType"
                  name="warehouseType"
                  value={formData.warehouseType}
                  onChange={handleChange}
                >
                  <option value="OWNED">Owned</option>
                  <option value="THIRDPARTY">3rd Party</option>
                </select>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="submit-btn"
            disabled={!isFormValid()}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
