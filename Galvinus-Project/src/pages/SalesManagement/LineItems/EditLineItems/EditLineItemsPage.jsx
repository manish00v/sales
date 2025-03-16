import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";

const EditLineItemsPage = () => {
  const { setBtn, setGoBackUrl } = useContext(FormPageHeaderContext);
  const [orderLineItemId, setOrderLineItemId] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate orderLineItemsId
    if (!orderLineItemId) {
      setError("Order Line Items ID is required");
      return;
    }

    if (isNaN(orderLineItemId)) {
      setError("Order Line Items ID must be a number");
      return;
    }

    // If validation passes, navigate to the EditLineItemsForm page
    navigate(`/editlineitemsform/${orderLineItemId}`);
  };

  useEffect(() => {
    setBtn("Edit");
    setGoBackUrl("/lineitems");
  }, [setBtn, setGoBackUrl]);

  return (
    <>
      <FormPageHeader />
      <div className="container">
        <div className="form-container">
          <h2>Edit Line Items - Mandatory Details</h2>

          {/* Display error message if validation fails */}
          {error && <div className="error-message">{error}</div>}

          <form className="header-box" onSubmit={handleSubmit}>
            <div className="data-container">
              <div className="data">
                <label htmlFor="orderLineItemId">Order Line Items ID</label>
                <input
                  type="number"
                  id="orderLineItemId"
                  name="orderLineItemId"
                  value={orderLineItemId}
                  onChange={(e) => setOrderLineItemId(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="submit-btn">
              Edit Line Items
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditLineItemsPage;