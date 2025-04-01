import React, { useContext, useEffect, useState } from "react";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";
import { useNavigate } from "react-router-dom";

const EditDeliveryVehiclePage = () => {
  const { setGoBackUrl } = useContext(FormPageHeaderContext);
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

  const [formData, setFormData] = useState({
    vehicleId: "",
    orderId: "",
    vehicleType: "",
    vehicleCapacity: "",
    assignedDriver: "",
    shipmentId: "",
    carrierId: "",
  });

  // ✅ Handle input change
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
        `http://localhost:6744/api/vehicle/get-vehicle?vehicleId=${formData.vehicleId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error fetching vehicle:", errorData.message);
        alert(`Error: ${errorData.message || "Vehicle not found"}`);

        // ✅ Clear only vehicleId field
        setFormData((prev) => ({
          ...prev,
          vehicleId: "",
        }));
        return;
      }

      const data = await response.json();
      console.log("Fetched vehicle:", data);

      // ✅ Navigate with fetched data
      navigate(`/editdeliveryvehiclepage/${formData.vehicleId}`, {
        state: { vehicleData: data },
      });
    } catch (error) {
      console.error("Network error:", error);
      alert("Network error: Unable to fetch vehicle.");
    }
  };

  useEffect(() => {
    setGoBackUrl("/deliveryvehicle");
  }, [setGoBackUrl]);

  return (
    <>
      <FormPageHeader />

      <div className="container">
        <div className="form-container">
          <h2>Edit Delivery Vehicle - Mandatory Details</h2>

          <form className="header-box" onSubmit={handleSubmit}>
            <div className="data-container">
              <div className="data">
                <label htmlFor="vehicleId">Vehicle ID</label>
                <input
                  type="text"
                  id="vehicleId"
                  name="vehicleId"
                  placeholder="(Primary Key)"
                  value={formData.vehicleId}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <button type="submit" className="edit-btn">
              Edit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditDeliveryVehiclePage;
