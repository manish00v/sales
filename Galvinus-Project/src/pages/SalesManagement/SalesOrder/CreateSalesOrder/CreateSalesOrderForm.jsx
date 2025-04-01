import { useState } from "react";
import "../../../../components/Layout/Styles/BoxFormStyles.css";

export default function CreateSalesOrderForm() {
    const [formData, setFormData] = useState({
        customerId: "",
        orderId: "",
        productId: "",
        orderDate: "",
        requiredDate: "",
        deliveryBlock: "",
        orderStatus: "pending",
        paymentStatus: "unpaid",
        totalAmount: "",
    });

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
            // Check if orderId already exists
            const orderCheckResponse = await fetch(`http://localhost:3000/api/sales-orders/${formData.orderId}`);
            if (orderCheckResponse.ok) {
              alert(`Error: Order ID ${formData.orderId} is already in the database.`);
                return;
            }

            // Check if customerId exists in the database
            const customerCheckResponse = await fetch(`http://localhost:3000/api/customers/${formData.customerId}`);
            if (!customerCheckResponse.ok) {
                alert(`Error: Customer ID ${formData.customerId} does not exist. Please create the customer first.`);
                return;
            }

            // Check if productId exists in the database
            const productCheckResponse = await fetch(`http://localhost:3001/api/products/${formData.productId}`);
            if (!productCheckResponse.ok) {
                alert(`Error: Product ID ${formData.productId} does not exist. Please create the product first.`);
                return;
            }

            // Format data for submission
            const formattedData = {
                ...formData,
                totalAmount: parseFloat(formData.totalAmount), // Convert total to a number
                orderDate: new Date(formData.orderDate).toISOString(), // Format dates
                requiredDate: new Date(formData.requiredDate).toISOString(),
				orderId: formData.orderId
            };

            // Submit the sales order
            const response = await fetch("http://localhost:3000/api/sales-orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formattedData),
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                console.error("Backend error:", errorResponse);
                throw new Error(errorResponse.message || "Failed to create sales order");
            }

            const result = await response.json();
            console.log("Sales order created successfully:", result);
            alert("Sales order created successfully!");
        } catch (error) {
            console.error("Error creating sales order:", error);
            alert("Error creating sales order. Please try again.");
        }
    };

    return (
        <div className="container">
            <div className="form-container">
                <h2>Create Sales Order</h2>

                <form onSubmit={handleSubmit}>
                    {/* Header Box */}
                    <div className="header-box">
                        <h2>Header</h2>

                        <div className="data-container">
                            <div className="data">
                                <label htmlFor="orderId">Order ID</label>
                                <input
                                    type="text"
                                    id="orderId"
                                    name="orderId"
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
                                <label htmlFor="totalAmount">Total Amount</label>
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

                    {/* Submit Button */}
                    <div className="submit-button">
                        <button type="submit">Create Sales Order</button>
                    </div>
                </form>
            </div>
        </div>
    );
}