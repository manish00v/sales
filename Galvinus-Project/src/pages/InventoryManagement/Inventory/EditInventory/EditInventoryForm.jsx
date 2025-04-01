import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";

export default function EditInventoryForm() {
  const { inventoryId } = useParams();
  const { setUrl, setGoBackUrl } = useContext(FormPageHeaderContext);
  const token = localStorage.getItem("accessToken");
  const location = useLocation();
  const navigate = useNavigate();

  // Get inventory data from location state
  const inventoryData = location.state?.inventoryData;

  useEffect(() => {
    setUrl("/inventory");
    setGoBackUrl("/inventory");
  }, [setUrl, setGoBackUrl]);

  // Initialize form state
  const [formData, setFormData] = useState(() => ({
    inventoryId: inventoryData?.inventoryId || "",
    productId: inventoryData?.productId || "",
    warehouseId: inventoryData?.warehouseId || "",
    location: inventoryData?.location || "",
    stockLevel: inventoryData?.stockLevel || "",
    reorderLevel: inventoryData?.reorderLevel || "",
    safetyStock: inventoryData?.safetyStock || "",
    lotNumber: inventoryData?.lotNumber || "",
  }));

  // Handle input changes with number validation

  const [errors, setErrors] = useState({});

  // Validate that a field (which should be a number) contains a valid number
  const validateNumberField = (name, value) => {
    if (!value.trim()) {
      return `${name} is required.`;
    }
    if (isNaN(Number(value))) {
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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.productId || !formData.stockLevel) {
      alert("Product ID and Stock Level are required!");
      return;
    }

    try {
      const payload = {
        ...formData,
        stockLevel: Number(formData.stockLevel),
        reorderLevel: Number(formData.reorderLevel),
        safetyStock: Number(formData.safetyStock),
      };
      const response = await fetch(
        `http://localhost:7857/api/inventory/edit-inventory/${formData.inventoryId}`,
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
        console.log(data);
        setFormData({
          inventoryId: "",
          productId: "",
          location: "",
          stockLevel: "", // numeric values as strings
          reorderLevel: "",
          safetyStock: "",
          lotNumber: "",
        });
        alert("Inventory updated successfully!");
        navigate("/inventory");
      } else {
        alert(data.message || "Failed to edit inventory");
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
          <h2>Edit Inventory</h2>
          <form onSubmit={handleSubmit}>
            <div className="header-box">
              <h2>Header</h2>
              <div className="data-container">
                <div className="data">
                  <label htmlFor="inventoryId">Inventory ID</label>
                  <input
                    type="text"
                    id="inventoryId"
                    name="inventoryId"
                    value={formData.inventoryId}
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
                  {errors.productId && (
                    <p className="error">{errors.productId}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="item-box">
              <h2>Item</h2>
              <div className="data-container">
                <div className="data">
                  <label htmlFor="location">Location</label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                  />
                  {errors.location && (
                    <p className="error">{errors.location}</p>
                  )}
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
                  />
                  {errors.lotNumber && (
                    <p className="error">{errors.lotNumber}</p>
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
