import React, { useState } from "react";
import "../../../../components/Layout/Styles/BoxFormStyles.css";
import { useNavigate } from "react-router-dom";

export default function CreateInvoiceForm() {
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    invoiceId: "",
    orderId: "",
    customerId: "",
    invoiceDate: "",
    totalAmount: "",
    totalTax: "", // Optional
    paymentStatus: "PENDING",
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

    // Validate required fields
    if (
      !formData.invoiceId ||
      !formData.orderId ||
      !formData.customerId ||
      !formData.invoiceDate ||
      !formData.totalAmount
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      // Convert totalAmount & totalTax to floats explicitly
      const processedData = {
        ...formData,
        totalAmount: formData.totalAmount
          ? parseFloat(formData.totalAmount)
          : 0, // Ensure float value
        totalTax: formData.totalTax ? parseFloat(formData.totalTax) : 0, // Ensure float value
        invoiceDate: new Date(formData.invoiceDate).toISOString(), // Convert to proper Date format
      };

      const response = await fetch(
        "http://localhost:7445/api/invoice/create-invoice",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(processedData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("Invoice created successfully:", data);
        setFormData({
          invoiceId: "",
          orderId: "",
          customerId: "",
          invoiceDate: "",
          totalAmount: "",
          totalTax: "",
          paymentStatus: "PENDING",
        });
        navigate("/invoice");
      } else {
        console.error("Error creating invoice:", data);
      }
    } catch (error) {
      console.error("Request failed:", error);
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>Create Invoice</h2>

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
                  placeholder="(Primary Key)"
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
                  placeholder="(Foreign Key of Sales Order)"
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
                <label htmlFor="invoiceDate">Invoice Date</label>
                <input
                  type="date"
                  id="invoiceDate"
                  name="invoiceDate"
                  value={formData.invoiceDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="data">
                <label htmlFor="totalAmount">Total Amount</label>
                <input
                  type="number"
                  id="totalAmount"
                  name="totalAmount"
                  value={formData.totalAmount}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="data">
                <label htmlFor="totalTax">Tax</label>
                <input
                  type="number"
                  id="totalTax"
                  name="totalTax"
                  value={formData.totalTax}
                  onChange={handleChange}
                />
              </div>

              <div className="data">
                <label htmlFor="paymentStatus">Payment Status</label>
                <select
                  name="paymentStatus"
                  id="paymentStatus"
                  value={formData.paymentStatus}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Payment Status</option>
                  <option value="PENDING">PENDING</option>
                  <option value="HALF_PAYMENT">HALF PAYMENT</option>
                  <option value="FULL_PAID">FULL PAID</option>
                </select>
              </div>
            </div>
          </div>

          <button type="submit" className="edit-btn">
            Create Invoice
          </button>
        </form>
      </div>
    </div>
  );
}
