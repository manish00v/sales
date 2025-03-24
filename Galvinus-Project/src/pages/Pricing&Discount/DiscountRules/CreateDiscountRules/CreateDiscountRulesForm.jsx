import { useState } from "react";
import "../../../../components/Layout/Styles/BoxFormStyles.css";

export default function CreateDiscountRulesForm() {
    const [formData, setFormData] = useState({
        discountId: "",
        productId: "",
        applicableTo: "Product",
        criteria: "",
        discountType: "Flat",
        discountValue: "",
        effectiveDate: "",
        expiryDate: "",
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
            // Check if discountId already exists
            const discountCheckResponse = await fetch(`http://localhost:3001/api/discount-rules/${formData.discountId}`);
            if (discountCheckResponse.ok) {
                alert(`Discount ID ${formData.discountId} is already in the database.`);
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
                discountValue: parseFloat(formData.discountValue),
                effectiveDate: formData.effectiveDate,
                expiryDate: formData.expiryDate,
            };
    
            // Submit the discount rule
            const response = await fetch("http://localhost:3001/api/discount-rules", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formattedData),
            });
    
            if (!response.ok) {
                const errorResponse = await response.json();
                console.error("Backend error:", errorResponse);
                throw new Error(errorResponse.message || "Failed to create discount rule");
            }
    
            const result = await response.json();
            console.log("Discount rule created successfully:", result);
            alert("Discount rule created successfully!");
        } catch (error) {
            console.error("Error creating discount rule:", error);
            alert("Error creating discount rule. Please try again.");
        }
    };
    

    return (
        <div className="container">
            <div className="form-container">
                <h2>Create Discount Rules</h2>

                <form onSubmit={handleSubmit}>
                    {/* Header Box */}
                    <div className="header-box">
                        <h2>Header</h2>

                        <div className="data-container">
                            <div className="data">
                                <label htmlFor="discountId">Discount ID</label>
                                <input
                                    type="text"
                                    id="discountId"
                                    name="discountId"
                                    placeholder="(Primary Key)"
                                    value={formData.discountId}
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
                                <label htmlFor="applicableTo">Applicable to</label>
                                <select
                                    id="applicableTo"
                                    name="applicableTo"
                                    value={formData.applicableTo}
                                    onChange={handleChange}
                                >
                                    <option>Product</option>
                                    <option>Category</option>
                                    <option>Order Total</option>
                                </select>
                            </div>

                            <div className="data">
                                <label htmlFor="criteria">Criteria</label>
                                <input
                                    type="text"
                                    id="criteria"
                                    name="criteria"
                                    placeholder="(Min. Order Quantity)"
                                    value={formData.criteria}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="data">
                                <label htmlFor="discountType">Discount Type</label>
                                <select
                                    id="discountType"
                                    name="discountType"
                                    value={formData.discountType}
                                    onChange={handleChange}
                                >
                                    <option>Flat</option>
                                    <option>Percentage</option>
                                </select>
                            </div>

                            <div className="data">
                                <label htmlFor="discountValue">Discount Value</label>
                                <input
                                    type="number"
                                    id="discountValue"
                                    name="discountValue"
                                    value={formData.discountValue}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="data">
                                <label htmlFor="effectiveDate">Effective Date</label>
                                <input
                                    type="date"
                                    id="effectiveDate"
                                    name="effectiveDate"
                                    value={formData.effectiveDate}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="data">
                                <label htmlFor="expiryDate">Expiry Date</label>
                                <input
                                    type="date"
                                    id="expiryDate"
                                    name="expiryDate"
                                    value={formData.expiryDate}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="submit-button">
                        <button type="submit">Create Discount Rule</button>
                    </div>
                </form>
            </div>
        </div>
    );
}