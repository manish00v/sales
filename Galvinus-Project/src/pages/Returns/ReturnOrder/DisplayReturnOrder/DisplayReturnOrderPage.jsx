import { useEffect, useContext, useState } from "react";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";
import { useNavigate } from "react-router-dom";

export default function DisplayReturnOrderPage() {
  const { setGoBackUrl } = useContext(FormPageHeaderContext);
  const [returnOrderId, setReturnOrderId] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setGoBackUrl("/returnorder");
  });

  const checkEntityExists = async (entityType, id) => {
    try {
      let endpoint = '';
      switch (entityType) {
        case 'returnOrder':
          endpoint = `http://localhost:3000/api/return-orders/${id}`;
          break;
        case 'customer':
          endpoint = `http://localhost:3000/api/customers/${id}`;
          break;
        default:
          return false;
      }
      const response = await fetch(endpoint);
      return response.ok;
    } catch (error) {
      console.error(`Error checking ${entityType} existence:`, error);
      return false;
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setError(null);
    
    try {
      if (!returnOrderId || !customerId) {
        throw new Error("Both Return Order ID and Customer ID are required");
      }

      // 1. Check if return order exists
      const returnOrderExists = await checkEntityExists('returnOrder', returnOrderId);
      if (!returnOrderExists) {
        alert("Error: Return Order ID does not exist in the database");
        return;
      }

      // 2. Check if customer exists
      const customerExists = await checkEntityExists('customer', customerId);
      if (!customerExists) {
        alert("Error: Customer ID does not exist in the database");
        return;
      }

      // 3. Check if customer is associated with return order
      const response = await fetch(
        `http://localhost:3000/api/return-orders/${returnOrderId}/${customerId}`
      );

      if (!response.ok) {
        alert("Error: This customer is not associated with the specified return order");
        return;
      }

      const data = await response.json();
      navigate(`/displayreturnorderform/${returnOrderId}/${customerId}`, { 
        state: { returnOrder: data } 
      });

    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <FormPageHeader />

      <div className="container">
        <div className="form-container">
          <h2>Display Return Order - Mandatory Details</h2>
          
          {error && <div className="error-message">{error}</div>}

          <form className="header-box" onSubmit={handleSearch}>
            <div className="data-container">
              <div className="data">
                <label htmlFor="returnOrderId">Return Order ID*</label>
                <input
                  type="text"
                  id="returnOrderId"
                  name="returnOrderId"
                  value={returnOrderId}
                  onChange={(e) => setReturnOrderId(e.target.value)}
                  required
                />
              </div>

              <div className="data">
                <label htmlFor="customerId">Customer ID*</label>
                <input
                  type="text"
                  id="customerId"
                  name="customerId"
                  value={customerId}
                  onChange={(e) => setCustomerId(e.target.value)}
                  required
                />
              </div>
            </div>
            <button type="submit" className="submit-btn">
              Display Return Order
            </button>
          </form>
        </div>
      </div>
    </>
  );
}