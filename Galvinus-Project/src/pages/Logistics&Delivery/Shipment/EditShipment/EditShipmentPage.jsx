import React, { useContext, useEffect, useState } from "react";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";
import { useNavigate } from "react-router-dom";

const EditShipmentPage = () => {
  const { setGoBackUrl } = useContext(FormPageHeaderContext);
  const navigate = useNavigate(); // ✅ Initialize navigation
  const token = localStorage.getItem("accessToken");

  const [formData, setFormData] = useState({
    shipmentId: "",
    orderId: "",
    trackingNumber: "", // Kept as string initially to handle empty state
    shipmentStatus: "PENDING",
    dispatchDate: "",
    estimatedDeliveryDate: "",
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
        `http://localhost:6744/api/shipment/get-shipment?shipmentId=${formData.shipmentId}`,
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
        console.log("Fetched shipment:", data);

        // ✅ Navigate and pass `data` safely
        navigate(`/editshipmentpage/${formData.shipmentId}`, {
          state: { shipmentData: data },
        });
      } else {
        console.log("Error fetching shipment", data?.error || "Unknown error");
        alert(`Error fetching shipment: ${data?.message || "Unknown error"}`);

        // Reset only `shipmentId` to allow new input
        setFormData((prev) => ({
          ...prev,
          shipmentId: "",
        }));
      }
    } catch (error) {
      console.log("Error:", error);
      alert("Network error: Unable to fetch shipment.");
    }
  };

  useEffect(() => {
    setGoBackUrl("/shipment");
  }, []);

  return (
    <>
      <FormPageHeader />

      <div className="container">
        <div className="form-container">
          <h2>Edit Shipment - Mandatory Details</h2>

          <form className="header-box" onSubmit={handleSubmit}>
            <div className="data-container">
              <div className="data">
                <label htmlFor="shipmentId">Shipment ID</label>
                <input
                  type="text"
                  id="shipmentId"
                  name="shipmentId"
                  placeholder="(Primary Key)"
                  value={formData.shipmentId}
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

export default EditShipmentPage;
