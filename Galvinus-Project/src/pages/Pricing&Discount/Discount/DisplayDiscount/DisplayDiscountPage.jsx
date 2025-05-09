import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";


export default function DisplayDiscountPage() {
    const { setBtn, setGoBackUrl } = useContext(FormPageHeaderContext);
    const [discountId, setDiscountId] = useState("");
    const [productId, setProductId] = useState("");
    const [error, setError] = useState(null); // State to store error messages
    const navigate = useNavigate();

    useEffect(() => {
        setGoBackUrl("/discount");
    }, [setBtn, setGoBackUrl]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate discountId and productId
        if (!discountId || !productId) {
            alert("Discount ID and Product ID are required");
            return;
        }

        try {
            // Check if discountId exists in the database
            const discountCheckResponse = await fetch(`http://localhost:3001/api/discount-rules/${discountId}`);
            if (!discountCheckResponse.ok) {
                alert(`Discount ID ${discountId} does not exist in the database.`);
                return;
            }

            // Check if productId exists in the database
            const productCheckResponse = await fetch(`http://localhost:3001/api/products/${productId}`);
            if (!productCheckResponse.ok) {
                alert(`Product ID ${productId} does not exist in the database.`);
                return;
            }

            // Check if the discountId is associated with the productId
            const discountDetailsResponse = await fetch(`http://localhost:3001/api/discount-rules/${discountId}`);
            const discountDetails = await discountDetailsResponse.json();

            if (discountDetails.productId !== productId) {
                alert(`Discount ID ${discountId} is not associated with Product ID ${productId}.`);
                return;
            }

            // If all validations pass, navigate to the DisplayDiscountForm page
            navigate(`/displaydiscountform/${discountId}/${productId}`);
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
                    <h2>Display Discount - Mandatory Details</h2>

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
                                    onChange={(e) => {
                                        setDiscountId(e.target.value);
                                        setError(null); // Clear error on input change
                                    }}
                                    placeholder="Enter Discount ID"
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
                                    onChange={(e) => {
                                        setProductId(e.target.value);
                                        setError(null); // Clear error on input change
                                    }}
                                    placeholder="Enter Product ID"
                                    required
                                />
                            </div>
                        </div>

                        <button type="submit" className="submit-btn">
                            Display Discount
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}