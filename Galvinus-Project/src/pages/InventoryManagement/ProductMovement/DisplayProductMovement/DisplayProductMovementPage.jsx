import React, { useEffect, useContext, useState } from "react";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";
import { useNavigate } from "react-router-dom";

export default function DisplayProductMovementPage() {
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
        `http://localhost:7857/api/productMovement/get-productMovementWithProduct?movementId=${formData.movementId}&productId=${formData.productId}`,
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
        navigate(`/displayproductmovementpage/${movementId}`, {
          state: { productMovementData: data },
        });
      } else {
        console.log("Error fetching warehouse", data.error);
        alert(`Error fetching warehouse :${data.error}`);
        setFormData({
          movementId: "",
          productId: "",
        });
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    setGoBackUrl("/productMovement");
  }, []);

  return (
    <>
      <FormPageHeader />

      <div className="container">
        <div className="form-container">
          <h2>Display Product Movement - Mandatory Details</h2>

          <form className="header-box" onSubmit={handleSubmit}>
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
              </div>
            </div>
            <button className="edit-btn" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
