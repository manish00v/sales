import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";

export default function DisplaySalesPersonPage() {
    const { setBtn, setGoBackUrl } = useContext(FormPageHeaderContext);
    const [salesPersonId, setSalesPersonId] = useState("");
    const [customerId, setCustomerId] = useState("");
	const [orderId, setOrderId] = useState("");
	const [productId, setProductId] = useState("");
    const [error, setError] = useState(null); // State to store error messages
    const navigate = useNavigate();

    useEffect(() => {
        setBtn("Display");
        setGoBackUrl("/salesperson");
    }, [setBtn, setGoBackUrl]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate salesPersonId and customerId
        if (!salesPersonId || !customerId) {
            setError("Sales Person ID and Customer ID are required");
            return;
        }

        // Check if salesPersonId and customerId are valid integers
        if (isNaN(salesPersonId) || !Number.isInteger(Number(salesPersonId))) {
            setError("Sales Person ID must be a valid integer");
            return;
        }
        if (isNaN(customerId) || !Number.isInteger(Number(customerId))) {
            setError("Customer ID must be a valid integer");
            return;
        }

        // Log values for debugging
        console.log("Navigating with Sales Person ID:", salesPersonId, "and Customer ID:", customerId);

        // Navigate to DisplaySalesPersonForm
		// "/displaysalespersonform/:salesPersonId/:customerId/:orderId/:productId"
        navigate(`/displaysalespersonform/${salesPersonId}/${customerId}/${orderId}/${productId}`);
    };

    return (
        <>
            <FormPageHeader />
            <div className="container">
                <div className="form-container">
                    <h2>Display Sales Person - Mandatory Details</h2>

                    {/* Display error message if validation fails */}
                    {error && <div className="error-message">{error}</div>}

                    <form className="header-box" onSubmit={handleSubmit}>
                        <div className="data-container">
                            <div className="data">
                                <label htmlFor="salesPersonId">Sales Person ID</label>
                                <input
                                    type="number"
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