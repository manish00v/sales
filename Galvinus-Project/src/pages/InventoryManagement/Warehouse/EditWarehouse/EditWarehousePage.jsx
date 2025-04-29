import React, { useContext, useEffect, useState } from "react";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";
import { useNavigate } from "react-router-dom";

const EditWarehousePage = () => {
  const { setGoBackUrl } = useContext(FormPageHeaderContext);
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const [isChecking, setIsChecking] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    warehouseId: "",
    inventoryId: "",
    productId: "",
    warehouseName: "",
    warehouseAddress: "",
    warehouseCapacity: "",
    warehouseType: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  // Check if warehouse exists in database
  const checkWarehouseExists = async (warehouseId) => {
    try {
      const response = await fetch(
        `http://localhost:7857/api/warehouse/${warehouseId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.ok;
    } catch (error) {
      console.error("Error checking warehouse:", error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsChecking(true);
    setErrors({});

    try {
      // Validate required field
      if (!formData.warehouseId.trim()) {
        setErrors({ warehouseId: "Warehouse ID is required" });
        setIsChecking(false);
        return;
      }

      // Check if warehouse exists
      const warehouseExists = await checkWarehouseExists(formData.warehouseId);
      if (!warehouseExists) {
        alert("Warehouse ID does not exist in database");
        setErrors({ warehouseId: "Warehouse ID not found" });
        setIsChecking(false);
        return;
      }

      // Proceed with fetching warehouse data
      const response = await fetch(
        `http://localhost:7857/api/warehouse/get-warehouse?warehouseId=${formData.warehouseId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        console.log("Fetched warehouse:", data);
        navigate(`/editwarehousepage/${formData.warehouseId}`, {
          state: { warehouseData: data },
        });
      } else {
        console.log("Error fetching warehouse", data.error);
        alert(`Error fetching warehouse: ${data.error}`);
        setFormData({
          warehouseId: "",
        });
      }
    } catch (error) {
      console.log("Error:", error);
      alert("Network error: Unable to fetch warehouse data.");
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    setGoBackUrl("/warehouse");
  }, []);

  return (
    <>
      <FormPageHeader />

      <div className="container">
        <div className="form-container">
          <h2>Edit Warehouse - Mandatory Details</h2>

          <form className="header-box" onSubmit={handleSubmit}>
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
                  <span className="error">{errors.warehouseId}</span>
                )}
              </div>
            </div>
            <button 
              className="edit-btn" 
              type="submit"
              disabled={isChecking}
            >
              {isChecking ? "Checking..." : "Edit"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditWarehousePage;