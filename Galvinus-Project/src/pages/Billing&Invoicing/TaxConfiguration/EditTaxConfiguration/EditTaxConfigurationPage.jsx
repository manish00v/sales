import React, { useContext, useEffect, useState } from "react";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";
import { useNavigate } from "react-router-dom";

const EditTaxConfigurationPage = () => {
  const { setGoBackUrl } = useContext(FormPageHeaderContext);
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

  const [formData, setFormData] = useState({
    taxId: "",
  });

  const handleChange = (e) => {
    setFormData({ taxId: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.taxId.trim()) {
      alert("Please enter a valid Tax ID.");
      return;
    }

    if (!token) {
      alert("Unauthorized: Please log in again.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:7445/api/tax/get-tax?taxId=${formData.taxId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch tax details.");
      }

      const data = await response.json();

      navigate(`/edittaxconfigurationpage/${formData.taxId}`, {
        state: { taxData: data },
      });
    } catch (error) {
      console.error("Error fetching tax:", error);
      alert(`Error: ${error.message}`);
    }
  };

  useEffect(() => {
    setGoBackUrl("/taxconfiguration");
  }, []);

  return (
    <>
      <FormPageHeader />
      <div className="container">
        <div className="form-container">
          <h2>Edit Tax Configuration - Mandatory Details</h2>

          <form className="header-box" onSubmit={handleSubmit}>
            <div className="data-container">
              <div className="data">
                <label htmlFor="taxId">Tax ID</label>
                <input
                  type="text"
                  id="taxId"
                  name="taxId"
                  placeholder="Enter Tax ID"
                  value={formData.taxId}
                  onChange={handleChange}
                  required
                />
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
};

export default EditTaxConfigurationPage;
