// import { useState } from "react";
// import "../../../../components/Layout/Styles/BoxFormStyles.css";

// export default function CreateSalesOrderForm() {
//     const [formData, setFormData] = useState({
//         customerId: "",
//         orderId: "",
//         productId: "",
//         orderDate: "",
//         requiredDate: "",
//         deliveryBlock: "",
//         orderStatus: "pending",
//         paymentStatus: "unpaid",
//         totalAmount: "",
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prevData) => ({
//             ...prevData,
//             [name]: value,
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             // Check if orderId already exists
//             const orderCheckResponse = await fetch(`http://localhost:3000/api/sales-orders/${formData.orderId}`);
//             if (orderCheckResponse.ok) {
//               alert(`Error: Order ID ${formData.orderId} is already in the database.`);
//                 return;
//             }

//             // Check if customerId exists in the database
//             const customerCheckResponse = await fetch(`http://localhost:3000/api/customers/${formData.customerId}`);
//             if (!customerCheckResponse.ok) {
//                 alert(`Error: Customer ID ${formData.customerId} does not exist. Please create the customer first.`);
//                 return;
//             }

//             // Check if productId exists in the database
//             const productCheckResponse = await fetch(`http://localhost:3001/api/products/${formData.productId}`);
//             if (!productCheckResponse.ok) {
//                 alert(`Error: Product ID ${formData.productId} does not exist. Please create the product first.`);
//                 return;
//             }

//             // Format data for submission
//             const formattedData = {
//                 ...formData,
//                 totalAmount: parseFloat(formData.totalAmount), // Convert total to a number
//                 orderDate: new Date(formData.orderDate).toISOString(), // Format dates
//                 requiredDate: new Date(formData.requiredDate).toISOString(),
// 				orderId: formData.orderId
//             };

//             // Submit the sales order
//             const response = await fetch("http://localhost:3000/api/sales-orders", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(formattedData),
//             });

//             if (!response.ok) {
//                 const errorResponse = await response.json();
//                 console.error("Backend error:", errorResponse);
//                 throw new Error(errorResponse.message || "Failed to create sales order");
//             }

//             const result = await response.json();
//             console.log("Sales order created successfully:", result);
//             alert("Sales order created successfully!");
//         } catch (error) {
//             console.error("Error creating sales order:", error);
//             alert("Error creating sales order. Please try again.");
//         }
//     };

//     return (
//         <div className="container">
//             <div className="form-container">
//                 <h2>Create Sales Order</h2>

//                 <form onSubmit={handleSubmit}>
//                     {/* Header Box */}
//                     <div className="header-box">
//                         <h2>Header</h2>

//                         <div className="data-container">
//                             <div className="data">
//                                 <label htmlFor="orderId">Order ID</label>
//                                 <input
//                                     type="text"
//                                     id="orderId"
//                                     name="orderId"
//                                     placeholder="(Primary Key)"
//                                     value={formData.orderId}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                             </div>

//                             <div className="data">
//                                 <label htmlFor="customerId">Customer ID</label>
//                                 <input
//                                     type="text"
//                                     id="customerId"
//                                     name="customerId"
//                                     value={formData.customerId}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                             </div>

//                             <div className="data">
//                                 <label htmlFor="productId">Product ID</label>
//                                 <input
//                                     type="text"
//                                     id="productId"
//                                     name="productId"
//                                     value={formData.productId}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                             </div>
//                         </div>
//                     </div>

//                     {/* Item Box */}
//                     <div className="item-box">
//                         <h2>Item</h2>

//                         <div className="data-container">
//                             <div className="data">
//                                 <label htmlFor="orderDate">Order Date</label>
//                                 <input
//                                     type="date"
//                                     id="orderDate"
//                                     name="orderDate"
//                                     value={formData.orderDate}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                             </div>

//                             <div className="data">
//                                 <label htmlFor="requiredDate">Required Date</label>
//                                 <input
//                                     type="date"
//                                     id="requiredDate"
//                                     name="requiredDate"
//                                     value={formData.requiredDate}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                             </div>

//                             <div className="data">
//                                 <label htmlFor="deliveryBlock">Delivery Block</label>
//                                 <input
//                                     type="text"
//                                     id="deliveryBlock"
//                                     name="deliveryBlock"
//                                     value={formData.deliveryBlock}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                             </div>

//                             {/* <div className="data">
//                                 <label htmlFor="orderStatus">Order Status</label>
//                                 <select
//                                     id="orderStatus"
//                                     name="orderStatus"
//                                     value={formData.orderStatus}
//                                     onChange={handleChange}
//                                 >
//                                     <option value="pending">Pending</option>
//                                     <option value="confirmed">Confirmed</option>
//                                     <option value="shipped">Shipped</option>
//                                     <option value="delivered">Delivered</option>
//                                     <option value="cancelled">Cancelled</option>
//                                 </select>
//                             </div> */}

//                             <div className="data">
//                                 <label htmlFor="paymentStatus">Payment Status</label>
//                                 <select
//                                     id="paymentStatus"
//                                     name="paymentStatus"
//                                     value={formData.paymentStatus}
//                                     onChange={handleChange}
//                                 >
//                                     <option value="unpaid">Unpaid</option>
//                                     <option value="partiallyPaid">Partially Paid</option>
//                                     <option value="fullyPaid">Fully Paid</option>
//                                 </select>
//                             </div>

//                             {/* <div className="data">
//                                 <label htmlFor="totalAmount">Total Amount</label>
//                                 <input
//                                     type="float"
//                                     id="totalAmount"
//                                     name="totalAmount"
//                                     value={formData.totalAmount}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                             </div> */}
//                         </div>
//                     </div>

//                     {/* Submit Button */}
//                     <div className="submit-button">
//                         <button type="submit">Create Sales Order</button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// }


import { useState, useEffect } from "react";
import "./createSalesOrder.css";

export default function CreateSalesOrderForm() {
    const [formData, setFormData] = useState({
        customerId: "",
        orderId: "",
        productId: "",
        orderDate: "",
        requiredDate: "",
        deliveryBlock: "",
        paymentStatus: "unpaid",
        totalAmount: "",
        taxes: "18",
        items: [
            { id: 1, product: "Watch", quantity: 1.00, unitPrice: 100.00, amount: 100.00 },
            { id: 2, product: "Watch", quantity: 1.00, unitPrice: 100.00, amount: 100.00 },
            { id: 3, product: "Watch", quantity: 1.00, unitPrice: 0.00, amount: 0.00 },
            { id: 4, product: "Watch", quantity: 1.00, unitPrice: 100.00, amount: 100.00 },
        ],
        expirationDate: "02/05/2025",
        pricelist: "",
        paymentTerms: "Immediate",
        gstTreatment: "Consumer"
    });

    const [activeTab, setActiveTab] = useState("order-lines");
    const [untaxedAmount, setUntaxedAmount] = useState(0);
    const [taxAmount, setTaxAmount] = useState(0);
    const [grandTotal, setGrandTotal] = useState(0);

    // Calculate totals whenever items change
    useEffect(() => {
        const newUntaxedAmount = formData.items.reduce((sum, item) => sum + item.amount, 0);
        const newTaxAmount = newUntaxedAmount * (parseFloat(formData.taxes) / 100);
        const newGrandTotal = newUntaxedAmount + newTaxAmount;
        
        setUntaxedAmount(newUntaxedAmount);
        setTaxAmount(newTaxAmount);
        setGrandTotal(newGrandTotal);
        
        // Update the totalAmount in formData
        setFormData(prev => ({
            ...prev,
            totalAmount: newGrandTotal.toFixed(2)
        }));
    }, [formData.items, formData.taxes]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleItemChange = (id, field, value) => {
        setFormData(prevData => {
            const updatedItems = prevData.items.map(item => {
                if (item.id === id) {
                    const updatedItem = { ...item, [field]: parseFloat(value) || 0 };
                    
                    // Recalculate amount if quantity or unitPrice changes
                    if (field === 'quantity' || field === 'unitPrice') {
                        updatedItem.amount = updatedItem.quantity * updatedItem.unitPrice;
                    }
                    
                    return updatedItem;
                }
                return item;
            });
            
            return {
                ...prevData,
                items: updatedItems
            };
        });
    };

    const handleProductChange = (id, value) => {
        setFormData(prevData => ({
            ...prevData,
            items: prevData.items.map(item => 
                item.id === id ? { ...item, product: value } : item
            )
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Check if orderId already exists
            const orderCheckResponse = await fetch(`http://localhost:3000/api/sales-orders/${formData.orderId}`);
            if (orderCheckResponse.ok) {
                alert(`Error: Order ID ${formData.orderId} is already in the database.`);
                return;
            }

            // Check if customerId exists in the database
            const customerCheckResponse = await fetch(`http://localhost:3000/api/customers/${formData.customerId}`);
            if (!customerCheckResponse.ok) {
                alert(`Error: Customer ID ${formData.customerId} does not exist. Please create the customer first.`);
                return;
            }

            // Check if productId exists in the database
            const productCheckResponse = await fetch(`http://localhost:3001/api/products/${formData.productId}`);
            if (!productCheckResponse.ok) {
                alert(`Error: Product ID ${formData.productId} does not exist. Please create the product first.`);
                return;
            }

            // Format data for submission
            const formattedData = {
                ...formData,
                totalAmount: grandTotal,
                orderDate: new Date(formData.orderDate).toISOString(),
                requiredDate: new Date(formData.requiredDate).toISOString(),
                orderId: formData.orderId
            };

            // Submit the sales order
            const response = await fetch("http://localhost:3000/api/sales-orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formattedData),
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                console.error("Backend error:", errorResponse);
                throw new Error(errorResponse.message || "Failed to create sales order");
            }

            const result = await response.json();
            console.log("Sales order created successfully:", result);
            alert("Sales order created successfully!");
        } catch (error) {
            console.error("Error creating sales order:", error);
            alert("Error creating sales order. Please try again.");
        }
    };

    const addNewItem = () => {
        const newId = formData.items.length > 0 ? Math.max(...formData.items.map(item => item.id)) + 1 : 1;
        setFormData({
            ...formData,
            items: [
                ...formData.items,
                {
                    id: newId,
                    product: "",
                    quantity: 1.00,
                    unitPrice: 0.00,
                    amount: 0.00
                }
            ]
        });
    };

    const removeItem = (id) => {
        setFormData({
            ...formData,
            items: formData.items.filter(item => item.id !== id)
        });
    };

    return (
        <div className="sales-order-container">
            <form onSubmit={handleSubmit} className="sales-form">
                <div className="form-header">
                    <div className="form-group">
                        <label>Customer</label>
                        <input 
                            type="text" 
                            name="customerId" 
                            placeholder="Search for a customer..." 
                            value={formData.customerId}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    
                    <div className="form-row">
                        <div className="form-group">
                            <label>Expiration *</label>
                            <input 
                                type="text" 
                                name="expirationDate" 
                                value={formData.expirationDate}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    
                    <div className="form-row">
                        <div className="form-group">
                            <label>Payment Terms</label>
                            <input 
                                type="text" 
                                name="paymentTerms"
                                value={formData.paymentTerms}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>

                <div className="tabs-container">
                    <div className="tabs">
                        <button 
                            type="button"
                            className={`tab ${activeTab === "order-lines" ? "active" : ""}`}
                            onClick={() => setActiveTab("order-lines")}
                        >
                            Order Lines
                        </button>
                        <button 
                            type="button"
                            className={`tab ${activeTab === "other-info" ? "active" : ""}`}
                            onClick={() => setActiveTab("other-info")}
                        >
                            Other Info
                        </button>
                    </div>

                    <div className="tab-content">
                        {activeTab === "order-lines" && (
                            <div className="order-lines-tab">
                                <table className="order-table">
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Product</th>
                                            <th>Quantity</th>
                                            <th>Unit Price</th>
                                            <th>Taxes</th>
                                            <th>Amount</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {formData.items.map((item) => (
                                            <tr key={item.id}>
                                                <td className="drag-handle">☰</td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        value={item.product}
                                                        onChange={(e) => handleProductChange(item.id, e.target.value)}
                                                        className="product-input"
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        min="0"
                                                        step="0.01"
                                                        value={item.quantity}
                                                        onChange={(e) => handleItemChange(item.id, 'quantity', e.target.value)}
                                                        className="quantity-input"
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        min="0"
                                                        step="0.01"
                                                        value={item.unitPrice}
                                                        onChange={(e) => handleItemChange(item.id, 'unitPrice', e.target.value)}
                                                        className="price-input"
                                                    />
                                                </td>
                                                <td className="tax-cell">{formData.taxes}%</td>
                                                <td>₹ {item.amount.toFixed(2)}</td>
                                                <td>
                                                    <button 
                                                        type="button" 
                                                        className="delete-btn"
                                                        onClick={() => removeItem(item.id)}
                                                    >
                                                        🗑️
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                
                                <div className="table-actions">
                                    <button type="button" className="add-btn" onClick={addNewItem}>Add a product</button>
                                </div>
                                
                                <div className="totals-section">
                                    <div className="total-row">
                                        <span>Untaxed Amount:</span>
                                        <span>₹ {untaxedAmount.toFixed(2)}</span>
                                    </div>
                                    <div className="total-row">
                                        <span>Tax ({formData.taxes}%):</span>
                                        <span>₹ {taxAmount.toFixed(2)}</span>
                                    </div>
                                    <div className="total-row grand-total">
                                        <span>Total:</span>
                                        <span>₹ {grandTotal.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        {activeTab === "other-info" && (
                            <div className="other-info-tab">
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="orderId">Order ID</label>
                                        <input
                                            type="text"
                                            id="orderId"
                                            name="orderId"
                                            placeholder="(Primary Key)"
                                            value={formData.orderId}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    
                                    <div className="form-group">
                                        <label htmlFor="orderDate">Order Date</label>
                                        <input
                                            type="date"
                                            id="orderDate"
                                            name="orderDate"
                                            value={formData.orderDate}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    
                                    <div className="form-group">
                                        <label htmlFor="requiredDate">Required Date</label>
                                        <input
                                            type="date"
                                            id="requiredDate"
                                            name="requiredDate"
                                            value={formData.requiredDate}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    
                                    <div className="form-group">
                                        <label htmlFor="deliveryBlock">Delivery Block</label>
                                        <input
                                            type="text"
                                            id="deliveryBlock"
                                            name="deliveryBlock"
                                            value={formData.deliveryBlock}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    
                                    <div className="form-group">
                                        <label htmlFor="paymentStatus">Payment Status</label>
                                        <select
                                            id="paymentStatus"
                                            name="paymentStatus"
                                            value={formData.paymentStatus}
                                            onChange={handleChange}
                                        >
                                            <option value="unpaid">Unpaid</option>
                                            <option value="partiallyPaid">Partially Paid</option>
                                            <option value="fullyPaid">Fully Paid</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                
                <div className="form-footer">
                    <button type="submit" className="submit-btn">Create Sales Order</button>
                </div>
            </form>
        </div>
    );
}