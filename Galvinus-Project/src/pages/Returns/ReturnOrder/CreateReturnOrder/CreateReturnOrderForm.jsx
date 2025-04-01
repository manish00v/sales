import { useState } from "react";
import "../../../../components/Layout/Styles/BoxFormStyles.css";

export default function CreateReturnOrderForm() {
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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const checkEntityExists = async (entityType, id) => {
    try {
      let endpoint = '';
      switch (entityType) {
        case 'order':
          endpoint = `http://localhost:3000/api/sales-orders/${id}`;
          break;
        case 'customer':
          endpoint = `http://localhost:3000/api/customers/${id}`;
          break;
        case 'product':
          endpoint = `http://localhost:3001/api/products/${id}`;
          break;
        case 'returnOrder':
          endpoint = `http://localhost:3000/api/return-orders/${id}`;
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Validate required fields
      const requiredFields = ['returnOrderId', 'orderId', 'customerId', 'productId'];
      const missingFields = requiredFields.filter(field => !formData[field]);
      
      if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
      }

      // Check if return order ID already exists
      const returnOrderExists = await checkEntityExists('returnOrder', formData.returnOrderId);
      if (returnOrderExists) {
        alert("Error: Return Order ID already exists in the database");
        setIsSubmitting(false);
        return;
      }

      // Check if order exists
      const orderExists = await checkEntityExists('order', formData.orderId);
      if (!orderExists) {
        alert("Error: Order ID does not exist in the database");
        setIsSubmitting(false);
        return;
      }

      // Check if customer exists
      const customerExists = await checkEntityExists('customer', formData.customerId);
      if (!customerExists) {
        alert("Error: Customer ID does not exist in the database");
        setIsSubmitting(false);
        return;
      }

      // Check if product exists
      const productExists = await checkEntityExists('product', formData.productId);
      if (!productExists) {
        alert("Error: Product ID does not exist in the database");
        setIsSubmitting(false);
        return;
      }

      // Prepare data for submission
      const submissionData = {
        returnOrderId: formData.returnOrderId,
        orderId: formData.orderId,
        customerId: formData.customerId,
        productId: formData.productId,
        reasonOfReturn: formData.reasonOfReturn,
        totalRefundAmount: parseFloat(formData.totalRefundAmount) || 0,
        returnDate: formData.returnDate || new Date().toISOString().split('T')[0],
        approvalStatus: formData.approvalStatus,
        returnStatus: formData.returnStatus
      };

      // Create return order
      const response = await fetch("http://localhost:3000/api/return-orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create return order");
      }

      const result = await response.json();
      alert("Return order created successfully!");
      console.log("Created return order:", result);

      // Reset form
      setFormData({
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

    } catch (error) {
      console.error("Creation error:", error);
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

 

  return (
    <div className="container">
      <div className="form-container">
        <h2>Create Return Order</h2>
        
        {error && (
          <div className="error-message">
            <p>Error: {error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Header Box */}
          <div className="header-box">
            <h2>Header</h2>

            <div className="data-container">
              <div className="data">
                <label htmlFor="returnOrderId">Return Order ID*</label>
                <input
                  type="text"
                  id="returnOrderId"
                  name="returnOrderId"
                  value={formData.returnOrderId}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="data">
                <label htmlFor="orderId">Original Sales Order ID*</label>
                <input
                  type="text"
                  id="orderId"
                  name="orderId"
                  value={formData.orderId}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="data">
                <label htmlFor="customerId">Customer ID*</label>
                <input
                  type="text"
                  id="customerId"
                  name="customerId"
                  value={formData.customerId}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="data">
                <label htmlFor="productId">Product ID*</label>
                <input
                  type="text"
                  id="productId"
                  name="productId"
                  value={formData.productId}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* Item Box */}
          <div className="item-box">
            <h2>Return Details</h2>

            <div className="data-container">
              <div className="data">
                <label htmlFor="reasonOfReturn">Reason for Return*</label>
                <select
                  id="reasonOfReturn"
                  name="reasonOfReturn"
                  value={formData.reasonOfReturn}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select reason</option>
                  <option value="defective">Defective Product</option>
                  <option value="wrong_item">Wrong Item Received</option>
                  <option value="no_longer_needed">No Longer Needed</option>
                  <option value="changed_mind">Changed Mind</option>
                </select>
              </div>

              <div className="data">
                <label htmlFor="totalRefundAmount">Total Refund Amount*</label>
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

              <div className="data">
                <label htmlFor="returnDate">Return Date</label>
                <input
                  type="date"
                  id="returnDate"
                  name="returnDate"
                  value={formData.returnDate || new Date().toISOString().split('T')[0]}
                  onChange={handleChange}
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
            </div>
          </div>

          {/* Submit Button */}
          <div className="submit-button">
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Create Return Order'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}