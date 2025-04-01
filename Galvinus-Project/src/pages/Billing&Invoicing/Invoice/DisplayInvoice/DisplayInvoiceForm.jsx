import React, { useContext, useEffect, useState } from "react";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";
import { useLocation } from "react-router-dom";

export default function DisplayInvoiceForm() {
  const { setUrl, setGoBackUrl } = useContext(FormPageHeaderContext);
  const location = useLocation();

  // Getting payment data from location state (if available)
  const invoiceData = location.state?.invoiceData || {};

  // Function to format the date for input[type="date"]
  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; // Extracts YYYY-MM-DD
  };

  // ✅ Initializing state with payment data
  const [formData, setFormData] = useState(() => ({
    customerId: invoiceData.customerId || "",
    orderId: invoiceData.orderId || "",
    invoiceId: invoiceData.invoiceId || "",
    totalAmount: invoiceData.totalAmount || "",
    totalTax: invoiceData.totalTax || "",
    paymentStatus: invoiceData.paymentStatus || "",
    invoiceDate: formatDateForInput(invoiceData.invoiceDate), // ✅ Ensure correct format
  }));

  useEffect(() => {
    setUrl("/invoice");
    setGoBackUrl("/invoice");
  }, []);
  return (
    <>
      <FormPageHeader />

      <div className="container">
        <div className="form-container">
          <h2>Display Invoice</h2>

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
                    readOnly
                    value={formData.invoiceId}
                  />
                </div>

                <div className="data">
                  <label htmlFor="orderId">Order ID</label>
                  <input
                    type="text"
                    id="orderId"
                    name="orderId"
                    readOnly
                    value={formData.orderId}
                  />
                </div>

                <div className="data">
                  <label htmlFor="customerId">Customer ID</label>
                  <input
                    type="text"
                    id="customerId"
                    name="customerId"
                    readOnly
                    value={formData.customerId}
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
                  <label htmlFor="invoiceDate">Invoice Date</label>
                  <input
                    type="date"
                    id="invoiceDate"
                    name="invoiceDate"
                    readOnly
                    value={formData.invoiceDate}
                  />
                </div>

                <div className="data">
                  <label htmlFor="totalAmount">Total Amount</label>
                  <input
                    type="text"
                    id="totalAmount"
                    name="totalAmount"
                    readOnly
                    value={formData.totalAmount}
                  />
                </div>

                <div className="data">
                  <label htmlFor="tax">Tax</label>
                  <input
                    type="text"
                    id="tax"
                    name="tax"
                    readOnly
                    value={formData.totalTax}
                  />
                </div>

                <div className="data">
                  <label htmlFor="paymentStatus">Payment Status</label>
                  <input
                    type="text"
                    id="paymentStatus"
                    name="paymentStatus"
                    readOnly
                    value={formData.paymentStatus}
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
