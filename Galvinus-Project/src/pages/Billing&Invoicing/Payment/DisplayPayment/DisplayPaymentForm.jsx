import React, { useContext, useEffect, useState } from "react";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";
import { useLocation } from "react-router-dom";

export default function DisplayPaymentForm() {
  const { setUrl, setGoBackUrl } = useContext(FormPageHeaderContext);
  const location = useLocation();

  // Getting payment data from location state (if available)
  const paymentData = location.state?.paymentData || {};

  // Function to format the date for input[type="date"]
  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; // Extracts YYYY-MM-DD
  };

  // ✅ Initializing state with payment data
  const [formData, setFormData] = useState(() => ({
    paymentId: paymentData.paymentId || "",
    orderId: paymentData.orderId || "",
    invoiceId: paymentData.invoiceId || "",
    customerId: paymentData.customerId || "",
    amountPaid: paymentData.amountPaid || "",
    paymentDate: formatDateForInput(paymentData.paymentDate), // ✅ Ensure correct format
    paymentMode: paymentData.paymentMode || "",
  }));

  useEffect(() => {
    setUrl("/payment");
    setGoBackUrl("/payment");
  }, []);

  return (
    <>
      <FormPageHeader />

      <div className="container">
        <div className="form-container">
          <h2>Display Payment</h2>

          <div className="header-box">
            <h2>Header</h2>

            <form>
              <div className="data-container">
                <div className="data">
                  <label htmlFor="paymentId">Payment ID</label>
                  <input
                    type="text"
                    id="paymentId"
                    name="paymentId"
                    value={formData.paymentId}
                    readOnly
                  />
                </div>

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
                  <label htmlFor="amountPaid">Amount Paid</label>
                  <input
                    type="text"
                    id="amountPaid"
                    name="amountPaid"
                    value={formData.amountPaid}
                    readOnly
                  />
                </div>

                <div className="data">
                  <label htmlFor="paymentDate">Payment Date</label>
                  <input
                    type="date"
                    id="paymentDate"
                    name="paymentDate"
                    value={formData.paymentDate} // ✅ Date correctly formatted
                    readOnly
                  />
                </div>

                <div className="data">
                  <label htmlFor="paymentMode">Payment Mode</label>
                  <input
                    type="text"
                    id="paymentMode"
                    name="paymentMode"
                    value={formData.paymentMode}
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
