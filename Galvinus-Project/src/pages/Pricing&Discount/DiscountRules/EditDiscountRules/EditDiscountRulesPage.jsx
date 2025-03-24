import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";

const EditDiscountRulesPage = () => {
  const { setBtn, setGoBackUrl } = useContext(FormPageHeaderContext);
  const [discountId, setDiscountId] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate discountId
    if (!discountId) {
      setError("Discount ID is required");
      return;
    }

    try {
      // Check if discountId exists in the database
      const response = await fetch(`http://localhost:3001/api/discount-rules/${discountId}`);
      if (!response.ok) {
        // If discountId is not found, show an alert
        alert(`Discount ID ${discountId} does not exist in the database.`);
        return;
      }

      // If discountId exists, navigate to the EditDiscountRulesForm page
      navigate(`/editdiscountrulesform/${discountId}`);
    } catch (error) {
      console.error("Error checking discount ID:", error);
      alert("An error occurred while checking the discount ID. Please try again.");
    }
  };

  useEffect(() => {
  
    setGoBackUrl("/discountrules");
  }, [setBtn, setGoBackUrl]);

  return (
    <>
      <FormPageHeader />
      <div className="container">
        <div className="form-container">
          <h2>Edit Discount Rules - Mandatory Details</h2>

          {/* Display error message if validation fails */}
          {error && <div className="error-message">{error}</div>}

          <form className="header-box" onSubmit={handleSubmit}>
            <div className="data-container">
              <div className="data">
                <label htmlFor="discountId">Discount ID</label>
                <input
                  type="text"
                  id="discountId"
                  name="discountId"
                  value={discountId}
                  onChange={(e) => setDiscountId(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="submit-btn">
              Edit Discount Rule
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditDiscountRulesPage;