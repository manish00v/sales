import React, { useState } from "react";
import "../../../../components/Layout/Styles/BoxFormStyles.css";
import { useNavigate } from "react-router-dom";

export default function CreateCarrierForm() {
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    carrierId: "",
    shipmentId: "",
    orderId: "",
    name: "",
    serviceType: "",
    contactDetails: "",
    costStructure: "",
  });

  const [errors, setErrors] = useState({ contactDetails: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "contactDetails") {
      // Validate if only numbers are allowed
      if (!/^\d*$/.test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          contactDetails: "Contact details must be a valid number.",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          contactDetails: "",
        }));
      }
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "costStructure" ? value.replace(/\D/g, "") : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (errors.contactDetails) {
      alert("Please correct the errors before submitting.");
      return;
    }

    const phoneRegex = /^[0-9]{10}$/; // Adjust this regex if needed
    if (!phoneRegex.test(formData.contactDetails)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    const payload = {
      ...formData,
      contactDetails: formData.contactDetails.trim(),
      costStructure: Number(formData.costStructure) || 0,
    };

    try {
      const response = await fetch(
        "http://localhost:6744/api/carrier/create-carrier",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );
      const data = await response.json();
      if (response.ok) {
        console.log(data);
        setFormData({
          carrierId: "",
          shipmentId: "",
          orderId: "",
          name: "",
          serviceType: "",
          contactDetails: "",
          costStructure: "",
        });
        navigate("/carrier");
      } else {
        console.log(data.error);
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>Create Carrier</h2>

        <form onSubmit={handleSubmit}>
          {/* Header Box */}
          <div className="header-box">
            <h2>Header</h2>

            <div className="data-container">
              <div className="data">
                <label htmlFor="carrierId">Carrier ID</label>
                <input
                  type="text"
                  id="carrierId"
                  name="carrierId"
                  placeholder="(Primary Key)"
                  value={formData.carrierId}
                  onChange={handleChange}
                  required
                />
              </div>

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
              </div>
            </div>
          </div>

          {/* Item Box */}
          <div className="item-box">
            <h2>Item</h2>

            <div className="data-container">
              <div className="data">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="data">
                <label htmlFor="serviceType">Service Type</label>
                <select
                  id="serviceType"
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Service Type</option>
                  <option value="Standard_Shipping">Standard Shipping</option>
                  <option value="Express_Shipping">Express Shipping</option>
                  <option value="Same_Day_Delivery">Same-Day Delivery</option>
                  <option value="Overnight_Shipping">Overnight Shipping</option>
                  <option value="Two_Day_Shipping">Two-Day Shipping</option>
                  <option value="International_Shipping">
                    International Shipping
                  </option>
                </select>
              </div>

              <div className="data">
                <label htmlFor="contactDetails">Contact Details</label>
                <input
                  type="text"
                  id="contactDetails"
                  name="contactDetails"
                  value={formData.contactDetails}
                  onChange={handleChange}
                  required
                />
                {errors.contactDetails && (
                  <p className="error">{errors.contactDetails}</p>
                )}
              </div>

              <div className="data">
                <label htmlFor="costStructure">Cost Structure</label>
                <input
                  type="text"
                  id="costStructure"
                  name="costStructure"
                  value={formData.costStructure}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="submit-btn"
            disabled={!!errors.contactDetails}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
