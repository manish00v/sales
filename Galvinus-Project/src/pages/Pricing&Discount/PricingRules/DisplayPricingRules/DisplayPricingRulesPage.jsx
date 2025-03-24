import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";

export default function DisplayPricingRulesPage() {
    const {  setGoBackUrl } = useContext(FormPageHeaderContext);
    const [ruleId, setRuleId] = useState("");
    const [productId, setProductId] = useState("");
    const [error, setError] = useState(null); // State to store error messages
    const navigate = useNavigate();

    useEffect(() => {
       
        setGoBackUrl("/pricingrules");
    }, [ setGoBackUrl]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate ruleId and productId
        if (!ruleId || !productId) {
            setError("Rule ID and Product ID are required");
            return;
        }

        try {
            // Check if ruleId exists in the database
            const ruleCheckResponse = await fetch(`http://localhost:3001/api/pricing-rules/${ruleId}`);
            if (!ruleCheckResponse.ok) {
                alert(`Rule ID ${ruleId} does not exist in the database.`);
                return;
            }

            // Check if productId exists in the database
            const productCheckResponse = await fetch(`http://localhost:3001/api/products/${productId}`);
            if (!productCheckResponse.ok) {
                alert(`Product ID ${productId} does not exist in the database.`);
                return;
            }

            // Check if the ruleId is associated with the productId
            const ruleDetailsResponse = await fetch(`http://localhost:3001/api/pricing-rules/${ruleId}`);
            const ruleDetails = await ruleDetailsResponse.json();

            if (ruleDetails.productId !== productId) {
                alert(`Rule ID ${ruleId} is not associated with Product ID ${productId}.`);
                return;
            }

            // If all validations pass, navigate to the DisplayPricingRulesForm page
            navigate(`/displaypricingrulesform/${ruleId}/${productId}`);
        } catch (error) {
            console.error("Error validating IDs:", error);
            alert("An error occurred while validating the IDs. Please try again.");
        }
    };

    return (
        <>
            <FormPageHeader />
            <div className="container">
                <div className="form-container">
                    <h2>Display Pricing Rules - Mandatory Details</h2>

                    {/* Display error message if validation fails */}
                    {error && <div className="error-message">{error}</div>}

                    <form className="header-box" onSubmit={handleSubmit}>
                        <div className="data-container">
                            <div className="data">
                                <label htmlFor="ruleId">Rule ID</label>
                                <input
                                    type="text"
                                    id="ruleId"
                                    name="ruleId"
                                    value={ruleId}
                                    onChange={(e) => setRuleId(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="data">
                                <label htmlFor="productId">Product ID</label>
                                <input
                                    type="text"
                                    id="productId"
                                    name="productId"
                                    value={productId}
                                    onChange={(e) => setProductId(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <button type="submit" className="submit-btn">
                            Display Pricing Rules
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}