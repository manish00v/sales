import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";

const EditSalesOrderPage = () => {
  const { setBtn, setGoBackUrl } = useContext(FormPageHeaderContext);
  const [orderId, setorderId] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate salesOrderId
    if (!orderId) {
      setError("Sales Order ID is required");
      return;
    }

    if (isNaN(orderId)) {
      setError("Sales Order ID must be a number");
      return;
    }

    // If validation passes, navigate to the EditSalesOrderForm page
    navigate(`/editsalesorderform/${orderId}`);
  };

  useEffect(() => {
    setBtn("Edit");
    setGoBackUrl("/salesorders");
  }, [setBtn, setGoBackUrl]);

  return (
    <>
      <FormPageHeader />
      <div className="container">
        <div className="form-container">
          <h2>Edit Sales Order - Mandatory Details</h2>

          {/* Display error message if validation fails */}
          {error && <div className="error-message">{error}</div>}

          <form className="header-box" onSubmit={handleSubmit}>
            <div className="data-container">
              <div className="data">
                <label htmlFor="orderId">Sales Order ID</label>
                <input
                  type="number"
                  id="orderId"
                  name="orderId"
                  value={orderId}
                  onChange={(e) => setorderId(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="submit-btn">
              Edit Sales Order
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditSalesOrderPage;