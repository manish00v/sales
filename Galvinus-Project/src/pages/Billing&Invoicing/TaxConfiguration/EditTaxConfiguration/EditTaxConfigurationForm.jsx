import React, { useContext, useEffect, useState } from "react";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function EditTaxConfigurationForm() {
  const { setBtn, setUrl, setGoBackUrl } = useContext(FormPageHeaderContext);
  const navigate = useNavigate();
  const { taxId } = useParams();
  const token = localStorage.getItem("accessToken");

  // Get tax data from location state (if available)
  const taxData = useLocation().state?.taxData || {};
  console.log("Initial tax data:", taxData);

  const [formData, setFormData] = useState({
    taxId: taxData.taxId || "",
    invoiceId: taxData.invoiceId || "",
    orderId: taxData.orderId || "",
    customerId: taxData.customerId || "",
    region: taxData.region || "",
    taxType: taxData.taxType || "IGST",
    taxPercentage: taxData.taxPercentage || "",
  });

  // Handle input changes for all fields
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
      !formData.region ||
      !formData.taxType ||
      !formData.taxPercentage
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    // Validate that taxPercentage is a valid number
    const parsedTaxPercentage = parseFloat(formData.taxPercentage);
    if (isNaN(parsedTaxPercentage)) {
      alert("Tax Percentage must be a valid number.");
      return;
    }

    // Prepare data to be sent (ensure taxPercentage is a number)
    const updatedFormData = {
      ...formData,
      taxPercentage: parsedTaxPercentage,
    };

    try {
      const response = await fetch(
        `http://localhost:7445/api/tax/edit-tax/${taxId}`,
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
        alert("Tax updated successfully!");
        navigate("/taxconfiguration");
      } else {
        alert(`Error updating tax: ${data.error}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong! Please try again.");
    }
  };

  useEffect(() => {
    setBtn("Save");
    setUrl("/taxconfiguration");
    setGoBackUrl("/taxconfiguration");
  }, [setBtn, setUrl, setGoBackUrl]);

  return (
    <>
      <FormPageHeader />
      <div className="container">
        <div className="form-container">
          <h2>Edit Tax Configuration</h2>
          <form onSubmit={handleSubmit}>
            <div className="header-box">
              <h2>Header</h2>
              <div className="data-container">
                <div className="data">
                  <label htmlFor="taxId">Tax ID</label>
                  <input
                    type="text"
                    id="taxId"
                    name="taxId"
                    placeholder="(Primary Key)"
                    value={formData.taxId}
                    onChange={handleChange}
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
                  <label htmlFor="region">Region</label>
                  <input
                    type="text"
                    id="region"
                    name="region"
                    value={formData.region}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="data">
                  <label htmlFor="taxType">Tax Type</label>
                  <select
                    name="taxType"
                    id="taxType"
                    value={formData.taxType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Tax Type</option>
                    <option value="IGST">IGST</option>
                    <option value="CGST">CGST</option>
                    <option value="SGST">SGST</option>
                  </select>
                </div>
                <div className="data">
                  <label htmlFor="taxPercentage">Tax Percentage</label>
                  <input
                    type="text"
                    id="taxPercentage"
                    name="taxPercentage"
                    value={formData.taxPercentage}
                    onChange={handleChange}
                    required
                  />
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
