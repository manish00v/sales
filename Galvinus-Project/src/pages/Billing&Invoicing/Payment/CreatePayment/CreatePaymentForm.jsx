import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../../components/Layout/Styles/BoxFormStyles.css";

export default function CreatePaymentForm() {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const [formData, setFormData] = useState({
    paymentId: "",
    invoiceId: "",
    orderId: "",
    customerId: "",
    amountPaid: "",
    paymentDate: "",
    paymentMode: "CASH",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Convert amountPaid to float if it's the target field
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "amountPaid" ? value.replace(/[^0-9.]/g, "") : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (
      !formData.paymentId ||
      !formData.invoiceId ||
      !formData.orderId ||
      !formData.customerId ||
      !formData.amountPaid ||
      !formData.paymentDate
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);

      // Convert fields properly before sending
      const processedData = {
        ...formData,
        amountPaid: parseFloat(formData.amountPaid), // Convert amountPaid to float
        paymentDate: new Date(formData.paymentDate).toISOString(), // Convert to ISO format
      };

      const token = localStorage.getItem("token"); // Ensure token is fetched
      const response = await fetch(
        "http://localhost:7445/api/payment/create-payment",
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
        console.log("Payment created successfully:", data);
        setFormData({
          paymentId: "",
          invoiceId: "",
          orderId: "",
          customerId: "",
          amountPaid: "",
          paymentDate: "",
          paymentMode: "CASH",
        });
        navigate("/payment");
      } else {
        console.error("Error creating payment:", data);
        alert(data.message || "Error creating payment.");
      }
    } catch (error) {
      console.error("Request failed:", error);
      alert("Failed to create payment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>Create Payment</h2>

        <form onSubmit={handleSubmit}>
          {/* Header Box */}
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

          {/* Item Box */}
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
                  value={formData.paymentDate}
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

          {/* Submit Button */}
          <button type="submit" className="edit-btn" disabled={loading}>
            {loading ? "Processing..." : "Create Payment"}
          </button>
        </form>
      </div>
    </div>
  );
}
