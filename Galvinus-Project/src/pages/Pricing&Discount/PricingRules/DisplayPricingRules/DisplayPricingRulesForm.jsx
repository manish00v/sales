import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";

export default function DisplayPricingRulesForm() {
    const { setGoBackUrl } = useContext(FormPageHeaderContext);
    const { ruleId, productId } = useParams(); // Extract ruleId and productId from the URL
    const [formData, setFormData] = useState({
        ruleId: "",
        productId: "",
        discountId: "",
        customerGroup: "",
        region: "",
        basePrice: "",
        effectiveDate: "",
        expireDate: "",
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setGoBackUrl("/pricingrules");

        const fetchPricingRules = async () => {
            try {
                // Validate ruleId and productId
                if (!ruleId || !productId) {
                    throw new Error("Rule ID and Product ID are required");
                }

                console.log("Fetching pricing rules with ruleId:", ruleId, "and productId:", productId); // Debugging
                const response = await fetch(`http://localhost:3001/api/pricing-rules/${ruleId}/${productId}`);
                if (!response.ok) {
                    throw new Error("Pricing rules not found");
                }
                const data = await response.json();
                console.log("Fetched pricing rules data:", data); // Debugging

                // Handle array response
                const pricingRules = Array.isArray(data) ? data[0] : data;
                console.log("Extracted pricing rules:", pricingRules); // Debugging

                // Populate the form data if the pricing rules are found
                setFormData({
                    ruleId: pricingRules.ruleId,
                    productId: pricingRules.productId,
                    discountId: pricingRules.discountId,
                    customerGroup: pricingRules.customerGroup,
                    region: pricingRules.region,
                    basePrice: pricingRules.basePrice,
                    effectiveDate: pricingRules.effectiveDate.split("T")[0], // Extract date part
                    expireDate: pricingRules.expireDate.split("T")[0], // Extract date part
                });
            } catch (err) {
                console.error("Error fetching pricing rules:", err); // Debugging
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPricingRules();
    }, [ruleId, productId, setGoBackUrl]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <FormPageHeader />
            <div className="container">
                <div className="form-container">
                    <h2>Display Pricing Rules</h2>

                    {/* Display error message if pricing rules are not found or do not match */}
                    {error && <div className="error-message">{error}</div>}

                    <form>
                        {/* Header Box */}
                        <div className="header-box">
                            <h2>Header</h2>

                            <div className="data-container">
                                <div className="data">
                                    <label htmlFor="ruleId">Rule ID</label>
                                    <input
                                        type="text"
                                        id="ruleId"
                                        name="ruleId"
                                        value={formData.ruleId}
                                       
                                    />
                                </div>

                                <div className="data">
                                    <label htmlFor="productId">Product ID</label>
                                    <input
                                        type="text"
                                        id="productId"
                                        name="productId"
                                        value={formData.productId}
                                       
                                    />
                                </div>

                                <div className="data">
                                    <label htmlFor="discountId">Discount ID</label>
                                    <input
                                        type="text"
                                        id="discountId"
                                        name="discountId"
                                        value={formData.discountId}
                                        
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
                                       
                                    />
                                </div>

                                <div className="data">
                                    <label htmlFor="region">Region</label>
                                    <input
                                        type="text"
                                        id="region"
                                        name="region"
                                        value={formData.region}
                                      
                                    />
                                </div>

                                <div className="data">
                                    <label htmlFor="basePrice">Base Price</label>
                                    <input
                                        type="text"
                                        id="basePrice"
                                        name="basePrice"
                                        value={formData.basePrice}
                                       
                                    />
                                </div>

                                <div className="data">
                                    <label htmlFor="effectiveDate">Effective Date</label>
                                    <input
                                        type="date"
                                        id="effectiveDate"
                                        name="effectiveDate"
                                        value={formData.effectiveDate}
                                      
                                    />
                                </div>

                                <div className="data">
                                    <label htmlFor="expireDate">Expire Date</label>
                                    <input
                                        type="date"
                                        id="expireDate"
                                        name="expireDate"
                                        value={formData.expireDate}
                                      
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}