import React, { useContext, useEffect, useState } from "react";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";
import { useNavigate } from "react-router-dom";

const EditDeliveryRoutePage = () => {
  const { setGoBackUrl } = useContext(FormPageHeaderContext);
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

  const [formData, setFormData] = useState({
    routeId: "",
    orderId: "",
    sourceLocation: "",
    destinationLocation: "",
    routeTime: "",
    distance: "",
    shipmentId: "",
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

    if (!formData.routeId.trim()) {
      alert("Route ID is required.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:6744/api/vehicleRoute/get-vehicleRoute?routeId=${formData.routeId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      let data;
      try {
        data = await response.json();
      } catch (jsonError) {
        console.error("Invalid JSON response:", jsonError);
        alert("Server error: Invalid response format.");
        return;
      }

      if (response.ok) {
        console.log("Fetched deliveryRoute:", data);
        navigate(`/editdeliveryroutepage/${formData.routeId}`, {
          state: { deliveryRoute: data },
        });
      } else {
        console.error(
          "Error fetching deliveryRoute",
          data?.message || "Unknown error"
        );
        alert(
          `Error fetching deliveryRoute: ${data?.message || "Unknown error"}`
        );
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Network error: Unable to fetch deliveryRoute.");
    }
  };

  useEffect(() => {
    setGoBackUrl("/deliveryroute");
  }, [setGoBackUrl]);

  return (
    <>
      <FormPageHeader />

      <div className="container">
        <div className="form-container">
          <h2>Edit Delivery Route - Mandatory Details</h2>

          <form className="header-box" onSubmit={handleSubmit}>
            <div className="data-container">
              <div className="data">
                <label htmlFor="routeId">Route ID</label>
                <input
                  type="text"
                  id="routeId"
                  name="routeId"
                  placeholder="(Primary Key)"
                  value={formData.routeId}
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

export default EditDeliveryRoutePage;
