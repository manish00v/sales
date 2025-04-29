import React, { useEffect, useContext, useState } from "react";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";
import { useNavigate } from "react-router-dom";

export default function DisplayInvoicePage() {
  const { setGoBackUrl } = useContext(FormPageHeaderContext);
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

  const [formData, setFormData] = useState({
    orderId: "",
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
    if (!formData.orderId.trim() || !formData.invoiceId.trim()) {
      alert("Both Order ID and Invoice ID are required.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:7445/api/invoice/get-invoiceByOrder?orderId=${formData.orderId}&invoiceId=${formData.invoiceId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Ensure response is valid JSON
      let data;
      try {
        data = await response.json();
      } catch (jsonError) {
        console.error("Invalid JSON response:", jsonError);
        alert("Server error: Invalid response format");
        return;
      }

      if (response.ok) {
        console.log("Fetched invoice:", data);
        // Navigate and pass data safely; use formData.invoiceId instead of invoiceId variable
        navigate(`/displayinvoicepage/${formData.invoiceId}`, {
          state: { invoiceData: data },
        });
      } else {
        console.log("Error fetching invoice:", data?.error || "Unknown error");
        alert(`Error fetching invoice: ${data?.message || "Unknown error"}`);
        // Reset invoiceId and invoiceId to allow new input
        setFormData({
          orderId: "",
          invoiceId: "",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Network error: Unable to fetch tax.");
    }
  };

  useEffect(() => {
    setGoBackUrl("/invoice");
  }, [setGoBackUrl]);

  return (
    <>
      <FormPageHeader />

      <div className="container">
        <div className="form-container">
          <h2>Display Invoice - Mandatory Details</h2>

          <form className="header-box" onSubmit={handleSubmit}>
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
            </div>
            <button type="submit" className="edit-btn">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
