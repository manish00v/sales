import React, { useContext, useEffect, useState } from "react";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";
import { useNavigate } from "react-router-dom";

const EditProductMovementPage = () => {
  const { setGoBackUrl } = useContext(FormPageHeaderContext);
  const navigate = useNavigate(); // ✅ Initialize navigation
  const token = localStorage.getItem("accessToken");

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
        `http://localhost:7857/api/productMovement/get-productMovement?movementId=${formData.movementId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        console.log("Fetched productMovement:", data);

        // ✅ Navigate and pass `data` using `state`
        navigate(`/editproductmovementpage/${formData.movementId}`, {
          state: { movementData: data },
        });
      } else {
        console.log("Error fetching movement", data.error);
        alert(`Error fetching movement:${data.error}`);
        setFormData({
          movementId: "",
        });
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };
  useEffect(() => {
    setGoBackUrl("/productmovement");
  }, []);

  return (
    <>
      <FormPageHeader />

      <div className="container">
        <div className="form-container">
          <h2>Edit Product Movement - Mandatory Details</h2>

          <form className="header-box" onSubmit={handleSubmit}>
            <div className="data-container">
              <div className="data">
                <label htmlFor="movementId">Movement ID</label>
                <input
                  type="text"
                  id="movementId"
                  name="movementId"
                  placeholder="(Primary Key)"
                  value={formData.movementId}
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

export default EditProductMovementPage;
