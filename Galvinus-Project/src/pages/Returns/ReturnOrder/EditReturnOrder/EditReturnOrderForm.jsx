import { useContext, useEffect, useState } from "react";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";
import { useLocation, useNavigate } from "react-router-dom";

export default function EditReturnOrderForm() {
  const { setBtn, setUrl, setGoBackUrl } = useContext(FormPageHeaderContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    returnOrderId: "",
    orderId: "",
    customerId: "",
    productId: "",
    reasonOfReturn: "",
    totalRefundAmount: "",
    returnDate: "",
    approvalStatus: "Pending",
    returnStatus: "Requested"
  });

  useEffect(() => {
    if (location.state?.returnOrder) {
      const { returnOrder } = location.state;
      setFormData({
        returnOrderId: returnOrder.returnOrderId,
        orderId: returnOrder.orderId,
        customerId: returnOrder.customerId,
        productId: returnOrder.productId,
        reasonOfReturn: returnOrder.reasonOfReturn,
        totalRefundAmount: returnOrder.totalRefundAmount.toString(),
        returnDate: returnOrder.returnDate.split('T')[0],
        approvalStatus: returnOrder.approvalStatus,
        returnStatus: returnOrder.returnStatus
      });
    }

   
    setUrl(""); // We'll handle submission manually
    setGoBackUrl("/returnorder");
  }, [location.state, setBtn, setGoBackUrl, setUrl]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:3000/api/return-orders/${formData.returnOrderId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            approvalStatus: formData.approvalStatus,
            returnStatus: formData.returnStatus,
            reasonOfReturn: formData.reasonOfReturn,
            totalRefundAmount: parseFloat(formData.totalRefundAmount),
            returnDate: formData.returnDate
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update return order");
      }

      alert("Return order updated successfully!");
      navigate("/returnorder");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <FormPageHeader />

      <div className="container">
        <div className="form-container">
          <h2>Edit Return Order</h2>
          
          {error && (
            <div className="error-message">
              <p>Error: {error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="header-box">
              <h2>Header</h2>

              <div className="data-container">
                <div className="data">
                  <label htmlFor="returnOrderId">Return Order ID</label>
                  <input
                    type="text"
                    id="returnOrderId"
                    name="returnOrderId"
                    value={formData.returnOrderId}
                    onChange={handleChange}
                    readOnly
                  />
                </div>

                <div className="data">
                  <label htmlFor="customerId">Customer ID</label>
                  <input
                    type="text"
                    id="customerId"
                    name="customerId"
                    value={formData.customerId}
                    onChange={handleChange}
                    readOnly
                  />
                </div>

                <div className="data">
                  <label htmlFor="orderId">Original Sales Order ID</label>
                  <input
                    type="text"
                    id="orderId"
                    name="orderId"
                    value={formData.orderId}
                    onChange={handleChange}
                    readOnly
                  />
                </div>

                <div className="data">
                  <label htmlFor="productId">Product ID</label>
                  <input
                    type="text"
                    id="productId"
                    name="productId"
                    value={formData.productId}
                    onChange={handleChange}
                    readOnly
                  />
                </div>
              </div>
            </div>

            <div className="item-box">
              <h2>Return Details</h2>

              <div className="data-container">
                <div className="data">
                  <label htmlFor="returnDate">Return Date</label>
                  <input
                    type="date"
                    id="returnDate"
                    name="returnDate"
                    value={formData.returnDate}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="data">
                  <label htmlFor="reasonOfReturn">Reason for Return</label>
                  <input
                    type="text"
                    id="reasonOfReturn"
                    name="reasonOfReturn"
                    value={formData.reasonOfReturn}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="data">
                  <label htmlFor="approvalStatus">Approval Status</label>
                  <select
                    id="approvalStatus"
                    name="approvalStatus"
                    value={formData.approvalStatus}
                    onChange={handleChange}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>

                <div className="data">
                  <label htmlFor="returnStatus">Return Status</label>
                  <select
                    id="returnStatus"
                    name="returnStatus"
                    value={formData.returnStatus}
                    onChange={handleChange}
                  >
                    <option value="Requested">Requested</option>
                    <option value="Processing">Processing</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>

                <div className="data">
                  <label htmlFor="totalRefundAmount">Total Refund Amount</label>
                  <input
                    type="number"
                    id="totalRefundAmount"
                    name="totalRefundAmount"
                    step="0.01"
                    min="0"
                    value={formData.totalRefundAmount}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            <button type="submit" className="submit-btn">
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </>
  );
}