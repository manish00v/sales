import React, { useContext, useEffect, useState } from "react";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function EditInvoiceForm() {
  const { setBtn, setUrl, setGoBackUrl } = useContext(FormPageHeaderContext);
  const navigate = useNavigate();
  const { invoiceId } = useParams();
  const token = localStorage.getItem("accessToken");

  // Get invoice data from location state (if available)
  const invoiceData = useLocation().state?.invoiceData || {};
  console.log("Initial invoice data:", invoiceData);

  const [formData, setFormData] = useState({
    invoiceId: invoiceId || "",
    orderId: invoiceData.orderId || "",
    customerId: invoiceData.customerId || "",
    totalAmount: invoiceData.totalAmount || "",
    invoiceDate: invoiceData.invoiceDate || "",
    totalTax: invoiceData.totalTax || "",
    paymentStatus: invoiceData.paymentStatus || "PENDING",
  });

  // Handle input changes
  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "totalAmount" || name === "totalTax") {
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

    // Validate required fields
    if (
      !formData.orderId ||
      !formData.customerId ||
      !formData.totalAmount ||
      !formData.invoiceDate ||
      !formData.totalTax
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    // Validate numeric fields
    const parsedAmount = parseFloat(formData.totalAmount);
    const parsedTax = parseFloat(formData.totalTax);

    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      alert("Please enter a valid Total Amount.");
      return;
    }

    if (isNaN(parsedTax) || parsedTax < 0) {
      alert("Please enter a valid Tax amount.");
      return;
    }

    // Validate invoice date (should not be in the future)
    const currentDate = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
    // if (formData.invoiceDate > currentDate) {
    //   alert("Invoice date cannot be in the future.");
    //   return;
    // }

    const updatedFormData = {
      ...formData,
      totalAmount: parsedAmount,
      totalTax: parsedTax,
      invoiceDate: new Date(formData.invoiceDate).toISOString(),
    };

    try {
      const response = await fetch(
        `http://localhost:7445/api/invoice/edit-invoice/${invoiceId}`,
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
          data.error || data.message || "Failed to update invoice."
        );
      }

      alert("Invoice updated successfully!");
      navigate("/invoice");
    } catch (error) {
      console.error("Error:", error);
      alert(`Error updating invoice: ${error.message}`);
    }
  };

  useEffect(() => {
    setBtn("Save");
    setUrl("/invoice");
    setGoBackUrl("/invoice");
  }, [setBtn, setUrl, setGoBackUrl]);

  return (
    <>
      <FormPageHeader />

      <div className="container">
        <div className="form-container">
          <h2>Edit Invoice</h2>

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
                    value={
                      formData.invoiceDate
                        ? formData.invoiceDate.split("T")[0]
                        : ""
                    }
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="data">
                  <label htmlFor="totalAmount">Total Amount</label>
                  <input
                    type="text"
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
                    type="text"
                    id="totalTax"
                    name="totalTax"
                    value={formData.totalTax}
                    onChange={handleChange}
                    required
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
              Submit Edit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
