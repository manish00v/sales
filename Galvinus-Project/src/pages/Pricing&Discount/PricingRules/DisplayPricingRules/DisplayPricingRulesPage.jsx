import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";

export default function DisplayPricingRulesPage() {
    const { setBtn, setGoBackUrl } = useContext(FormPageHeaderContext);
    const [ruleId, setRuleId] = useState("");
    const [productId, setProductId] = useState("");
    const [error, setError] = useState(null); // State to store error messages
    const navigate = useNavigate();

    useEffect(() => {
        setBtn("Display");
        setGoBackUrl("/pricingrules");
    }, [setBtn, setGoBackUrl]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate ruleId and productId
        if (!ruleId || !productId) {
            setError("Rule ID and Product ID are required");
            return;
        }

        // Check if ruleId and productId are valid numbers
        if (isNaN(ruleId)) {
            setError("Rule ID must be a number");
            return;
        }
        if (isNaN(productId)) {
            setError("Product ID must be a number");
            return;
        }

        // If validation passes, navigate to the DisplayPricingRulesForm page
        navigate(`/displaypricingrulesform/${ruleId}/${productId}`);
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