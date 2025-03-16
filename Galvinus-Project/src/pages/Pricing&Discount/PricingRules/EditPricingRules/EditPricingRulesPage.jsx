import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";

const EditPricingRulesPage = () => {
  const { setBtn, setGoBackUrl } = useContext(FormPageHeaderContext);
  const [ruleId, setRuleId] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate ruleId
    if (!ruleId) {
      setError("Rule ID is required");
      return;
    }

    if (isNaN(ruleId)) {
      setError("Rule ID must be a number");
      return;
    }

    // If validation passes, navigate to the EditPricingRulesForm page
    navigate(`/editpricingrulesform/${ruleId}`);
  };

  useEffect(() => {
    setBtn("Edit");
    setGoBackUrl("/pricingrules");
  }, [setBtn, setGoBackUrl]);

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