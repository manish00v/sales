import React, { useContext, useEffect, useState } from "react";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function EditCurrencyExchangeRateForm() {
  const { setBtn, setUrl, setGoBackUrl } = useContext(FormPageHeaderContext);
  const navigate = useNavigate();
  const { invoiceId } = useParams();
  const token = localStorage.getItem("accessToken");

  // Get invoice data from location state (if available)
  const currencyData = useLocation().state?.currencyData || {};

  console.log(invoiceId);

  const [formData, setFormData] = useState({
    invoiceId: invoiceId || currencyData.invoiceId || "",
    orderId: currencyData.orderId || "",
    customerId: currencyData.customerId || "",
    currencyCode: currencyData.currencyCode || "",
    effectiveDate: currencyData.effectiveDate
      ? new Date(currencyData.effectiveDate).toISOString().split("T")[0]
      : "",
    exchangeRate: currencyData.exchangeRate || "",
  });

  // Handle input changes
  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "exchangeRate") {
      value = value.replace(/[^0-9.]/g, ""); // Allow only numbers and decimals
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents page reload

    // Keep old values if unchanged
    const updatedFormData = {
      invoiceId: formData.invoiceId || currencyData.invoiceId,
      orderId: formData.orderId || currencyData.orderId,
      customerId: formData.customerId || currencyData.customerId,
      currencyCode: formData.currencyCode || currencyData.currencyCode,
      exchangeRate: formData.exchangeRate || currencyData.exchangeRate,
      effectiveDate: formData.effectiveDate || currencyData.effectiveDate,
    };

    // Validate numeric fields
    const parsedExchangeRate = parseFloat(updatedFormData.exchangeRate);

    if (isNaN(parsedExchangeRate) || parsedExchangeRate <= 0) {
      alert("Please enter a valid Exchange Rate.");
      return;
    }

    // Convert effective date to YYYY-MM-DD format
    updatedFormData.effectiveDate = updatedFormData.effectiveDate
      ? new Date(updatedFormData.effectiveDate).toISOString().split("T")[0]
      : "";

    try {
      const response = await fetch(
        `http://localhost:7445/api/currency/edit-currencyExchange/${invoiceId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedFormData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || data.message || "Failed to update currency."
        );
      }

      alert("Currency updated successfully!");
      navigate("/currencyexchangerate");
    } catch (error) {
      console.error("Error:", error);
      alert(`Error updating currency: ${error.message}`);
    }
  };

  useEffect(() => {
    setBtn("Save");
    setUrl("/currencyexchangerate");
    setGoBackUrl("/currencyexchangerate");
  }, [setBtn, setUrl, setGoBackUrl]);

  return (
    <>
      <FormPageHeader />

      <div className="container">
        <div className="form-container">
          <h2>Edit Currency Exchange Rate</h2>

          <form onSubmit={handleSubmit}>
            <div className="header-box">
              <h2>Header</h2>

              <div className="data-container">
                <div className="data">
                  <label htmlFor="invoiceId">Invoice ID</label>
                  <input
                    type="text"
                    id="invoiceId"
                    name="invoiceId"
                    defaultValue={formData.invoiceId}
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
                    defaultValue={formData.orderId}
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
                    defaultValue={formData.customerId}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="item-box">
              <h2>Item</h2>

              <div className="data-container">
                <div className="data">
                  <label htmlFor="currencyCode">Currency Code</label>
                  <input
                    type="text"
                    id="currencyCode"
                    name="currencyCode"
                    defaultValue={formData.currencyCode}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="data">
                  <label htmlFor="exchangeRate">Exchange Rate</label>
                  <input
                    type="number"
                    id="exchangeRate"
                    name="exchangeRate"
                    step="0.01"
                    defaultValue={formData.exchangeRate}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="data">
                  <label htmlFor="effectiveDate">Effective Date</label>
                  <input
                    type="date"
                    id="effectiveDate"
                    name="effectiveDate"
                    defaultValue={
                      formData.effectiveDate
                        ? new Date(formData.effectiveDate)
                            .toISOString()
                            .split("T")[0]
                        : ""
                    }
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            <button type="submit" className="edit-btn">
              Submit Edit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
