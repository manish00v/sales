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

	const handleSubmit = (e) => {
		e.preventDefault();
	
		// Validate orderId and customerId
		if (!orderId || !customerId) {
			setError("Order ID and Customer ID are required");
			return;
		}
	
		// Check if orderId and customerId are valid integers
		if (isNaN(orderId) || !Number.isInteger(Number(orderId))) {
			setError("Order ID must be a valid integer");
			return;
		}
		if (isNaN(customerId) || !Number.isInteger(Number(customerId))) {
			setError("Customer ID must be a valid integer");
			return;
		}
	
		// Log values for debugging
		console.log("Navigating with Order ID:", orderId, "and Customer ID:", customerId);
	
		// Navigate to DisplaySalesOrderForm
		navigate(`/displaysalesorderform/${orderId}/${customerId}`);
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
                                    type="number"
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
									type="number"
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