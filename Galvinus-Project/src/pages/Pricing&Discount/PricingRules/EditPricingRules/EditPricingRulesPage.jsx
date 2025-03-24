import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";

const EditPricingRulesPage = () => {
  const { setGoBackUrl } = useContext(FormPageHeaderContext);
  const [ruleId, setRuleId] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate ruleId
    if (!ruleId) {
      setError("Rule ID is required");
      return;
    }

    try {
      // Check if ruleId exists in the database
      const response = await fetch(`http://localhost:3001/api/pricing-rules/${ruleId}`);
      if (!response.ok) {
        // If ruleId is not found, show an alert
        alert(`Rule ID ${ruleId} does not exist in the database.`);
        return;
      }

      // If ruleId exists, navigate to the EditPricingRulesForm page
      navigate(`/editpricingrulesform/${ruleId}`);
    } catch (error) {
      console.error("Error checking rule ID:", error);
      alert("An error occurred while checking the rule ID. Please try again.");
    }
  };

  useEffect(() => {
    setGoBackUrl("/pricingrules");
  }, [setGoBackUrl]);

  return (
    <>
      <FormPageHeader />
      <div className="container">
        <div className="form-container">
          <h2>Edit Pricing Rules - Mandatory Details</h2>

          {/* Display error message if validation fails */}
          {error && <div className="error-message">{error}</div>}

          <form className="header-box" onSubmit={handleSubmit}>
            <div className="data-container">
              <div className="data">
                <label htmlFor="ruleId">Rule ID</label>
                <input
                  type="text"
                  id="ruleId"
                  name="ruleId"
                  value={ruleId}
                  onChange={(e) => setRuleId(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="submit-btn">
              Edit Pricing Rule
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditPricingRulesPage;