import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";

const EditDiscountPage = () => {
  const { setBtn, setGoBackUrl } = useContext(FormPageHeaderContext);
  const [discountId, setDiscountId] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate discountId
    if (!discountId) {
      setError("Discount ID is required");
      return;
    }

    if (isNaN(discountId)) {
      setError("Discount ID must be a number");
      return;
    }

    // If validation passes, navigate to the EditDiscountForm page
    navigate(`/editdiscountform/${discountId}`);
  };

  useEffect(() => {
    
    setGoBackUrl("/discount");
  }, [setBtn, setGoBackUrl]);

  return (
    <>
      <FormPageHeader />
      <div className="container">
        <div className="form-container">
          <h2>Edit Discount - Mandatory Details</h2>

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
              Edit Discount
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditDiscountPage;