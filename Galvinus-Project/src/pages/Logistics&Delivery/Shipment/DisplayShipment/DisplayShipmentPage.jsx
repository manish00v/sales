import React, { useEffect, useContext, useState } from "react";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";
import { useNavigate } from "react-router-dom";

export default function DisplayShipmentPage() {
  const { setGoBackUrl } = useContext(FormPageHeaderContext);
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const [isChecking, setIsChecking] = useState(false);

  const [formData, setFormData] = useState({
    shipmentId: "",
    orderId: "",
    trackingNumber: "",
    shipmentStatus: "PENDING",
    dispatchDate: "",
    estimatedDeliveryDate: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    // Clear error when user types
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  // Check if order exists in database
  const checkOrderExists = async (orderId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/sales-orders/${orderId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.ok;
    } catch (error) {
      console.error("Error checking order:", error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsChecking(true);
    setErrors({});

    try {
      // Validate required fields
      if (!formData.shipmentId.trim()) {
        setErrors({ shipmentId: "Shipment ID is required" });
        setIsChecking(false);
        return;
      }
      if (!formData.orderId.trim()) {
        setErrors({ orderId: "Order ID is required" });
        setIsChecking(false);
        return;
      }

      // Check if order exists
      const orderExists = await checkOrderExists(formData.orderId);
      if (!orderExists) {
        alert("Order ID does not exist in database");
        setErrors({ orderId: "Order ID not found" });
        setIsChecking(false);
        return;
      }

      // Proceed with fetching shipment data
      const response = await fetch(
        `http://localhost:6744/api/shipment/get-shipmentByOrder?shipmentId=${formData.shipmentId}&orderId=${formData.orderId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      let data;
      try {
        data = await response.json();
      } catch (jsonError) {
        console.error("Invalid JSON response:", jsonError);
        alert("Server error: Invalid response format");
        setIsChecking(false);
        return;
      }

      if (response.ok) {
        console.log("Fetched shipment:", data);
        navigate(`/displayshipmentpage`, {
          state: { shipmentData: data },
        });
      } else {
        console.log("Error fetching shipment", data?.error || "Unknown error");
        alert(`Error fetching shipment: ${data?.message || "Unknown error"}`);
        setFormData((prev) => ({
          ...prev,
          shipmentId: "",
          orderId: "",
        }));
      }
    } catch (error) {
      console.log("Error:", error);
      alert("Network error: Unable to fetch shipment.");
    } finally {
      setIsChecking(false);
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
          <h2>Display Shipment - Mandatory Details</h2>

          <form className="header-box" onSubmit={handleSubmit}>
            <div className="data-container">
              <div className="data">
                <label htmlFor="shipmentId">Shipment ID</label>
                <input
                  type="text"
                  id="shipmentId"
                  name="shipmentId"
                  value={formData.shipmentId}
                  onChange={handleChange}
                  required
                />
                {errors.shipmentId && (
                  <span className="error">{errors.shipmentId}</span>
                )}
              </div>

              <div className="data">
                <label htmlFor="orderId">Order ID</label>
                <input
                  type="text"
                  id="orderId"
                  name="orderId"
                  value={formData.orderId}
                  onChange={handleChange}
                  required
                />
                {errors.orderId && (
                  <span className="error">{errors.orderId}</span>
                )}
              </div>
            </div>
            <button 
              type="submit" 
              className="edit-btn"
              disabled={isChecking}
            >
              {isChecking ? "Validating..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}