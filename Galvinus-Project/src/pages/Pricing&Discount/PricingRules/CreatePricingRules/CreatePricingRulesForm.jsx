import { useState } from "react";
import "../../../../components/Layout/Styles/BoxFormStyles.css";

export default function CreatePricingRulesForm() {
    const [formData, setFormData] = useState({
        ruleId: "",
        productId: "",
        customerGroup: "",
        region: "",
        basePrice: "",
        discountId: "",
        effectiveDate: "",
        expireDate: "",
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
            // Check if ruleId already exists
            const ruleCheckResponse = await fetch(`http://localhost:3000/api/pricing-rules/${formData.ruleId}`);
            if (ruleCheckResponse.ok) {
                alert("Error: Rule ID is already in the database.");
                return;
            }

            // Check if productId exists in the database
            const productCheckResponse = await fetch(`http://localhost:3000/api/products/${formData.productId}`);
            if (!productCheckResponse.ok) {
                alert("Error: Product ID does not exist. Please create the product first.");
                return;
            }

			const discountCheckResponse = await fetch(`http://localhost:3000/api/discount-rules/${formData.discountId}`);
            if (!discountCheckResponse.ok) {
                alert("Error: Discount ID does not exist. Please create the Discount first.");
                return;
            }

            // Format data for submission
            const formattedData = {
                ...formData,
                basePrice: parseFloat(formData.basePrice),
				discountId: parseInt(formData.discountId, 10), // Convert discountId to a number
                effectiveDate: formData.effectiveDate,
                expireDate: formData.expireDate,
            };

            // Submit the pricing rule
            const response = await fetch("http://localhost:3000/api/pricing-rules", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formattedData),
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                console.error("Backend error:", errorResponse);
                throw new Error(errorResponse.message || "Failed to create pricing rule");
            }

            const result = await response.json();
            console.log("Pricing rule created successfully:", result);
            alert("Pricing rule created successfully!");
        } catch (error) {
            console.error("Error creating pricing rule:", error);
            alert("Error creating pricing rule. Please try again.");
        }
    };

    return (
        <div className="container">
            <div className="form-container">
                <h2>Create Pricing Rules</h2>

                <form onSubmit={handleSubmit}>
                    {/* Header Box */}
                    <div className="header-box">
                        <h2>Header</h2>

                        <div className="data-container">
                            <div className="data">
                                <label htmlFor="ruleId">Rule ID</label>
                                <input
                                    type="number"
                                    id="ruleId"
                                    name="ruleId"
                                    placeholder="(Primary Key)"
                                    value={formData.ruleId}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="data">
                                <label htmlFor="productId">Product ID</label>
                                <input
                                    type="number"
                                    id="productId"
                                    name="productId"
                                    value={formData.productId}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="data">
                                <label htmlFor="discountId">Discount ID</label>
                                <input
                                    type="number"
                                    id="discountId"
                                    name="discountId"
                                    value={formData.discountId}
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
                                <label htmlFor="customerGroup">Customer Group</label>
                                <input
                                    type="text"
                                    id="customerGroup"
                                    name="customerGroup"
                                    value={formData.customerGroup}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="data">
                                <label htmlFor="region">Region</label>
                                <input
                                    type="text"
                                    id="region"
                                    name="region"
                                    value={formData.region}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="data">
                                <label htmlFor="basePrice">Base Price</label>
                                <input
                                    type="number"
                                    id="basePrice"
                                    name="basePrice"
                                    placeholder="(Default Price of Product)"
                                    value={formData.basePrice}
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
                                <label htmlFor="expireDate">Expiry Date</label>
                                <input
                                    type="date"
                                    id="expireDate"
                                    name="expireDate"
                                    value={formData.expireDate}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="submit-button">
                        <button type="submit">Create Pricing Rule</button>
                    </div>
                </form>
            </div>
        </div>
    );
}