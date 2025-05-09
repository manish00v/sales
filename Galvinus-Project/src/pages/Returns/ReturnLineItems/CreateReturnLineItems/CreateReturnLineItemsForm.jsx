import { useState } from "react";
import "../../../../components/Layout/Styles/BoxFormStyles.css";

export default function CreateReturnLineItemsForm() {
    const [formData, setFormData] = useState({
        lineItemId: "",
        productId: "",
        productName: "",
        quantityReturned: "",
        conditionOfProduct: "",
        originalPrice: "",
        refundAmount: "",
        replacementStatus: "pending",
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
            // 1. Check if lineItemId already exists
            const lineItemCheckResponse = await fetch(
                `http://localhost:3000/api/return-line-items/${formData.lineItemId}`
            );
            if (lineItemCheckResponse.ok) {
                alert("Error: Line Item ID is already in the database.");
                return;
            }

            // 3. Check if productId exists in the database
            const productCheckResponse = await fetch(
                `http://localhost:3001/api/products/${formData.productId}`
            );
            if (!productCheckResponse.ok) {
                alert("Error: Product ID does not exist. Please create the product first.");
                return;
            }

            // Format data for submission
            const formattedData = {
                ...formData,
                quantityReturned: Number(formData.quantityReturned),
                originalPrice: parseFloat(formData.originalPrice),
                refundAmount: parseFloat(formData.refundAmount)
            };

            // 4. Submit the return line item data
            const response = await fetch("http://localhost:3000/api/return-line-items", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formattedData),
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                console.error("Backend error:", errorResponse);
                throw new Error(errorResponse.message || "Failed to create return line item");
            }

            const result = await response.json();
            console.log("Return line item created successfully:", result);
            alert("Return line item created successfully!");

            // Reset form after successful submission
            setFormData({
                lineItemId: "",
                productId: "",
                productName: "",
                quantityReturned: "",
                conditionOfProduct: "",
                originalPrice: "",
                refundAmount: "",
                replacementStatus: "pending",
            });

        } catch (error) {
            console.error("Error creating return line item:", error);
            alert(`Error creating return line item: ${error.message}`);
        }
    };

    return (
        <div className="container">
            <div className="form-container">
                <h2>Create Return Line Item</h2>

                <form onSubmit={handleSubmit}>
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
                                    placeholder="Unique identifier"
                                    value={formData.lineItemId}
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
                                <label htmlFor="productName">Product Name</label>
                                <input
                                    type="text"
                                    id="productName"
                                    name="productName"
                                    value={formData.productName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Item Box */}
                    <div className="item-box">
                        <h2>Item Details</h2>

                        <div className="data-container">
                            <div className="data">
                                <label htmlFor="quantityReturned">Quantity Returned</label>
                                <input
                                    type="number"
                                    id="quantityReturned"
                                    name="quantityReturned"
                                    min="1"
                                    value={formData.quantityReturned}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="data">
                                <label htmlFor="conditionOfProduct">Condition Of Product</label>
                                <select
                                    id="conditionOfProduct"
                                    name="conditionOfProduct"
                                    value={formData.conditionOfProduct}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select condition</option>
                                    <option value="new">New</option>
                                    <option value="like_new">Like New</option>
                                    <option value="used">Used</option>
                                    <option value="damaged">Damaged</option>
                                </select>
                            </div>

                            <div className="data">
                                <label htmlFor="originalPrice">Original Price</label>
                                <input
                                    type="number"
                                    id="originalPrice"
                                    name="originalPrice"
                                    step="0.01"
                                    min="0"
                                    value={formData.originalPrice}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="data">
                                <label htmlFor="refundAmount">Refund Amount</label>
                                <input
                                    type="number"
                                    id="refundAmount"
                                    name="refundAmount"
                                    step="0.01"
                                    min="0"
                                    value={formData.refundAmount}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="data">
                                <label htmlFor="replacementStatus">Status</label>
                                <select
                                    id="replacementStatus"
                                    name="replacementStatus"
                                    value={formData.replacementStatus}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="pending">Pending</option>
                                    <option value="approved">Approved</option>
                                    <option value="rejected">Rejected</option>
                                    <option value="processed">Processed</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="submit-button">
                        <button type="submit">Create Return Line Item</button>
                    </div>
                </form>
            </div>
        </div>
    );
}