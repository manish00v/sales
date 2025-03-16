import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";

export default function DisplayLineItemsForm() {
    const { setBtn, setGoBackUrl } = useContext(FormPageHeaderContext);
    const { orderLineItemId, productId } = useParams(); // Extract orderLineItemId and productId from the URL
    const [formData, setFormData] = useState({
        orderLineItemId: "",
        productId: "",
        orderId: "",
        customerId: "",
        quantity: "",
        unitPrice: "",
        discount: "",
        tax: "",
        totalLinePrice: "",
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setBtn("NoBtn");
        setGoBackUrl("/lineitems");

        const fetchLineItem = async () => {
            try {
                // Validate orderLineItemId and productId
                if (!orderLineItemId || !productId) {
                    throw new Error("Order Line Item ID and Product ID are required");
                }

                console.log("Fetching line item with orderLineItemId:", orderLineItemId, "and productId:", productId); // Debugging
                const response = await fetch(`http://localhost:3000/api/line-items/${orderLineItemId}/${productId}`);
                if (!response.ok) {
                    throw new Error("Line item not found");
                }
                const data = await response.json();
                console.log("Fetched line item data:", data); // Debugging

                // Handle array response
                const lineItem = Array.isArray(data) ? data[0] : data;
                console.log("Extracted line item:", lineItem); // Debugging

                // Check if the fetched line item matches the provided orderLineItemId and productId
                if (lineItem.orderLineItemId !== parseInt(orderLineItemId) || lineItem.productId !== parseInt(productId)) {
                    throw new Error("Order Line Item ID and Product ID do not match");
                }

                // Populate the form data if the line item is found
                setFormData({
                    orderLineItemId: lineItem.orderLineItemId,
                    productId: lineItem.productId,
                    orderId: lineItem.orderId,
                    customerId: lineItem.customerId,
                    quantity: lineItem.quantity,
                    unitPrice: lineItem.unitPrice,
                    discount: lineItem.discount,
                    tax: lineItem.tax,
                    totalLinePrice: lineItem.totalLinePrice,
                });
            } catch (err) {
                console.error("Error fetching line item:", err); // Debugging
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchLineItem();
    }, [orderLineItemId, productId, setBtn, setGoBackUrl]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <FormPageHeader />
            <div className="container">
                <div className="form-container">
                    <h2>Display Line Items</h2>

                    {/* Display error message if line item is not found or does not match */}
                    {error && <div className="error-message">{error}</div>}

                    <form>
                        {/* Header Box */}
                        <div className="header-box">
                            <h2>Header</h2>

                            <div className="data-container">
                                <div className="data">
                                    <label htmlFor="orderLineItemId">Order Line Item ID</label>
                                    <input
                                        type="text"
                                        id="orderLineItemId"
                                        name="orderLineItemId"
                                        value={formData.orderLineItemId}
                                        
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
                            </div>
                        </div>

                        {/* Item Box */}
                        <div className="item-box">
                            <h2>Item</h2>

                            <div className="data-container">
                                <div className="data">
                                    <label htmlFor="quantity">Quantity</label>
                                    <input
                                        type="text"
                                        id="quantity"
                                        name="quantity"
                                        value={formData.quantity}
                                        
                                    />
                                </div>

                                <div className="data">
                                    <label htmlFor="unitPrice">Unit Price</label>
                                    <input
                                        type="text"
                                        id="unitPrice"
                                        name="unitPrice"
                                        value={formData.unitPrice}
                                        
                                    />
                                </div>

                                <div className="data">
                                    <label htmlFor="discount">Discount</label>
                                    <input
                                        type="text"
                                        id="discount"
                                        name="discount"
                                        value={formData.discount}
                                     
                                    />
                                </div>

                                <div className="data">
                                    <label htmlFor="tax">Tax</label>
                                    <input
                                        type="text"
                                        id="tax"
                                        name="tax"
                                        value={formData.tax}
                                       
                                    />
                                </div>

                                <div className="data">
                                    <label htmlFor="totalLinePrice">Total Line Price</label>
                                    <input
                                        type="text"
                                        id="totalLinePrice"
                                        name="totalLinePrice"
                                        value={formData.totalLinePrice}
                                       
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