import { useContext, useEffect, useState } from "react";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";
import { useLocation } from "react-router-dom";

export default function DisplayReturnOrderForm() {
  const { setBtn, setGoBackUrl } = useContext(FormPageHeaderContext);
  const location = useLocation();
  const [returnOrder, setReturnOrder] = useState(null);

  useEffect(() => {
    if (location.state?.returnOrder) {
      setReturnOrder(location.state.returnOrder);
    }

    setBtn("NoBtn");
    setGoBackUrl("/returnorder");
  }, [location.state, setBtn, setGoBackUrl]);

  if (!returnOrder) {
    return (
      <div className="container">
        <div className="form-container">
          <p>Loading return order details...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <FormPageHeader />

      <div className="container">
        <div className="form-container">
          <h2>Display Return Order</h2>

          <div className="header-box">
            <h2>Header</h2>

            <form>
              <div className="data-container">
                <div className="data">
                  <label htmlFor="returnOrderId">Return Order ID</label>
                  <input
                    type="text"
                    id="returnOrderId"
                    name="returnOrderId"
                    value={returnOrder.returnOrderId}
                    disabled
                  />
                </div>

                <div className="data">
                  <label htmlFor="customerId">Customer ID</label>
                  <input
                    type="text"
                    id="customerId"
                    name="customerId"
                    value={returnOrder.customerId}
                    disabled
                  />
                </div>

                <div className="data">
                  <label htmlFor="orderId">Original Sales Order ID</label>
                  <input
                    type="text"
                    id="orderId"
                    name="orderId"
                    value={returnOrder.orderId}
                    disabled
                  />
                </div>

                <div className="data">
                  <label htmlFor="productId">Product ID</label>
                  <input
                    type="text"
                    id="productId"
                    name="productId"
                    value={returnOrder.productId}
                    disabled
                  />
                </div>
              </div>
            </form>
          </div>

          <div className="item-box">
            <h2>Item</h2>

            <form>
              <div className="data-container">
                <div className="data">
                  <label htmlFor="returnDate">Return Date</label>
                  <input
                    type="date"
                    id="returnDate"
                    name="returnDate"
                    value={returnOrder.returnDate.split('T')[0]}
                    disabled
                  />
                </div>

                <div className="data">
                  <label htmlFor="reasonOfReturn">Reason for Return</label>
                  <input
                    type="text"
                    id="reasonOfReturn"
                    name="reasonOfReturn"
                    value={returnOrder.reasonOfReturn}
                    disabled
                  />
                </div>

                <div className="data">
                  <label htmlFor="approvalStatus">Approval Status</label>
                  <input
                    type="text"
                    id="approvalStatus"
                    name="approvalStatus"
                    value={returnOrder.approvalStatus}
                    disabled
                  />
                </div>

                <div className="data">
                  <label htmlFor="returnStatus">Return Status</label>
                  <input
                    type="text"
                    id="returnStatus"
                    name="returnStatus"
                    value={returnOrder.returnStatus}
                    disabled
                  />
                </div>

                <div className="data">
                  <label htmlFor="totalRefundAmount">Total Refund Amount</label>
                  <input
                    type="number"
                    id="totalRefundAmount"
                    name="totalRefundAmount"
                    value={returnOrder.totalRefundAmount}
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