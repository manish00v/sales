import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Ensure you import useNavigate
import "../../../../components/Layout/Styles/BoxFormStyles.css";

export default function CreateTaxConfigurationForm() {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const [formData, setFormData] = useState({
    taxId: "",
    invoiceId: "",
    orderId: "",
    customerId: "",
    region: "",
    taxType: "CGST",
    taxPercentage: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert taxPercentage to float
    const taxPercentageFloat = parseFloat(formData.taxPercentage);
    if (isNaN(taxPercentageFloat) || taxPercentageFloat <= 0) {
      alert("Please enter a valid tax percentage.");
      return;
    }

    // Validate required fields
    if (
      !formData.invoiceId ||
      !formData.orderId ||
      !formData.customerId ||
      !formData.taxId ||
      !formData.region ||
      !formData.taxType
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const processedData = {
        ...formData,
        taxPercentage: taxPercentageFloat, // Ensure it is sent as a number
      };

      const response = await fetch("http://localhost:7445/api/tax/create-tax", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(processedData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Tax created successfully:", data);
        setFormData({
          taxId: "",
          invoiceId: "",
          orderId: "",
          customerId: "",
          region: "",
          taxPercentage: "",
          taxType: "CGST",
        });
        navigate("/taxconfiguration");
      } else {
        console.error("Error creating tax:", data);
        alert("Failed to create tax. Please try again.");
      }
    } catch (error) {
      console.error("Request failed:", error);
      alert("An error occurred while processing the request.");
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>Create Tax Configuration</h2>

        <form onSubmit={handleSubmit}>
          {/* Header Box */}
          <div className="header-box">
            <h2>Header</h2>

            <div className="data-container">
              <div className="data">
                <label htmlFor="taxId">Tax ID</label>
                <input
                  type="text"
                  id="taxId"
                  name="taxId"
                  placeholder="(Primary Key)"
                  value={formData.taxId}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="data">
                <label htmlFor="invoiceId">Invoice ID</label>
                <input
                  type="text"
                  id="invoiceId"
                  name="invoiceId"
                  value={formData.invoiceId}
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

              <div className="data">
                <label htmlFor="customerId">Customer ID</label>
                <input
                  type="text"
                  id="customerId"
                  name="customerId"
                  value={formData.customerId}
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
                <label htmlFor="region">Region</label>
                <input
                  type="text"
                  id="region"
                  name="region"
                  value={formData.region}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="data">
                <label htmlFor="taxType">Tax Type</label>
                <select
                  name="taxType"
                  id="taxType"
                  onChange={handleChange}
                  value={formData.taxType}
                  required
                >
                  <option value="">Select Tax Type</option>
                  <option value="IGST">IGST</option>
                  <option value="CGST">CGST</option>
                  <option value="SGST">SGST</option>
                </select>
              </div>

              <div className="data">
                <label htmlFor="taxPercentage">Tax Percentage</label>
                <input
                  type="number"
                  step="0.01"
                  id="taxPercentage"
                  name="taxPercentage"
                  value={formData.taxPercentage}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
          <button type="submit" className="edit-btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
