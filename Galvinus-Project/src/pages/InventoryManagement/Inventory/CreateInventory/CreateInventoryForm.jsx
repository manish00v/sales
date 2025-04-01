import React, { useState } from "react";
import "../../../../components/Layout/Styles/BoxFormStyles.css";
import { useNavigate } from "react-router-dom";

export default function CreateInventoryForm() {
  const token = localStorage.getItem("accessToken");
  const [formData, setFormData] = useState({
    inventoryId: "",
    productId: "",
    location: "",
    stockLevel: "", // numeric values as strings
    reorderLevel: "",
    safetyStock: "",
    lotNumber: "",
  });
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [isChecking, setIsChecking] = useState(false);

  // Validate that a field (which should be a number) contains a valid number
  const validateNumberField = (name, value) => {
    if (!value) {
      return `${name} is required.`;
    }
    // Check if the value is a valid number (even if entered as a string)
    if (isNaN(value)) {
      return `${name} must be a valid number.`;
    }
    return "";
  };

  // Validate other (non-number) fields
  const validateField = (name, value) => {
    if (!value) {
      return `${name} is required.`;
    }
    return "";
  };

  // Check if product exists in database
  const checkProductExists = async (productId) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/products/${productId}`,
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
      console.error("Error checking product:", error);
      return false;
    }
  };

  // Check if inventory ID already exists
  const checkInventoryExists = async (inventoryId) => {
    try {
      const response = await fetch(
        `http://localhost:7857/api/inventory/get-inventory?inventoryId=${inventoryId}`,
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
      console.error("Error checking inventory:", error);
      return false;
    }
  };

  // Handle input changes. All inputs are of type text, even numeric ones.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Validate numeric fields
    if (
      ["stockLevel", "reorderLevel", "safetyStock", "lotNumber"].includes(name)
    ) {
      const errorMsg = validateNumberField(name, value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: errorMsg,
      }));
    } else {
      const errorMsg = validateField(name, value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: errorMsg,
      }));
    }
  };

  // Check if the form is valid (no errors and all required fields provided)
  const isFormValid = () => {
    const requiredFields = [
      "inventoryId",
      "productId",
      "location",
      "stockLevel",
      "reorderLevel",
      "safetyStock",
      "lotNumber",
    ];
    for (let field of requiredFields) {
      if (!formData[field]) {
        return false;
      }
    }
    return Object.values(errors).every((msg) => msg === "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsChecking(true);
    
    // Final validation check before submission
    if (!isFormValid()) {
      console.log("Form invalid, please correct the errors");
      setIsChecking(false);
      return;
    }

    try {
      // Check if product exists
      const productExists = await checkProductExists(formData.productId);
      if (!productExists) {
        alert("ProductID does not exist in the database");
        setIsChecking(false);
        return;
      }

      // Check if inventory ID already exists
      const inventoryExists = await checkInventoryExists(formData.inventoryId);
      if (inventoryExists) {
        alert("InventoryID already exists in the database");
        setIsChecking(false);
        return;
      }

      // Convert the numeric fields from strings to numbers before posting
      const payload = {
        ...formData,
        stockLevel: Number(formData.stockLevel),
        reorderLevel: Number(formData.reorderLevel),
        safetyStock: Number(formData.safetyStock),
      };
      
      const response = await fetch(
        "http://localhost:7857/api/inventory/create-inventory",
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
        console.log(data);
        setFormData({
          inventoryId: "",
          productId: "",
          location: "",
          stockLevel: "",
          reorderLevel: "",
          safetyStock: "",
          lotNumber: "",
        });
        navigate("/inventory");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>Create Inventory</h2>
        <form onSubmit={handleSubmit}>
          {/* Header Box */}
          <div className="header-box">
            <h2>Header</h2>
            <div className="data-container">
              <div className="data">
                <label htmlFor="inventoryId">Inventory ID</label>
                <input
                  type="text"
                  id="inventoryId"
                  name="inventoryId"
                  placeholder="Primary Key"
                  value={formData.inventoryId}
                  onChange={handleChange}
                  required
                />
                {errors.inventoryId && (
                  <p className="error">{errors.inventoryId}</p>
                )}
              </div>
              <div className="data">
                <label htmlFor="productId">Product ID</label>
                <input
                  type="text"
                  id="productId"
                  name="productId"
                  placeholder="Foreign Key for Product"
                  value={formData.productId}
                  onChange={handleChange}
                  required
                />
                {errors.productId && (
                  <p className="error">{errors.productId}</p>
                )}
              </div>
            </div>
          </div>

          {/* Item Box */}
          <div className="item-box">
            <h2>Item</h2>
            <div className="data-container">
              <div className="data">
                <label htmlFor="location">Location ID</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
                {errors.location && <p className="error">{errors.location}</p>}
              </div>
              <div className="data">
                <label htmlFor="stockLevel">Stock Level</label>
                <input
                  type="text"
                  id="stockLevel"
                  name="stockLevel"
                  value={formData.stockLevel}
                  onChange={handleChange}
                  required
                />
                {errors.stockLevel && (
                  <p className="error">{errors.stockLevel}</p>
                )}
              </div>
              <div className="data">
                <label htmlFor="reorderLevel">Reorder Level</label>
                <input
                  type="text"
                  id="reorderLevel"
                  name="reorderLevel"
                  value={formData.reorderLevel}
                  onChange={handleChange}
                  required
                />
                {errors.reorderLevel && (
                  <p className="error">{errors.reorderLevel}</p>
                )}
              </div>
              <div className="data">
                <label htmlFor="safetyStock">Safety Stock</label>
                <input
                  type="text"
                  id="safetyStock"
                  name="safetyStock"
                  value={formData.safetyStock}
                  onChange={handleChange}
                  required
                />
                {errors.safetyStock && (
                  <p className="error">{errors.safetyStock}</p>
                )}
              </div>
              <div className="data">
                <label htmlFor="lotNumber">Lot Number</label>
                <input
                  type="text"
                  id="lotNumber"
                  name="lotNumber"
                  value={formData.lotNumber}
                  onChange={handleChange}
                  required
                />
                {errors.lotNumber && (
                  <p className="error">{errors.lotNumber}</p>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="submit-btn"
            disabled={!isFormValid() || isChecking}
          >
            {isChecking ? "Checking..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}