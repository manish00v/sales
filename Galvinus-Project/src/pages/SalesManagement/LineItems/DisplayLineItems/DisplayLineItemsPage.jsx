import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";

export default function DisplayLineItemsPage() {
    const { setBtn, setGoBackUrl } = useContext(FormPageHeaderContext);
    const [orderLineItemId, setOrderLineItemId] = useState("");
    const [productId, setProductId] = useState("");
    const [error, setError] = useState(null); // State to store error messages
    const navigate = useNavigate();

    useEffect(() => {
        setBtn("Display");
        setGoBackUrl("/lineitems");
    }, [setBtn, setGoBackUrl]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate orderLineItemId and productId
        if (!orderLineItemId || !productId) {
            setError("Order Line Item ID and Product ID are required");
            return;
        }

        // Check if orderLineItemId and productId are valid integers
        if (isNaN(orderLineItemId) || !Number.isInteger(Number(orderLineItemId))) {
            setError("Order Line Item ID must be a valid integer");
            return;
        }
        if (isNaN(productId) || !Number.isInteger(Number(productId))) {
            setError("Product ID must be a valid integer");
            return;
        }

        // Log values for debugging
        console.log("Navigating with Order Line Item ID:", orderLineItemId, "and Product ID:", productId);

        // Navigate to DisplayLineItemsForm
        navigate(`/displaylineitemsform/${orderLineItemId}/${productId}`);
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
                                    type="number"
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
                                    type="number"
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