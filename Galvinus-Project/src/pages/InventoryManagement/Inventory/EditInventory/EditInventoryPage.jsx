import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";

const EditInventoryPage = () => {
  const { setGoBackUrl } = useContext(FormPageHeaderContext);
  const navigate = useNavigate(); // ✅ Initialize navigation
  const token = localStorage.getItem("accessToken");

  const [formData, setFormData] = useState({
    inventoryId: "",
    productId: "",
    location: "",
    stockLevel: "",
    reorderLevel: "",
    safetyStock: "",
    lotNumber: "",
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
        `http://localhost:7857/api/inventory/get-inventory?inventoryId=${formData.inventoryId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        console.log("Fetched inventory:", data);

        // ✅ Navigate and pass `data` using `state`
        navigate(`/editinventorypage/${formData.inventoryId}`, {
          state: { inventoryData: data },
        });
      } else {
        console.log("Error fetching inventory", data.error);
        alert(`Error fetching inventory:${data.error}`);
        setFormData({
          inventoryId: "",
        });
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };
  useEffect(() => {
    setGoBackUrl("/inventory");
  }, []);

  return (
    <>
      <FormPageHeader />
      <div className="container">
        <div className="form-container">
          <h2>Edit Inventory - Mandatory Details</h2>
          <form className="header-box" onSubmit={handleSubmit}>
            <div className="data-container">
              <div className="data">
                <label htmlFor="inventoryId">Inventory ID</label>
                <input
                  type="text"
                  id="inventoryId"
                  name="inventoryId"
                  placeholder="(Primary Key)"
                  value={formData.inventoryId}
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

export default EditInventoryPage;
