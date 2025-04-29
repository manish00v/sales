import React, { useState } from "react";
import "../../../../components/Layout/Styles/BoxFormStyles.css";
import { useNavigate } from "react-router-dom";

export default function CreateCurrencyExchangeRateForm() {
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    invoiceId: "",
    orderId: "",
    customerId: "",
    currencyCode: "",
    exchangeRate: "",
    effectiveDate: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};
    if (!formData.invoiceId.trim())
      newErrors.invoiceId = "Invoice ID is required";
    if (!formData.orderId.trim()) newErrors.orderId = "Order ID is required";
    if (!formData.customerId.trim())
      newErrors.customerId = "Customer ID is required";
    if (!formData.currencyCode.trim())
      newErrors.currencyCode = "Currency Code is required";
    if (!formData.effectiveDate.trim())
      newErrors.effectiveDate = "Effective Date is required";

    if (!formData.exchangeRate.trim()) {
      newErrors.exchangeRate = "Exchange Rate is required";
    } else if (isNaN(parseFloat(formData.exchangeRate))) {
      newErrors.exchangeRate = "Exchange Rate must be a valid number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return; // Stop if validation fails

    const formattedData = {
      ...formData,
      exchangeRate: parseFloat(formData.exchangeRate), // Ensure it's sent as a float
    };

    try {
      const response = await fetch(
        "http://localhost:7445/api/currency/create-currencyExchange",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formattedData),
        }
      );

      const data = await response.json();
      if (response.ok) {
        console.log("Success:", data);
        alert("Currency Exchange Rate Created Successfully!");
        setFormData({
          invoiceId: "",
          orderId: "",
          customerId: "",
          currencyCode: "",
          exchangeRate: "",
          effectiveDate: "",
        });
        navigate("/currencyexchangerate");
      } else {
        alert(data.message || "Failed to create Currency Exchange Rate");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>Create Currency Exchange Rate</h2>

        <form onSubmit={handleSubmit}>
          {/* Header Box */}
          <div className="header-box">
            <h2>Header</h2>

            <div className="data-container">
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
                {errors.invoiceId && (
                  <span className="error">{errors.invoiceId}</span>
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
                {errors.customerId && (
                  <span className="error">{errors.customerId}</span>
                )}
              </div>
            </div>
          </div>

          {/* Item Box */}
          <div className="item-box">
            <h2>Item</h2>

            <div className="data-container">
              <div className="data">
                <label htmlFor="currencyCode">Currency Code</label>
                <input
                  type="text"
                  id="currencyCode"
                  name="currencyCode"
                  value={formData.currencyCode}
                  onChange={handleChange}
                  required
                />
                {errors.currencyCode && (
                  <span className="error">{errors.currencyCode}</span>
                )}
              </div>

              <div className="data">
                <label htmlFor="exchangeRate">Exchange Rate</label>
                <input
                  type="text"
                  id="exchangeRate"
                  name="exchangeRate"
                  value={formData.exchangeRate}
                  onChange={handleChange}
                  required
                />
                {errors.exchangeRate && (
                  <span className="error">{errors.exchangeRate}</span>
                )}
              </div>

              <div className="data">
                <label htmlFor="effectiveDate">Effective Date</label>
                <input
                  type="date"
                  id="effectiveDate"
                  name="effectiveDate"
                  value={formData.effectiveDate}
                  onChange={handleChange}
                  required
                />
                {errors.effectiveDate && (
                  <span className="error">{errors.effectiveDate}</span>
                )}
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
