import { useState } from "react";
import "../../../../components/Layout/Styles/BoxFormStyles.css";

export default function CreateDiscountForm() {
    const [formData, setFormData] = useState({
        discountId: "",
        productId: "",
        discountCriteria: "",
        productDiscount: "",
        customerDiscount: "",
        discountValue: "",
        discountEligibilityCondition: "",
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
            const discountCheckResponse = await fetch(`http://localhost:3000/api/discount-rules/${formData.discountId}`);
            if (!discountCheckResponse.ok) {
                alert("Error: Discount ID does not exist. Please create the discount first.");
                return;
            }

            // Check if productId exists in the database
            const productCheckResponse = await fetch(`http://localhost:3000/api/products/${formData.productId}`);
            if (!productCheckResponse.ok) {
                alert("Error: Product ID does not exist. Please create the product first.");
                return;
            }

            // Format data for submission
            const formattedData = {
                ...formData,
                productDiscount: parseFloat(formData.productDiscount),
                customerDiscount: parseFloat(formData.customerDiscount),
                discountValue: parseFloat(formData.discountValue),
            };

            // Submit the discount
            const response = await fetch("http://localhost:3000/api/discounts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formattedData),
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                console.error("Backend error:", errorResponse);
                throw new Error(errorResponse.message || "Failed to create discount");
            }

            const result = await response.json();
            console.log("Discount created successfully:", result);
            alert("Discount created successfully!");
        } catch (error) {
            console.error("Error creating discount:", error);
            alert("Error creating discount. Please try again.");
        }
    };

    return (
        <div className="container">
            <div className="form-container">
                <h2>Create Discount</h2>

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
                                <label htmlFor="discountCriteria">Discount Criteria</label>
                                <input
                                    type="text"
                                    id="discountCriteria"
                                    name="discountCriteria"
                                    value={formData.discountCriteria}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="data">
                                <label htmlFor="productDiscount">Product Discount</label>
                                <input
                                    type="number"
                                    id="productDiscount"
                                    name="productDiscount"
                                    value={formData.productDiscount}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="data">
                                <label htmlFor="customerDiscount">Customer Discount</label>
                                <input
                                    type="number"
                                    id="customerDiscount"
                                    name="customerDiscount"
                                    value={formData.customerDiscount}
                                    onChange={handleChange}
                                    required
                                />
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
                                <label htmlFor="discountEligibilityCondition">Discount Eligibility Condition</label>
                                <input
                                    type="text"
                                    id="discountEligibilityCondition"
                                    name="discountEligibilityCondition"
                                    value={formData.discountEligibilityCondition}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="submit-button">
                        <button type="submit">Create Discount</button>
                    </div>
                </form>
            </div>
        </div>
    );
}