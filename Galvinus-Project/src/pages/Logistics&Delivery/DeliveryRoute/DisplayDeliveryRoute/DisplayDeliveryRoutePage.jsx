import React, { useEffect, useContext, useState } from "react";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";
import { useNavigate } from "react-router-dom";

export default function DisplayDeliveryRoutePage() {
  const { setGoBackUrl } = useContext(FormPageHeaderContext);
  const navigate = useNavigate(); // ✅ Initialize navigation
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
        `http://localhost:6744/api/vehicleRoute/get-vehicleRouteByCarrier?carrierId=${formData.carrierId}&routeId=${formData.routeId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Ensure response is valid JSON
      let data;
      try {
        data = await response.json();
      } catch (jsonError) {
        console.error("Invalid JSON response:", jsonError);
        alert("Server error: Invalid response format");
        return;
      }

      if (response.ok) {
        console.log("Fetched vehicleRoute:", data);

        // ✅ Navigate and pass `data` safely
        navigate(`/displaydeliveryroutepage/${routeId}`, {
          state: { vehicleRoute: data },
        });
      } else {
        console.log(
          "Error fetching deliveryRoute",
          data?.error || "Unknown error"
        );
        alert(
          `Error fetching deliveryRoute: ${data?.message || "Unknown error"}`
        );

        // Reset only `carrierId` to allow new input
        setFormData((prev) => ({
          ...prev,
          carrierId: "",
          routeId: "",
        }));
      }
    } catch (error) {
      console.log("Error:", error);
      alert("Network error: Unable to fetch deliveryRoute.");
    }
  };

  useEffect(() => {
    setGoBackUrl("/deliveryroute");
  }, []);

  return (
    <>
      <FormPageHeader />

      <div className="container">
        <div className="form-container">
          <h2>Display Delivery Route - Mandatory Details</h2>

          <form className="header-box" onSubmit={handleSubmit}>
            <div className="data-container">
              <div className="data">
                <label htmlFor="routeId">Route ID</label>
                <input
                  type="text"
                  id="routeId"
                  name="routeId"
                  value={formData.routeId}
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
