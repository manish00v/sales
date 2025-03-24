import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";

export default function DisplaySalesOrderPage() {
    const { setBtn, setGoBackUrl } = useContext(FormPageHeaderContext);
    const [orderId, setOrderId] = useState("");
    const [customerId, setCustomerId] = useState("");
    const [error, setError] = useState(null); // State to store error messages
    const navigate = useNavigate();

    useEffect(() => {
        setBtn("Display");
        setGoBackUrl("/salesorder");
    }, [setBtn, setGoBackUrl]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate orderId and customerId
        if (!orderId || !customerId) {
            setError("Order ID and Customer ID are required");
            return;
        }

        try {
            // Check if orderId exists in the order table
            const orderResponse = await fetch(`http://localhost:3000/api/sales-orders/${orderId}`);
            if (!orderResponse.ok) {
                alert(`Order ID ${orderId} does not exist. Please create the Order ID first.`);
                return;
            }

            // Check if customerId exists in the customer table
            const customerResponse = await fetch(`http://localhost:3000/api/customers/${customerId}`);
            if (!customerResponse.ok) {
                alert(`Customer ID ${customerId} does not exist. Please create the Customer ID first.`);
                return;
            }

            // Check if orderId is associated with customerId in the customer table
            const associationResponse = await fetch(`http://localhost:3000/api/sales-orders/${orderId}/${customerId}`);
            if (!associationResponse.ok) {
                alert(`Order ID ${orderId} is not associated with Customer ID ${customerId}.`);
                return;
            }

            // If all validations pass, navigate to DisplaySalesOrderForm
            navigate(`/displaysalesorderform/${orderId}/${customerId}`);
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
                    <h2>Display Sales Order - Mandatory Details</h2>

                    {/* Display error message if validation fails */}
                    {error && <div className="error-message">{error}</div>}

                    <form className="header-box" onSubmit={handleSubmit}>
                        <div className="data-container">
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
                        </div>

                        <button type="submit" className="submit-btn">
                            Display Sales Order
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}