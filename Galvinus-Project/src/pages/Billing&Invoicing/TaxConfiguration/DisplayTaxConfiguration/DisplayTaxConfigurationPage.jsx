import React, { useEffect, useContext, useState } from "react";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";
import { useNavigate } from "react-router-dom";

export default function DisplayTaxConfigurationPage() {
  const { setGoBackUrl } = useContext(FormPageHeaderContext);
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

  const [formData, setFormData] = useState({
    taxId: "",
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
    if (!formData.taxId.trim() || !formData.invoiceId.trim()) {
      alert("Both Tax ID and Invoice ID are required.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:7445/api/tax/get-taxByInvoice?taxId=${formData.taxId}&invoiceId=${formData.invoiceId}`,
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
        console.log("Fetched tax:", data);
        // Navigate and pass data safely; use formData.taxId instead of taxId variable
        navigate(`/displaytaxconfigurationpage/${formData.taxId}`, {
          state: { taxData: data },
        });
      } else {
        console.log("Error fetching tax:", data?.error || "Unknown error");
        alert(`Error fetching tax: ${data?.message || "Unknown error"}`);
        // Reset taxId and invoiceId to allow new input
        setFormData({
          taxId: "",
          invoiceId: "",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Network error: Unable to fetch tax.");
    }
  };

  useEffect(() => {
    setGoBackUrl("/taxconfiguration");
  }, [setGoBackUrl]);

  return (
    <>
      <FormPageHeader />

      <div className="container">
        <div className="form-container">
          <h2>Display Tax Configuration - Mandatory Details</h2>

          <form className="header-box" onSubmit={handleSubmit}>
            <div className="data-container">
              <div className="data">
                <label htmlFor="taxId">Tax ID</label>
                <input
                  type="text"
                  id="taxId"
                  name="taxId"
                  value={formData.taxId}
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
                  value={formData.invoiceId}
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
