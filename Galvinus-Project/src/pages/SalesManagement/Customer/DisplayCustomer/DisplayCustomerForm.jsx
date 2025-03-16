import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";

export default function DisplayCustomerForm() {
    const { setBtn, setGoBackUrl } = useContext(FormPageHeaderContext);
    const { customerId, orderId, productId } = useParams(); // Extract customerId, orderId, and productId from the URL
    const [formData, setFormData] = useState({
        customerId: "",
        orderId: "",
        productId: "",
        customerName: "",
        emailId: "",
        phoneNumber: "",
        billingAddress: "",
        shippingAddress: "",
        customerGroup: "",
        creditLimit: "",
        status: "",
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setBtn("NoBtn");
        setGoBackUrl("/customer");

        const fetchCustomer = async () => {
            try {
                // Validate customerId, orderId, and productId
                if (!customerId || !orderId || !productId) {
                    throw new Error("Customer ID, Order ID, and Product ID are required");
                }

                console.log("Fetching customer with customerId:", customerId, "productId:", productId, "and  orderId:", orderId,); // Debugging
                const response = await fetch(`http://localhost:3000/api/customers/${customerId}/${productId}/${orderId}`);
                if (!response.ok) {
                    throw new Error("Customer not found");
                }
                const data = await response.json();
                console.log("Fetched customer data:", data); // Debugging

                // Handle array response
                const customer = Array.isArray(data) ? data[0] : data;
                console.log("Extracted customer:", customer); // Debugging

                // Check if the fetched customer matches the provided customerId, orderId, and productId
                if (
                    customer.customerId !== parseInt(customerId) ||
                    customer.orderId !== parseInt(orderId) 
                    // customer.productId !== parseInt(productId)
                ) {
                    throw new Error("Customer ID, Order ID, and Product ID do not match");
                }

                // Populate the form data if the customer is found
                setFormData({
                    customerId: customer.customerId,
                    orderId: customer.orderId,
                    productId: customer.productId,
                    customerName: customer.customerName,
                    emailId: customer.emailId,
                    phoneNumber: customer.phoneNumber,
                    billingAddress: customer.billingAddress,
                    shippingAddress: customer.shippingAddress,
                    customerGroup: customer.customerGroup,
                    creditLimit: customer.creditLimit,
                    status: customer.status,
                });
            } catch (err) {
                console.error("Error fetching customer:", err); // Debugging
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCustomer();
    }, [customerId, orderId, productId, setBtn, setGoBackUrl]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <FormPageHeader />
            <div className="container">
                <div className="form-container">
                    <h2>Display Customer</h2>

                    {/* Display error message if customer is not found or does not match */}
                    {error && <div className="error-message">{error}</div>}

                    <form>
                        {/* Header Box */}
                        <div className="header-box">
                            <h2>Header</h2>

                            <div className="data-container">
                                <div className="data">
                                    <label htmlFor="customerId">Customer ID</label>
                                    <input
                                        type="number"
                                        id="customerId"
                                        name="customerId"
                                        value={formData.customerId}
                                    
                                    />
                                </div>

                                <div className="data">
                                    <label htmlFor="orderId">Order ID</label>
                                    <input
                                        type="number"
                                        id="orderId"
                                        name="orderId"
                                        value={formData.orderId}
                                   
                                    />
                                </div>

                                <div className="data">
                                    <label htmlFor="productId">Product ID</label>
                                    <input
                                        type="text"
                                        id="productId"
                                        name="productId"
                                        value={formData.productId}
                                        
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Item Box */}
                        <div className="item-box">
                            <h2>Item</h2>

                            <div className="data-container">
                                <div className="data">
                                    <label htmlFor="customerName">Customer Name</label>
                                    <input
                                        type="text"
                                        id="customerName"
                                        name="customerName"
                                        value={formData.customerName}
                                        
                                    />
                                </div>

                                <div className="data">
                                    <label htmlFor="emailId">Email</label>
                                    <input
                                        type="emailId"
                                        id="emailId"
                                        name="emailId"
                                        value={formData.emailId}
                                        
                                    />
                                </div>

                                <div className="data">
                                    <label htmlFor="phoneNumber">Phone Number</label>
                                    <input
                                        type="tel"
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        
                                    />
                                </div>

                                <div className="data">
                                    <label htmlFor="billingAddress">Billing Address</label>
                                    <input
                                        type="text"
                                        id="billingAddress"
                                        name="billingAddress"
                                        value={formData.billingAddress}
                                        
                                    />
                                </div>

                                <div className="data">
                                    <label htmlFor="shippingAddress">Shipping Address</label>
                                    <input
                                        type="text"
                                        id="shippingAddress"
                                        name="shippingAddress"
                                        value={formData.shippingAddress}
                                        
                                    />
                                </div>

                                <div className="data">
                                    <label htmlFor="customerGroup">Customer Group</label>
                                    <input
                                        type="text"
                                        id="customerGroup"
                                        name="customerGroup"
                                        value={formData.customerGroup}
                                        
                                    />
                                </div>

                                <div className="data">
                                    <label htmlFor="creditLimit">Credit Limit</label>
                                    <input
                                        type="text"
                                        id="creditLimit"
                                        name="creditLimit"
                                        value={formData.creditLimit}
                                        
                                    />
                                </div>

                                <div className="data">
                                    <label htmlFor="status">Status</label>
                                    <select
                                        id="status"
                                        name="status"
                                        value={formData.status}
                                        
                                    >
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}