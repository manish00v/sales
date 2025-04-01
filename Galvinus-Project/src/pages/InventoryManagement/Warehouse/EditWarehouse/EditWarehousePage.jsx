import React, { useContext, useEffect, useState } from "react";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";
import { useNavigate } from "react-router-dom";

const EditWarehousePage = () => {
  const { setGoBackUrl } = useContext(FormPageHeaderContext);
  const navigate = useNavigate(); // ✅ Initialize navigation
  const token = localStorage.getItem("accessToken");

  const [formData, setFormData] = useState({
    warehouseId: "",
    inventoryId: "",
    productId: "",
    warehouseName: "",
    warehouseAddress: "",
    warehouseCapacity: "",
    warehouseType: "",
  });

  // ✅ Fix handleChange function
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value, // ✅ Dynamically update state
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
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

        // ✅ Navigate and pass `data` using `state`
        navigate(`/editwarehousepage/${formData.warehouseId}`, {
          state: { warehouseData: data },
        });
      } else {
        console.log("Error fetching warehouse", data.error);
        alert(`Error fetching warehouse :${data.error}`);
        setFormData({
          warehouseId: "",
        });
      }
    } catch (error) {
      console.log("Error:", error);
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
              </div>
            </div>
            <button className="edit-btn" type="submit">
              Edit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditWarehousePage;
