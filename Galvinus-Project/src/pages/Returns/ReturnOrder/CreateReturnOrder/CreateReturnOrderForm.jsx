import React, { useState } from "react";
import "../../../../components/Layout/Styles/BoxFormStyles.css";

export default function CreateReturnOrderForm() {
  const [formData, setFormData] = useState({
    customerId: "",
    orderId: "",
    productId: "",
    orderDate: "",
    requiredDate: "",
    deliveryBlock: "",
    orderStatus: "pending",
    paymentStatus: "unpaid",
    total: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>Create Return</h2>

        <form>
          {/* Header Box */}
          <div className="header-box">
            <h2>Header</h2>

            <div className="data-container">
              <div className="data">
                <label htmlFor="returnOrderId">Return Order ID</label>
                <input
                  type="text"
                  id="returnOrderId"
                  name="returnOrderId"
                  placeholder="(Primary Key)"
                  value={formData.orderId}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="data">
                <label htmlFor="customerId">Customer ID</label>
                <input
                  type="text"
                  id="customerId"
                  name="customerId"
                  placeholder="(Foreign Key to Sales Order)"
                  value={formData.orderId}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="data">
                <label htmlFor="originalSalesOrderId">
                  Original Sales Order ID
                </label>
                <input
                  type="text"
                  id="originalSalesOrderId"
                  name="originalSalesOrderId"
                  value={formData.orderId}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="data">
                <label htmlFor="productId">Product ID</label>
                <input
                  type="text"
                  id="productId"
                  name="productId"
                  value={formData.orderId}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* Item Box */}
          <div className="item-box">
            <h2>Item</h2>

            <div className="data-container">
              <div className="data">
                <label htmlFor="returnDate">Return Date</label>
                <input
                  type="date"
                  id="returnDate"
                  name="returnDate"
                  value={formData.requiredDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="data">
                <label htmlFor="reasonForReturn">Reason for Return</label>
                <input
                  type="text"
                  id="reasonForReturn"
                  name="reasonForReturn"
                  value={formData.deliveryBlock}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="data">
                <label htmlFor="approvalStatus">Approval Status</label>
                <input
                  type="text"
                  id="approvalStatus"
                  name="approvalStatus"
                  value={formData.deliveryBlock}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="data">
                <label htmlFor="returnStatus">Return Status</label>
                <input
                  type="date"
                  id="returnStatus"
                  name="returnStatus"
                  value={formData.deliveryBlock}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="data">
                <label htmlFor="totalRefundAmount">Total Refund Amount</label>
                <input
                  type="date"
                  id="totalRefundAmount"
                  name="totalRefundAmount"
                  value={formData.deliveryBlock}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
