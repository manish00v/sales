import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";

export default function EditSalesOrderForm() {
  const { setBtn, setUrl, setGoBackUrl } = useContext(FormPageHeaderContext);
  const { orderId } = useParams(); // Use orderId from URL params
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    orderId: "",
    customerId: "",
    productId: "",
    orderDate: "",
    requiredDate: "",
    deliveryBlock: "",
    orderStatus: "",
    paymentStatus: "",
    totalAmount: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch sales order details when the component mounts
  useEffect(() => {
    const fetchSalesOrder = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/sales-orders/${orderId}`
        );
        if (!response.ok) {
          throw new Error("Sales order not found");
        }
        const data = await response.json();
        setFormData({
          orderId: data.orderId,
          customerId: data.customerId,
          productId: data.productId,
          orderDate: data.orderDate.split("T")[0], // Extract date part
          requiredDate: data.requiredDate.split("T")[0], // Extract date part
          deliveryBlock: data.deliveryBlock,
          orderStatus: data.orderStatus,
          paymentStatus: data.paymentStatus,
          totalAmount: data.totalAmount,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSalesOrder();
  }, [orderId]);

  useEffect(() => {
    setBtn("Save");
    setUrl(`/salesorder/${orderId}`);
    setGoBackUrl("/salesorder");
  }, [setBtn, setUrl, setGoBackUrl, orderId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
		// Format data for submission
		const formattedData = {
		  customerId: parseInt(formData.customerId), // Convert to number if necessary
		  productId: formData.productId,
		  orderDate: new Date(formData.orderDate).toISOString(), // Ensure proper date format
		  requiredDate: new Date(formData.requiredDate).toISOString(), // Ensure proper date format
		  deliveryBlock: formData.deliveryBlock,
		  orderStatus: formData.orderStatus,
		  paymentStatus: formData.paymentStatus,
		  totalAmount: parseFloat(formData.totalAmount), // Convert to number
		};
	
      const response = await fetch(
        `http://localhost:3000/api/sales-orders/${orderId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formattedData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update sales order");
      }

      const result = await response.json();
      console.log("Sales order updated successfully:", result);

      // Navigate back to the sales orders list page
      navigate("/salesorder");
    } catch (err) {
      console.error("Error updating sales order:", err);
      setError(err.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <FormPageHeader />

      <div className="container">
        <div className="form-container">
          <h2>Edit Sales Order</h2>

          {/* Display error message if any */}
          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit}>
            {/* Header Box */}
            <div className="header-box">
              <h2>Header</h2>

              <div className="data-container">
                <div className="data">
                  <label htmlFor="orderId">Order ID</label>
                  <input
                    type="number"
                    id="orderId"
                    name="orderId"
                    value={formData.orderId}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="data">
                  <label htmlFor="customerId">Customer ID</label>
                  <input
                    type="number"
                    id="customerId"
                    name="customerId"
                    value={formData.customerId}
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
                    value={formData.productId}
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
                  <label htmlFor="orderDate">Order Date</label>
                  <input
                    type="date"
                    id="orderDate"
                    name="orderDate"
                    value={formData.orderDate}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="data">
                  <label htmlFor="requiredDate">Required Date</label>
                  <input
                    type="date"
                    id="requiredDate"
                    name="requiredDate"
                    value={formData.requiredDate}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="data">
                  <label htmlFor="deliveryBlock">Delivery Block</label>
                  <input
                    type="text"
                    id="deliveryBlock"
                    name="deliveryBlock"
                    value={formData.deliveryBlock}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="data">
                  <label htmlFor="orderStatus">Order Status</label>
                  <select
                    id="orderStatus"
                    name="orderStatus"
                    value={formData.orderStatus}
                    onChange={handleChange}
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                <div className="data">
                  <label htmlFor="paymentStatus">Payment Status</label>
                  <select
                    id="paymentStatus"
                    name="paymentStatus"
                    value={formData.paymentStatus}
                    onChange={handleChange}
                  >
                    <option value="unpaid">Unpaid</option>
                    <option value="partiallyPaid">Partially Paid</option>
                    <option value="fullyPaid">Fully Paid</option>
                  </select>
                </div>

                <div className="data">
                  <label htmlFor="totalAmount">Total</label>
                  <input
                    type="float"
                    id="totalAmount"
                    name="totalAmount"
                    value={formData.totalAmount}
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