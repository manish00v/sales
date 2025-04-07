import React, { useContext, useEffect, useState } from "react";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "../../../../components/Layout/Styles/BoxFormStyles.css";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";

export default function EditCarrierForm() {
  const { setBtn, setUrl, setGoBackUrl } = useContext(FormPageHeaderContext);
  const token = localStorage.getItem("accessToken");
  const location = useLocation();
  const navigate = useNavigate();
  const { carrierId } = useParams();

  // Getting carrier data from location state (if available)
  const carrierData = location.state?.carrierData || {};

  // State to manage form inputs
  const [formData, setFormData] = useState({
    shipmentId: carrierData.shipmentId || "",
    carrierId: carrierData.carrierId || "",
    orderId: carrierData.orderId || "",
    name: carrierData.name || "",
    serviceType: carrierData.serviceType || "",
    contactDetails: carrierData.contactDetails || "",
    costStructure: carrierData.costStructure || "",
  });

  // State to track errors
  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.shipmentId || !formData.orderId || !formData.name) {
      alert("Please fill in all required fields.");
      return;
    }

    // Validate phone number (Basic validation: 10-digit format)
    const phoneRegex = /^[0-9]{10}$/; // Adjust this regex if needed
    if (!phoneRegex.test(formData.contactDetails)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    // Convert costStructure to a number
    const updatedFormData = {
      ...formData,
      costStructure: Number(formData.costStructure), // Convert to number
    };

    try {
      const response = await fetch(
        `http://localhost:6744/api/carrier/edit-carrier/${carrierId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedFormData), // Sending updated form data
        }
      );

      const data = await response.json();
      if (response.ok) {
        alert("Carrier updated successfully!");
        navigate("/carrier"); // Redirect after success
      } else {
        alert(`Error updating carrier: ${data.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong! Please try again.");
    }
  };

  // Set form header actions
  useEffect(() => {
    setBtn("Save");
    setUrl("/carrier");
    setGoBackUrl("/carrier");
  }, []);

  return (
    <>
      <FormPageHeader />
      <div className="container">
        <div className="form-container">
          <h2>Edit Carrier</h2>

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
                    value={formData.carrierId}
                    onChange={handleChange}
                    readOnly
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
                    <option value="Overnight_Shipping">
                      Overnight Shipping
                    </option>
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
              className="edit-btn"
              disabled={!!errors.contactDetails}
            >
              Submit Edit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
