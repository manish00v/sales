import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";

export default function DisplaySalesPersonForm() {
    const { setGoBackUrl } = useContext(FormPageHeaderContext);
    const { salesPersonId, customerId } = useParams(); // Extract salesPersonId and customerId from the URL
    const [formData, setFormData] = useState({
        salesPersonId: "",
        customerId: "",
        orderId: "",
        productId: "",
        salesPersonName: "",
        emailId: "",
        phoneNumber: "",
        region: "",
        target: "",
      
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setGoBackUrl("/salesperson");

        const fetchSalesPerson = async () => {
            try {
                // Validate salesPersonId and customerId
                if (!salesPersonId || !customerId) {
                    throw new Error("Sales Person ID and Customer ID are required");
                }

                console.log("Fetching sales person with salesPersonId:", salesPersonId, "and customerId:", customerId); // Debugging
                const response = await fetch(`http://localhost:3000/api/sales-persons/${salesPersonId}/${customerId}`);
                if (!response.ok) {
                    throw new Error("Sales person not found");
                }
                const data = await response.json();
                console.log("Fetched sales person data:", data); // Debugging

                // Handle array response
                const salesPerson = Array.isArray(data) ? data[0] : data;
                console.log("Extracted sales person:", salesPerson); // Debugging

                // Populate the form data if the sales person is found
                setFormData({
                    salesPersonId: salesPerson.salesPersonId,
                    customerId: salesPerson.customerId,
                    orderId: salesPerson.orderId,
                    productId: salesPerson.productId,
                    salesPersonName: salesPerson.salesPersonName,
                    emailId: salesPerson.emailId,
                    phoneNumber: salesPerson.phoneNumber,
                    region: salesPerson.region,
                    target: salesPerson.target,
                    
                });
            } catch (err) {
                console.error("Error fetching sales person:", err); // Debugging
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSalesPerson();
    }, [salesPersonId, customerId, setGoBackUrl]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <FormPageHeader />
            <div className="container">
                <div className="form-container">
                    <h2>Display Sales Person</h2>

                    {/* Display error message if sales person is not found or does not match */}
                    {error && <div className="error-message">{error}</div>}

                    <form>
                        {/* Header Box */}
                        <div className="header-box">
                            <h2>Header</h2>

                            <div className="data-container">
                                <div className="data">
                                    <label htmlFor="salesPersonId">Sales Person ID</label>
                                    <input
                                        type="text"
                                        id="salesPersonId"
                                        name="salesPersonId"
                                        value={formData.salesPersonId}
                                        
                                    />
                                </div>

                                <div className="data">
                                    <label htmlFor="customerId">Customer ID</label>
                                    <input
                                        type="text"
                                        id="customerId"
                                        name="customerId"
                                        value={formData.customerId}
                                        
                                    />
                                </div>

                                <div className="data">
                                    <label htmlFor="orderId">Order ID</label>
                                    <input
                                        type="text"
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
                                    <label htmlFor="salesPersonName">Sales Person Name</label>
                                    <input
                                        type="text"
                                        id="salesPersonName"
                                        name="salesPersonName"
                                        value={formData.salesPersonName}
                                        
                                    />
                                </div>

                                <div className="data">
                                    <label htmlFor="emailId">Contact Email</label>
                                    <input
                                        type="email"
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
                                    <label htmlFor="region">Region</label>
                                    <input
                                        type="text"
                                        id="region"
                                        name="region"
                                        value={formData.region}
                                        
                                    />
                                </div>

                                <div className="data">
                                    <label htmlFor="target">Target</label>
                                    <input
                                        type="text"
                                        id="target"
                                        name="target"
                                        value={formData.target}
                                        
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}