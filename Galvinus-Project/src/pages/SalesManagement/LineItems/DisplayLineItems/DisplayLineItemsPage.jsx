import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";

export default function DisplayLineItemsPage() {
    const { setGoBackUrl } = useContext(FormPageHeaderContext);
    const [orderLineItemId, setOrderLineItemId] = useState("");
    const [productId, setProductId] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        setGoBackUrl("/lineitems");
    }, [setGoBackUrl]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate orderLineItemId and productId
        if (!orderLineItemId || !productId) {
            setError("Order Line Item ID and Product ID are required");
            return;
        }

        try {
            // 1. Check if orderLineItemId exists in line-items table
            const lineItemResponse = await fetch(`http://localhost:3000/api/line-items/${orderLineItemId}`);
            if (!lineItemResponse.ok) {
                alert(`Order Line Item ID ${orderLineItemId} does not exist. Please create it first.`);
                return;
            }

            // 2. Check if productId exists in product table
            const productResponse = await fetch(`http://localhost:3001/api/products/${productId}`);
            if (!productResponse.ok) {
                alert(`Product ID ${productId} does not exist. Please create it first.`);
                return;
            }

            // 3. Check if orderLineItemId is associated with productId
            const associationResponse = await fetch(`http://localhost:3000/api/line-items/${orderLineItemId}/${productId}`);
            if (!associationResponse.ok) {
                alert(`Order Line Item ID ${orderLineItemId} is not associated with Product ID ${productId}.`);
                return;
            }

            // If all validations pass, navigate to DisplayLineItemsForm
            navigate(`/displaylineitemsform/${orderLineItemId}/${productId}`);

        } catch (error) {
            console.error("Error during validation:", error);
            alert("An error occurred during validation. Please try again.");
        }
    };

    return (
        <>
            <FormPageHeader />
            <div className="container">
                <div className="form-container">
                    <h2>Display Line Items - Mandatory Details</h2>

                    {/* Display error message if validation fails */}
                    {error && <div className="error-message">{error}</div>}

                    <form className="header-box" onSubmit={handleSubmit}>
                        <div className="data-container">
                            <div className="data">
                                <label htmlFor="orderLineItemId">Order Line Item ID</label>
                                <input
                                    type="text"
                                    id="orderLineItemId"
                                    name="orderLineItemId"
                                    value={orderLineItemId}
                                    onChange={(e) => setOrderLineItemId(e.target.value)}
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
                            Display Line Items
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}