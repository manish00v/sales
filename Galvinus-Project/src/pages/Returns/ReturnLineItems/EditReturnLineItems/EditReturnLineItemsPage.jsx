import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";

const EditReturnLineItemsPage = () => {
  const { setGoBackUrl } = useContext(FormPageHeaderContext);
  const [lineItemId, setLineItemId] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!lineItemId) {
      setError("Line Item ID is required");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/return-line-items/${lineItemId}`);
      if (!response.ok) {
        alert(`Line Item ID ${lineItemId} does not exist.`);
        return;
      }
      navigate(`/editreturnlineitemsform/${lineItemId}`);
    } catch (error) {
      console.error("Validation error:", error);
      alert("An error occurred during validation. Please try again.");
    }
  };

  useEffect(() => {
    setGoBackUrl("/returnlineitems");
  }, [setGoBackUrl]);

  return (
    <>
      <FormPageHeader />
      <div className="container">
        <div className="form-container">
          <h2>Edit Return Line Items - Mandatory Details</h2>

          {error && <div className="error-message">{error}</div>}

          <form className="header-box" onSubmit={handleSubmit}>
            <div className="data-container">
              <div className="data">
                <label htmlFor="lineItemId">Line Item ID</label>
                <input
                  type="text"
                  id="lineItemId"
                  name="lineItemId"
                  value={lineItemId}
                  onChange={(e) => setLineItemId(e.target.value)}
                  placeholder="(Primary Key)"
                  required
                />
              </div>
            </div>

            <button type="submit" className="submit-btn">
              Edit Return Line Item
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditReturnLineItemsPage;