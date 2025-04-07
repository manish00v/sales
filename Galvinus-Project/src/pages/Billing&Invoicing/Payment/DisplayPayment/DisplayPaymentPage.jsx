import React, { useEffect, useContext, useState } from "react";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";
import { useNavigate } from "react-router-dom";

export default function DisplayPaymentPage() {
  const { setGoBackUrl } = useContext(FormPageHeaderContext);
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

  const [formData, setFormData] = useState({
    paymentId: "",
    invoiceId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic check for token and fields
    if (!token) {
      alert("Authentication token missing. Please log in.");
      return;
    }
    if (!formData.paymentId.trim() || !formData.invoiceId.trim()) {
      alert("Both Payment ID and Invoice ID are required.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:7445/api/payment/get-paymentByInvoice?paymentId=${formData.paymentId}&invoiceId=${formData.invoiceId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      let data;
      try {
        data = await response.json();
      } catch (jsonError) {
        console.error("Invalid JSON response:", jsonError);
        alert("Server error: Invalid response format");
        return;
      }

      if (response.ok && data) {
        console.log("Fetched payment:", data);
        navigate(`/displaypaymentpage/${formData.paymentId}`, {
          state: { paymentData: data },
        });
      } else {
        console.log("Error fetching payment:", data?.error || "Unknown error");
        alert(`Error fetching payment: ${data?.message || "Unknown error"}`);
        setFormData({ paymentId: "", invoiceId: "" }); // Reset fields
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Network error: Unable to fetch payment.");
    }
  };

  useEffect(() => {
    setGoBackUrl("/payment");
  }, [setGoBackUrl]);

  return (
    <>
      <FormPageHeader />

      <div className="container">
        <div className="form-container">
          <h2>Display Payment - Mandatory Details</h2>

          <form className="header-box" onSubmit={handleSubmit}>
            <div className="data-container">
              <div className="data">
                <label htmlFor="paymentId">Payment ID</label>
                <input
                  type="text"
                  id="paymentId"
                  name="paymentId"
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
                  value={formData.invoiceId} // ✅ Fixed issue here
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <button type="submit" className="edit-btn">
              Display
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
