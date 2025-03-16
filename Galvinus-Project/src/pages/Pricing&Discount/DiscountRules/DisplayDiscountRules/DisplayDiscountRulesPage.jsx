import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";

export default function DisplayDiscountRulesPage() {
    const { setBtn, setGoBackUrl } = useContext(FormPageHeaderContext);
    const [discountId, setDiscountId] = useState("");
    const [productId, setProductId] = useState("");
    const [error, setError] = useState(null); // State to store error messages
    const navigate = useNavigate();

    useEffect(() => {
        setBtn("Display");
        setGoBackUrl("/discountrules");
    }, [setBtn, setGoBackUrl]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate discountId and productId
        if (!discountId || !productId) {
            setError("Discount ID and Product ID are required");
            return;
        }

        // Check if discountId and productId are valid numbers
        if (isNaN(discountId)) {
            setError("Discount ID must be a number");
            return;
        }
        if (isNaN(productId)) {
            setError("Product ID must be a number");
            return;
        }

        // If validation passes, navigate to the DisplayDiscountRulesForm page
        navigate(`/displaydiscountrulesform/${discountId}/${productId}`);
    };

    return (
        <>
            <FormPageHeader />
            <div className="container">
                <div className="form-container">
                    <h2>Display Discount Rules - Mandatory Details</h2>

                    {/* Display error message if validation fails */}
                    {error && <div className="error-message">{error}</div>}

                    <form className="header-box" onSubmit={handleSubmit}>
                        <div className="data-container">
                            <div className="data">
                                <label htmlFor="discountId">Discount ID</label>
                                <input
                                    type="text"
                                    id="discountId"
                                    name="discountId"
                                    value={discountId}
                                    onChange={(e) => setDiscountId(e.target.value)}
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
                            Display Discount Rules
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}