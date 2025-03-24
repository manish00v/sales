import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";

export default function DisplaySalesPersonPage() {
    const { setGoBackUrl } = useContext(FormPageHeaderContext);
    const [salesPersonId, setSalesPersonId] = useState("");
    const [customerId, setCustomerId] = useState("");
    const [orderId, setOrderId] = useState("");
    const [productId, setProductId] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        setGoBackUrl("/salesperson");
    }, [setGoBackUrl]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate all IDs are provided
        if (!salesPersonId || !customerId || !orderId || !productId) {
            setError("Sales Person ID, Customer ID, Order ID, and Product ID are required");
            return;
        }

        try {
            // 1. Check if salesPersonId exists
            const salesPersonRes = await fetch(`http://localhost:3000/api/sales-persons/${salesPersonId}`);
            if (!salesPersonRes.ok) {
                alert(`Sales Person ID ${salesPersonId} does not exist. Please create sales person ID first.`);
                return;
            }

            // 2. Check if customerId exists
            const customerRes = await fetch(`http://localhost:3000/api/customers/${customerId}`);
            if (!customerRes.ok) {
                alert(`Customer ID ${customerId} does not exist. Please create customer ID first.`);
                return;
            }

            // 3. Check if orderId exists
            const orderRes = await fetch(`http://localhost:3000/api/sales-orders/${orderId}`);
            if (!orderRes.ok) {
                alert(`Order ID ${orderId} does not exist. Please create order ID first.`);
                return;
            }

            // 4. Check if productId exists
            const productRes = await fetch(`http://localhost:3001/api/products/${productId}`);
            if (!productRes.ok) {
                alert(`Product ID ${productId} does not exist. Please create product ID first.`);
                return;
            }

            // 5. Check if salesPersonId is associated with customerId, orderId, and productId
            const associationRes = await fetch(
                `http://localhost:3000/api/sales-persons/${salesPersonId}/${customerId}/${orderId}/${productId}`
            );
            if (!associationRes.ok) {
                alert(`Sales Person ${salesPersonId} is not associated with the provided Customer ${customerId}, Order ${orderId}, and Product ${productId} combination.`);
                return;
            }

            // All validations passed - navigate to display page
            navigate(`/displaysalespersonform/${salesPersonId}/${customerId}/${orderId}/${productId}`);

        } catch (error) {
            console.error("Validation error:", error);
            alert("An error occurred during validation. Please try again.");
        }
    };

    return (
        <>
            <FormPageHeader />
            <div className="container">
                <div className="form-container">
                    <h2>Display Sales Person - Mandatory Details</h2>

                    {error && <div className="error-message">{error}</div>}

                    <form className="header-box" onSubmit={handleSubmit}>
                        <div className="data-container">
                            <div className="data">
                                <label htmlFor="salesPersonId">Sales Person ID</label>
                                <input
                                    type="text"
                                    id="salesPersonId"
                                    name="salesPersonId"
                                    value={salesPersonId}
                                    onChange={(e) => setSalesPersonId(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="data">
                                <label htmlFor="customerId">Customer ID</label>
                                <input
                                    type="text"
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
                                    type="text"
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
                            Display Sales Person
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}