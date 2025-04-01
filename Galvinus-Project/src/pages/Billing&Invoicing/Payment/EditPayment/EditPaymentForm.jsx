import React, { useContext, useEffect, useState } from "react";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function EditPaymentForm() {
  const { setBtn, setUrl, setGoBackUrl } = useContext(FormPageHeaderContext);
  const navigate = useNavigate();
  // Use paymentId from URL parameters
  const { paymentId } = useParams();
  const token = localStorage.getItem("accessToken");

  // Get payment data from location state (if available)
  const paymentData = useLocation().state?.paymentData || {};
  console.log("Initial payment data:", paymentData);

  const [formData, setFormData] = useState({
    paymentId: paymentData.paymentId || "",
    invoiceId: paymentData.invoiceId || "",
    orderId: paymentData.orderId || "",
    customerId: paymentData.customerId || "",
    amountPaid: paymentData.amountPaid ? String(paymentData.amountPaid) : "",
    paymentDate: paymentData.paymentDate || "",
    paymentMode: paymentData.paymentMode || "CASH",
  });

  // Handle input changes for all fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "amountPaid" ? value.replace(/[^0-9.]/g, "") : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (
      !formData.invoiceId ||
      !formData.orderId ||
      !formData.customerId ||
      !formData.paymentDate ||
      !formData.paymentMode ||
      !formData.amountPaid
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    // Convert amountPaid to float
    const parsedAmount = parseFloat(formData.amountPaid);
    if (isNaN(parsedAmount)) {
      alert("Please enter a valid number for Amount Paid.");
      return;
    }

    // Optionally, convert the date to ISO string if your backend expects it.
    // Here, we assume the backend expects an ISO date string.
    const isoDate = new Date(formData.paymentDate).toISOString();

    const updatedFormData = {
      ...formData,
      amountPaid: parsedAmount,
      paymentDate: isoDate,
    };

    try {
      const response = await fetch(
        `http://localhost:7445/api/payment/edit-payment/${paymentId}`,
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
      if (response.ok) {
        alert("Payment updated successfully!");
        navigate("/payment");
      } else {
        alert(`Error updating payment: ${data.error || data.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong! Please try again.");
    }
  };

  useEffect(() => {
    setBtn("Save");
    setUrl("/payment");
    setGoBackUrl("/payment");
  }, [setBtn, setUrl, setGoBackUrl]);

  return (
    <>
      <FormPageHeader />
      <div className="container">
        <div className="form-container">
          <h2>Edit Payment</h2>
          {/* Combine header and item fields into one form */}
          <form onSubmit={handleSubmit}>
            <div className="header-box">
              <h2>Header</h2>
              <div className="data-container">
                <div className="data">
                  <label htmlFor="paymentId">Payment ID</label>
                  <input
                    type="text"
                    id="paymentId"
                    name="paymentId"
                    placeholder="(Primary Key)"
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
                    placeholder="Foreign Key to Invoice"
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

            <div className="item-box">
              <h2>Item</h2>
              <div className="data-container">
                <div className="data">
                  <label htmlFor="amountPaid">Amount Paid</label>
                  <input
                    type="text"
                    id="amountPaid"
                    name="amountPaid"
                    value={formData.amountPaid}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="data">
                  <label htmlFor="paymentDate">Payment Date</label>
                  <input
                    type="date"
                    id="paymentDate"
                    name="paymentDate"
                    // Convert ISO date to yyyy-MM-dd format if available
                    value={
                      formData.paymentDate
                        ? formData.paymentDate.split("T")[0]
                        : ""
                    }
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="data">
                  <label htmlFor="paymentMode">Payment Mode</label>
                  <select
                    id="paymentMode"
                    name="paymentMode"
                    value={formData.paymentMode}
                    onChange={handleChange}
                    required
                  >
                    <option value="CASH">CASH</option>
                    <option value="ONLINE">ONLINE</option>
                  </select>
                </div>
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
}
