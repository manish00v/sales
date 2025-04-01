import { useEffect, useContext, useState } from "react";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";
import { useNavigate } from "react-router-dom";

export default function DisplayReturnLineItemsPage() {
  const { setGoBackUrl } = useContext(FormPageHeaderContext);
  const [lineItemId, setLineItemId] = useState("");
  const [productId, setProductId] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setGoBackUrl("/returnlineitems");
  });

  const checkLineItemExists = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/return-line-items/${id}`);
      if (!response.ok) {
        return false;
      }
      return true;
    } catch (error) {
      console.error("Error checking line item existence:", error);
      return false;
    }
  };

  const checkProductExists = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/products/${id}`);
      if (!response.ok) {
        return false;
      }
      return true;
    } catch (error) {
      console.error("Error checking product existence:", error);
      return false;
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setError(null);
    
    try {
      if (!lineItemId || !productId) {
        throw new Error("Both Line Item ID and Product ID are required");
      }

      // 1. Check if line item exists
      const lineItemExists = await checkLineItemExists(lineItemId);
      if (!lineItemExists) {
        alert("Error: Line Item ID does not exist in the database");
        return;
      }

      // 2. Check if product exists
      const productExists = await checkProductExists(productId);
      if (!productExists) {
        alert("Error: Product ID does not exist in the database");
        return;
      }

      // 3. Check if product is associated with line item
      const associationResponse = await fetch(
        `http://localhost:3000/api/return-line-items/${lineItemId}/${productId}`
      );

      if (!associationResponse.ok) {
        alert("Error: This product is not associated with the specified line item");
        return;
      }

      const data = await associationResponse.json();
      navigate(`/displayreturnlineitemsform/${lineItemId}/${productId}`, { 
        state: { lineItem: data } 
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
          <h2>Display Return Line Items - Mandatory Details</h2>
          
          {error && <div className="error-message">{error}</div>}

          <form className="header-box" onSubmit={handleSearch}>
            <div className="data-container">
              <div className="data">
                <label htmlFor="lineItemId">Line Item ID*</label>
                <input
                  type="text"
                  id="lineItemId"
                  name="lineItemId"
                  value={lineItemId}
                  onChange={(e) => setLineItemId(e.target.value)}
                  required
                />
              </div>

              <div className="data">
                <label htmlFor="productId">Product ID*</label>
                <input
                  type="text"
                  id="productId"
                  name="productId"
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                  required
                />
              </div>
            </div>
            <button type="submit" className="submit-btn">
              Display Return Line Item
            </button>
          </form>
        </div>
      </div>
    </>
  );
}