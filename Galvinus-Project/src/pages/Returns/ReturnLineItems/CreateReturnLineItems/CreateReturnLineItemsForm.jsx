import React, { useState } from "react";
import "../../../../components/Layout/Styles/BoxFormStyles.css";

export default function CreateReturnLineItemsForm() {
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
        <h2>Create Return Line Items</h2>

        <form>
          {/* Header Box */}
          <div className="header-box">
            <h2>Header</h2>

            <div className="data-container">
              <div className="data">
                <label htmlFor="lineItemId">Line Item ID</label>
                <input
                  type="text"
                  id="lineItemId"
                  name="lineItemId"
                  placeholder="(Primary Key)"
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

              <div className="data">
                <label htmlFor="productNameId">Product Name</label>
                <input
                  type="text"
                  id="productNameId"
                  name="productNameId"
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
                <label htmlFor="quantityReturned">Quantity Returned</label>
                <input
                  type="date"
                  id="quantityReturned"
                  name="quantityReturned"
                  value={formData.requiredDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="data">
                <label htmlFor="conditionOfProduct">Condition of Product</label>
                <input
                  type="text"
                  id="conditionOfProduct"
                  name="conditionOfProduct"
                  value={formData.deliveryBlock}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="data">
                <label htmlFor="originalPrice">Original Price</label>
                <input
                  type="date"
                  id="originalPrice"
                  name="originalPrice"
                  value={formData.deliveryBlock}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="data">
                <label htmlFor="refundAmount">Refund Amount</label>
                <input
                  type="date"
                  id="refundAmount"
                  name="refundAmount"
                  value={formData.deliveryBlock}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="data">
                <label htmlFor="replacementStatus">Replacement Status</label>
                <input
                  type="date"
                  id="replacementStatus"
                  name="replacementStatus"
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
