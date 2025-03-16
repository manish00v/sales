import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";

export default function DisplaySalesOrderForm() {
    const { setBtn, setGoBackUrl } = useContext(FormPageHeaderContext);
    const { orderId, customerId } = useParams(); // Extract orderId and customerId from the URL
    const [formData, setFormData] = useState({
        orderId: "",
        customerId: "",
        productId: "",
        orderDate: "",
        requiredDate: "",
        deliveryBlock: "",
        orderStatus: "",
        paymentStatus: "",
        totalAmount: "",
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setBtn("NoBtn");
        setGoBackUrl("/salesorder");

        const fetchSalesOrder = async () => {
            try {
                // Validate orderId and customerId
                if (!orderId || !customerId) {
                    throw new Error("Order ID and Customer ID are required");
                }

                console.log("Fetching sales order with orderId:", orderId, "and customerId:", customerId); // Debugging
                const response = await fetch(`http://localhost:3000/api/sales-orders/${orderId}/${customerId}`);
                if (!response.ok) {
                    throw new Error("Sales order not found");
                }
                const data = await response.json();
                console.log("Fetched sales order data:", data); // Debugging

                // Handle array response
                const salesOrder = Array.isArray(data) ? data[0] : data;
                console.log("Extracted sales order:", salesOrder); // Debugging

                // Check if the fetched sales order matches the provided orderId and customerId
                if (salesOrder.orderId !== parseInt(orderId) || salesOrder.customerId !== parseInt(customerId)) {
                    throw new Error("Order ID and Customer ID do not match");
                }

                // Populate the form data if the sales order is found
                setFormData({
                    orderId: salesOrder.orderId,
                    customerId: salesOrder.customerId,
                    productId: salesOrder.productId,
                    orderDate: salesOrder.orderDate.split("T")[0], // Extract date part
                    requiredDate: salesOrder.requiredDate.split("T")[0], // Extract date part
                    deliveryBlock: salesOrder.deliveryBlock,
                    orderStatus: salesOrder.orderStatus,
                    paymentStatus: salesOrder.paymentStatus,
                    totalAmount: salesOrder.totalAmount,
                });
            } catch (err) {
                console.error("Error fetching sales order:", err); // Debugging
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSalesOrder();
    }, [orderId, customerId, setBtn, setGoBackUrl]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <FormPageHeader />
            <div className="container">
                <div className="form-container">
                    <h2>Display Sales Order</h2>

                    {/* Display error message if sales order is not found or does not match */}
                    {error && <div className="error-message">{error}</div>}

                    <form>
                        {/* Header Box */}
                        <div className="header-box">
                            <h2>Header</h2>

                            <div className="data-container">
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
                                    <label htmlFor="customerId">Customer ID</label>
                                    <input
                                        type="text"
                                        id="customerId"
                                        name="customerId"
                                        value={formData.customerId}
                                        
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
                                    <label htmlFor="orderDate">Order Date</label>
                                    <input
                                        type="date"
                                        id="orderDate"
                                        name="orderDate"
                                        value={formData.orderDate}
                                      
                                    />
                                </div>

                                <div className="data">
                                    <label htmlFor="requiredDate">Required Date</label>
                                    <input
                                        type="date"
                                        id="requiredDate"
                                        name="requiredDate"
                                        value={formData.requiredDate}
                                       
                                    />
                                </div>

                                <div className="data">
                                    <label htmlFor="deliveryBlock">Delivery Block</label>
                                    <input
                                        type="text"
                                        id="deliveryBlock"
                                        name="deliveryBlock"
                                        value={formData.deliveryBlock}
                                        
                                    />
                                </div>

                                <div className="data">
                                    <label htmlFor="orderStatus">Order Status</label>
                                    <input
                                        type="text"
                                        id="orderStatus"
                                        name="orderStatus"
                                        value={formData.orderStatus}
                                        
                                    />
                                </div>

                                <div className="data">
                                    <label htmlFor="paymentStatus">Payment Status</label>
                                    <input
                                        type="text"
                                        id="paymentStatus"
                                        name="paymentStatus"
                                        value={formData.paymentStatus}
                                       
                                    />
                                </div>

                                <div className="data">
                                    <label htmlFor="totalAmount">Total</label>
                                    <input
                                        type="text"
                                        id="totalAmount"
                                        name="totalAmount"
                                        value={formData.totalAmount}
                                       
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