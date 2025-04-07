import { useContext, useEffect, useState } from "react";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";
import { useLocation } from "react-router-dom";

export default function DisplayReturnLineItemsForm() {
  const { setBtn, setGoBackUrl } = useContext(FormPageHeaderContext);
  const location = useLocation();
  const [lineItem, setLineItem] = useState(null);

  useEffect(() => {
    if (location.state?.lineItem) {
      setLineItem(location.state.lineItem);
    }

    setBtn("NoBtn");
    setGoBackUrl("/returnlineitems");
  }, [location.state, setBtn, setGoBackUrl]);

  const formatCurrency = (value) => {
    return value ? `$${parseFloat(value).toFixed(2)}` : "$0.00";
  };

  if (!lineItem) {
    return (
      <div className="container">
        <div className="form-container">
          <p>Loading return line item details...</p>
        </div>
      </div>
    );
  }
  // Debugging: Log the values we're trying to display
  console.log("Original Price:", lineItem.originalPrice);
  console.log("Refund Amount:", lineItem.refundAmount);
  return (
    <>
      <FormPageHeader />

      <div className="container">
        <div className="form-container">
          <h2>Display Return Line Items</h2>

          <div className="header-box">
            <h3>Header Information</h3>
            <form>
              <div className="data-container">
                <div className="data">
                  <label htmlFor="lineItemId">Line Item ID</label>
                  <input
                    type="text"
                    id="lineItemId"
                    name="lineItemId"
                    value={lineItem.lineItemId || "N/A"}
                    disabled
                  />
                </div>

                <div className="data">
                  <label htmlFor="productId">Product ID</label>
                  <input
                    type="text"
                    id="productId"
                    name="productId"
                    value={lineItem.productId || "N/A"}
                    disabled
                  />
                </div>

                <div className="data">
                  <label htmlFor="productName">Product Name</label>
                  <input
                    type="text"
                    id="productName"
                    name="productName"
                    value={lineItem.productName || "N/A"}
                    disabled
                  />
                </div>
              </div>
            </form>
          </div>

          <div className="item-box">
            <h3>Item Details</h3>
            <form>
              <div className="data-container">
                <div className="data">
                  <label htmlFor="quantityReturned">Quantity Returned</label>
                  <input
                    type="number"
                    id="quantityReturned"
                    name="quantityReturned"
                    value={lineItem.quantityReturned || 0}
                    disabled
                  />
                </div>

                
                <div className="data">
                  <label htmlFor="conditionOfProduct">Condition of Product</label>
                  <input
                    type="text"
                    id="conditionOfProduct"
                    name="conditionOfProduct"
                    value={lineItem.conditionOfProduct || "Not specified"}
                    disabled
                  />
                </div>

				<div className="data">
                  <label htmlFor="originalPrice">Original Price</label>
                  <input
                    type="text"  // Changed from number to text to handle currency formatting
                    id="originalPrice"
                    name="originalPrice"
                    value={formatCurrency(lineItem.originalPrice || lineItem.OriginalPrice || 0)}
                    disabled
                  />
                </div>

                <div className="data">
                  <label htmlFor="refundAmount">Refund Amount</label>
                  <input
                    type="text"  // Changed from number to text to handle currency formatting
                    id="refundAmount"
                    name="refundAmount"
                    value={formatCurrency(lineItem.refundAmount || lineItem.RefundAmount || 0)}
                    disabled
                  />
                </div>


                <div className="data">
                  <label htmlFor="replacementStatus">Replacement Status</label>
                  <input
                    type="text"
                    id="replacementStatus"
                    name="replacementStatus"
                    value={lineItem.replacementStatus || "Pending"}
                    disabled
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}