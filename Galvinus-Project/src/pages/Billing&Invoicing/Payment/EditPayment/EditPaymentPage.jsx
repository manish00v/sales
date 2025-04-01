import React, { useContext, useEffect, useState } from "react";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";
import { useNavigate } from "react-router-dom";

const EditPaymentPage = () => {
  const { setGoBackUrl } = useContext(FormPageHeaderContext);
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

  const [formData, setFormData] = useState({
    paymentId: "",
  });

  // Correctly update paymentId using the input's name and value
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate that paymentId is non-empty
    if (!formData.paymentId.trim()) {
      alert("Please enter a valid Payment ID.");
      return;
    }

    if (!token) {
      alert("Unauthorized: Please log in again.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:7445/api/payment/get-payment?paymentId=${formData.paymentId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to fetch payment details."
        );
      }

      const data = await response.json();

      navigate(`/editpaymentpage/${formData.paymentId}`, {
        state: { paymentData: data },
      });
    } catch (error) {
      console.error("Error fetching payment:", error);
      alert(`Error: ${error.message}`);
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
          <h2>Edit Payment - Mandatory Details</h2>

          <form className="header-box" onSubmit={handleSubmit}>
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

export default EditPaymentPage;
