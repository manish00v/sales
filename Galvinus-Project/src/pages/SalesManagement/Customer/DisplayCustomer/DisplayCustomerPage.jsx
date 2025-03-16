import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";

export default function DisplayCustomerPage() {
    const { setBtn, setGoBackUrl } = useContext(FormPageHeaderContext);
    const [customerId, setCustomerId] = useState("");
    const [orderId, setOrderId] = useState("");
    const [productId, setProductId] = useState("");
    const [error, setError] = useState(null); // State to store error messages
    const navigate = useNavigate();

    useEffect(() => {
        setBtn("Display");
        setGoBackUrl("/customer");
    }, [setBtn, setGoBackUrl]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate customerId, orderId, and productId
        if (!customerId || !orderId || !productId) {
            setError("Customer ID, Order ID, and Product ID are required");
            return;
        }

        // Check if customerId, orderId, and productId are valid integers
        if (isNaN(customerId) || !Number.isInteger(Number(customerId))) {
            setError("Customer ID must be a valid integer");
            return;
        }
        if (isNaN(orderId) || !Number.isInteger(Number(orderId))) {
            setError("Order ID must be a valid integer");
            return;
        }
        // if (isNaN(productId) || !Number.isInteger(Number(productId))) {
        //     setError("Product ID must be a valid integer");
        //     return;
        // }

        // Log values for debugging
        console.log("Navigating with Customer ID:", customerId," Product ID:", productId, "and Order ID:", orderId, );

        // Navigate to DisplayCustomerForm
        navigate(`/displaycustomerform/${customerId}/${productId}/${orderId}`);
    };

    return (
        <>
            <FormPageHeader />
            <div className="container">
                <div className="form-container">
                    <h2>Display Customer - Mandatory Details</h2>

                    {/* Display error message if validation fails */}
                    {error && <div className="error-message">{error}</div>}

                    <form className="header-box" onSubmit={handleSubmit}>
                        <div className="data-container">
                            <div className="data">
                                <label htmlFor="customerId">Customer ID</label>
                                <input
                                    type="number"
                                    id="customerId"
                                    name="customerId"
                                    value={customerId}
                                    onChange={(e) => setCustomerId(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="data">
                                <label htmlFor="orderId">Order ID</label>
                                <input
                                    type="number"
                                    id="orderId"
                                    name="orderId"
                                    value={orderId}
                                    onChange={(e) => setOrderId(e.target.value)}
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
                            Display Customer
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}