import React, { useContext, useEffect, useState } from "react";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";
import { useLocation } from "react-router-dom";

export default function DisplayCurrencyExchangeRateForm() {
  const { setUrl, setGoBackUrl } = useContext(FormPageHeaderContext);
  const location = useLocation();

  // Getting payment data from location state (if available)
  const currencyData = location.state?.currencyData || {};

  // Function to format the date for input[type="date"]
  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; // Extracts YYYY-MM-DD
  };

  // ✅ Initializing state with payment data
  const [formData, setFormData] = useState(() => ({
    customerId: currencyData.customerId || "",
    orderId: currencyData.orderId || "",
    invoiceId: currencyData.invoiceId || "",
    exchangeRate: currencyData.exchangeRate || "",
    currencyCode: currencyData.currencyCode || "",
    effectiveDate: formatDateForInput(currencyData.effectiveDate), // ✅ Ensure correct format
  }));

  useEffect(() => {
    setUrl("/currencyexchangerate");
    setGoBackUrl("/currencyexchangerate");
  }, []);

  return (
    <>
      <FormPageHeader />

      <div className="container">
        <div className="form-container">
          <h2>Display Currency Exchange Rate</h2>

          <div className="header-box">
            <h2>Header</h2>

            <form>
              <div className="data-container">
                <div className="data">
                  <label htmlFor="invoiceId">Invoice ID</label>
                  <input
                    type="text"
                    id="invoiceId"
                    name="invoiceId"
                    value={formData.invoiceId}
                    readOnly
                  />
                </div>

                <div className="data">
                  <label htmlFor="orderId">Order ID</label>
                  <input
                    type="text"
                    id="orderId"
                    name="orderId"
                    value={formData.orderId}
                    readOnly
                  />
                </div>

                <div className="data">
                  <label htmlFor="customerId">Customer ID</label>
                  <input
                    type="text"
                    id="customerId"
                    name="customerId"
                    value={formData.customerId}
                    readOnly
                  />
                </div>
              </div>
            </form>
          </div>

          <div className="item-box">
            <h2>Item</h2>

            <form>
              <div className="data-container">
                <div className="data">
                  <label htmlFor="currencyCode">Currency Code</label>
                  <input
                    type="text"
                    id="currencyCode"
                    name="currencyCode"
                    value={formData.currencyCode}
                    readOnly
                  />
                </div>

                <div className="data">
                  <label htmlFor="exchangeRate">Exchange Rate</label>
                  <input
                    type="number"
                    id="exchangeRate"
                    name="exchangeRate"
                    value={formData.exchangeRate}
                    readOnly
                  />
                </div>

                <div className="data">
                  <label htmlFor="effectiveDate">Effective Date</label>
                  <input
                    type="date"
                    id="effectiveDate"
                    name="effectiveDate"
                    value={formData.effectiveDate}
                    readOnly
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
