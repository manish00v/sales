import { useState } from "react";
import "../../../../components/Layout/Styles/BoxFormStyles.css";

export default function CreateSalesPersonForm() {
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Check if salesPersonId already exists
            const salesPersonCheckResponse = await fetch(`http://localhost:3000/api/sales-persons/${formData.salesPersonId}`);
            if (salesPersonCheckResponse.ok) {
                alert("Error: Sales Person ID is already in the database.");
                return;
            }

            // Check if customerId exists in the database
            const customerCheckResponse = await fetch(`http://localhost:3000/api/customers/${formData.customerId}`);
            if (!customerCheckResponse.ok) {
                alert("Error: Customer ID does not exist. Please create the customer first.");
                return;
            }

            // Check if orderId exists in the database
            const orderCheckResponse = await fetch(`http://localhost:3000/api/sales-orders/${formData.orderId}`);
            if (!orderCheckResponse.ok) {
                alert("Error: Order ID does not exist. Please create the order first.");
                return;
            }

            // Check if productId exists in the database
            // const productCheckResponse = await fetch(`http://localhost:3000/api/products/${formData.productId}`);
            // if (!productCheckResponse.ok) {
            //     alert("Error: Product ID does not exist. Please create the product first.");
            //     return;
            // }

            // Format data for submission
            const formattedData = {
                ...formData,
                salesPersonId: parseInt(formData.salesPersonId),
                customerId: parseInt(formData.customerId),
                orderId: parseInt(formData.orderId),
                productId: parseInt(formData.productId),
            };

            // Submit the sales person data
            const response = await fetch("http://localhost:3000/api/sales-persons", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formattedData),
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                console.error("Backend error:", errorResponse);
                throw new Error(errorResponse.message || "Failed to create sales person");
            }

            const result = await response.json();
            console.log("Sales person created successfully:", result);
            alert("Sales person created successfully!");
        } catch (error) {
            console.error("Error creating sales person:", error);
            alert("Error creating sales person. Please try again.");
        }
    };

    return (
        <div className="container">
            <div className="form-container">
                <h2>Create Sales Person</h2>

                <form onSubmit={handleSubmit}>
                    {/* Header Box */}
                    <div className="header-box">
                        <h2>Header</h2>

                        <div className="data-container">
                            <div className="data">
                                <label htmlFor="salesPersonId">Sales Person ID</label>
                                <input
                                    type="number"
                                    id="salesPersonId"
                                    name="salesPersonId"
                                    placeholder="(Primary Key)"
                                    value={formData.salesPersonId}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="data">
                                <label htmlFor="customerId">Customer ID</label>
                                <input
                                    type="number"
                                    id="customerId"
                                    name="customerId"
                                    value={formData.customerId}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="data">
                                <label htmlFor="orderId">Order ID</label>
                                <input
                                    type="number"
                                    id="orderId"
                                    name="orderId"
                                    value={formData.orderId}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="data">
                                <label htmlFor="productId">Product ID</label>
                                <input
                                    type="number"
                                    id="productId"
                                    name="productId"
                                    value={formData.productId}
                                    onChange={handleChange}
                                    required
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
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="data">
                                <label htmlFor="emailId">Contact Email</label>
                                <input
                                    type="email"
                                    id="emailId"
                                    name="emailId"
                                    value={formData.emailId}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="data">
                                <label htmlFor="phoneNumber">Phone Number</label>
                                <input
                                    type="number"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="data">
                                <label htmlFor="region">Region</label>
                                <input
                                    type="text"
                                    id="region"
                                    name="region"
                                    value={formData.region}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="data">
                                <label htmlFor="target">Target</label>
                                <select
                                    id="target"
                                    name="target"
                                    value={formData.target}
                                    onChange={handleChange}
                                >
                                    <option value="Monthly">Monthly</option>
                                    <option value="Quarterly">Quarterly</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="submit-button">
                        <button type="submit">Create Sales Person</button>
                    </div>
                </form>
            </div>
        </div>
    );
}