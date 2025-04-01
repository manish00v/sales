import React, { useEffect, useContext, useState } from "react";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";
import { useNavigate } from "react-router-dom";

export default function DisplayDeliveryVehiclePage() {
  const { setGoBackUrl } = useContext(FormPageHeaderContext);
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

  const [formData, setFormData] = useState({
    vehicleId: "",
    carrierId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:6744/api/vehicle/get-vehicleByCarrier?carrierId=${formData.carrierId}&vehicleId=${formData.vehicleId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      console.log("Fetched vehicle:", data);

      if (!response.ok) {
        alert(`Error fetching vehicle: ${data.message}`);
        return;
      }

      navigate(`/displaydeliveryvehiclepage/${formData.vehicleId}`, {
        state: { vehicleData: data },
      });
    } catch (error) {
      console.log("Error:", error);
      alert("Network error: Unable to fetch vehicle.");
    }
  };

  useEffect(() => {
    setGoBackUrl("/deliveryvehicle");
  }, []);

  return (
    <>
      <FormPageHeader />

      <div className="container">
        <div className="form-container">
          <h2>Display Delivery Vehicle - Mandatory Details</h2>

          <form className="header-box" onSubmit={handleSubmit}>
            <div className="data-container">
              <div className="data">
                <label htmlFor="vehicleId">Vehicle ID</label>
                <input
                  type="text"
                  id="vehicleId"
                  name="vehicleId"
                  value={formData.vehicleId}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="data">
                <label htmlFor="carrierId">Carrier ID</label>
                <input
                  type="text"
                  id="carrierId"
                  name="carrierId"
                  value={formData.carrierId}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <button type="submit" className="edit-btn">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
