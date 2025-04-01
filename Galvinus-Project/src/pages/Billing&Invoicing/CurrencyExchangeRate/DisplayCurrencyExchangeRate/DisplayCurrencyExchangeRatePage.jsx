import React, { useEffect, useContext, useState } from "react";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";
import { useNavigate } from "react-router-dom";

export default function DisplayCurrencyExchangeRatePage() {
  const { setGoBackUrl } = useContext(FormPageHeaderContext);
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

  const [formData, setFormData] = useState({
    orderId: "",
    invoiceId: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false); // Prevent multiple submissions

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    if (!token) {
      setErrorMessage("Authentication token missing. Please log in.");
      setLoading(false);
      return;
    }

    console.log(
      "Sending API Request with:",
      formData.orderId,
      formData.invoiceId
    ); // 🔍 Debug log

    try {
      const response = await fetch(
        `http://localhost:7445/api/currency/get-currencyExchangeByOrder?orderId=${formData.orderId}&invoiceId=${formData.invoiceId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Response Status:", response.status); // 🔍 Debug log

      let data;
      try {
        data = await response.json();
      } catch (jsonError) {
        console.error("Invalid JSON response:", jsonError);
        setErrorMessage("Server error: Invalid response format.");
        setLoading(false);
        return;
      }

      if (response.ok && data) {
        console.log("Fetched currency:", data);
        navigate(`/displaycurrencyexchangeratepage/${formData.invoiceId}`, {
          state: { currencyData: data },
        });
      } else {
        console.log("Error fetching currency:", data?.error || "Unknown error");
        setErrorMessage(`Error: ${data?.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Network error: Unable to fetch currency.");
    }

    setLoading(false);
  };

  useEffect(() => {
    setGoBackUrl("/currencyexchangerate");
  }, [setGoBackUrl]);

  return (
    <>
      <FormPageHeader />
      <div className="container">
        <div className="form-container">
          <h2>Display Currency Exchange Rate - Mandatory Details</h2>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
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

            <button type="submit" disabled={loading} className="edit-btn">
              {loading ? "Loading..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
