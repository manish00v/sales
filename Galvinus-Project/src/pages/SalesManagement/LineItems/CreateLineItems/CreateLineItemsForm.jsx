import { useState } from "react";
import "../../../../components/Layout/Styles/BoxFormStyles.css";

export default function CreateLineItemsForm() {
    const [formData, setFormData] = useState({
        orderLineItemId: "",
        orderId: "",
        productId: "",
        customerId: "",
        quantity: "",
        unitPrice: "",
        discount: "",
        tax: "",
        totalLinePrice: "",
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
            // Check if lineItemId already exists
            const lineItemCheckResponse = await fetch(`http://localhost:3000/api/line-items/${formData.orderLineItemId}`);
            if (lineItemCheckResponse.ok) {
                alert(`Error: Line Item ID ${formData.orderLineItemId} is already in the database.`);
                return;
            }

            // Check if orderId exists in the database
            const orderCheckResponse = await fetch(`http://localhost:3000/api/sales-orders/${formData.orderId}`);
            if (!orderCheckResponse.ok) {
                alert(`Error: Order ID ${formData.orderId} does not exist. Please create the order first.`);
                return;
            }

            // Check if productId exists in the database
            const productCheckResponse = await fetch(`http://localhost:3001/api/products/${formData.productId}`);
            if (!productCheckResponse.ok) {
                alert(`Error: Product ID ${formData.productId} does not exist. Please create the product first.`);
                return;
            }

            // Check if customerId exists in the database
            const customerCheckResponse = await fetch(`http://localhost:3000/api/customers/${formData.customerId}`);
            if (!customerCheckResponse.ok) {
                alert(`Error: Customer ID ${formData.customerId} does not exist. Please create the customer first.`);
                return;
            }

            // Format data for submission
            const formattedData = {
                ...formData,
                quantity: parseInt(formData.quantity),
                unitPrice: parseFloat(formData.unitPrice),
                discount: parseFloat(formData.discount),
                tax: parseFloat(formData.tax),
                totalLinePrice: parseFloat(formData.totalLinePrice),
                orderLineItemId: formData.orderLineItemId,
                orderId: formData.orderId,
                productId: formData.productId,
                customerId: formData.customerId,
            };

            // Submit the line item
            const response = await fetch("http://localhost:3000/api/line-items", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formattedData),
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                console.error("Backend error:", errorResponse);
                throw new Error(errorResponse.message || "Failed to create line item");
            }

            const result = await response.json();
            console.log("Line item created successfully:", result);
            alert("Line item created successfully!");
        } catch (error) {
            console.error("Error creating line item:", error);
            alert("Error creating line item. Please try again.");
        }
    };

    return (
        <div className="container">
            <div className="form-container">
                <h2>New Line Item</h2>

                <form onSubmit={handleSubmit}>
                    {/* Header Box */}
                    <div className="header-box">
                        <h2>Header</h2>

                        <div className="data-container">
                            <div className="data">
                                <label htmlFor="orderLineItemId">Order Line Item ID</label>
                                <input
                                    type="text"
                                    id="orderLineItemId"
                                    name="orderLineItemId"
                                    placeholder="(Primary Key)"
                                    value={formData.orderLineItemId}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="data">
                                <label htmlFor="orderId">Order ID</label>
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
                        </div>
                    </div>

                    {/* Item Box */}
                    <div className="item-box">
                        <h2>Item</h2>

                        <div className="data-container">
                            <div className="data">
                                <label htmlFor="quantity">Quantity</label>
                                <input
                                    type="number"
                                    id="quantity"
                                    name="quantity"
                                    value={formData.quantity}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="data">
                                <label htmlFor="unitPrice">Unit Price</label>
                                <input
                                    type="number"
                                    id="unitPrice"
                                    name="unitPrice"
                                    value={formData.unitPrice}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="data">
                                <label htmlFor="discount">Discount</label>
                                <input
                                    type="number"
                                    id="discount"
                                    name="discount"
                                    value={formData.discount}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="data">
                                <label htmlFor="tax">Tax</label>
                                <input
                                    type="number"
                                    id="tax"
                                    name="tax"
                                    value={formData.tax}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="data">
                                <label htmlFor="totalLinePrice">Total Line Price</label>
                                <input
                                    type="number"
                                    id="totalLinePrice"
                                    name="totalLinePrice"
                                    value={formData.totalLinePrice}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="submit-button">
                        <button type="submit">Create Line Item</button>
                    </div>
                </form>
            </div>
        </div>
    );
}