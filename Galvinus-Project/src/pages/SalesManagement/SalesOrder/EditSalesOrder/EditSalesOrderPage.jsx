import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";

const EditSalesOrderPage = () => {
  const { setGoBackUrl } = useContext(FormPageHeaderContext);
  const [orderId, setOrderId] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate salesOrderId
    if (!orderId) {
      setError("Sales Order ID is required");
      return;
    }

    try {
      // Check if orderId exists in the order table
      const response = await fetch(`http://localhost:3000/api/sales-orders/${orderId}`);
      if (!response.ok) {
        // If orderId does not exist, show an alert
        alert(`Order ID ${orderId} does not exist in the database. Please create the order ID first.`);
        return;
      }

      // If orderId exists, navigate to the EditSalesOrderForm page
      navigate(`/editsalesorderform/${orderId}`);
    } catch (error) {
      console.error("Error checking order ID:", error);
      alert("An error occurred while validating the Order ID. Please try again.");
    }
  };

  useEffect(() => {
    setGoBackUrl("/salesorder");
  }, [setGoBackUrl]);

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
                  type="text"
                  id="orderId"
                  name="orderId"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
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