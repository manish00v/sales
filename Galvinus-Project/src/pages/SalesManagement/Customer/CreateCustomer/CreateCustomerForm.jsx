import { useState } from "react";
import "../../../../components/Layout/Styles/BoxFormStyles.css";

export default function CreateCustomerForm() {
    const [formData, setFormData] = useState({
        customerId: "",
        customerName: "",
        emailId: "",
        phoneNumber: "",
        billingAddress: "",
        shippingAddress: "",
        customerGroup: "Whole Sale",
        creditLimit: "",
        status: "Active"
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
            // Check if customer ID already exists
            const customerCheckResponse = await fetch(`http://localhost:3000/api/customers/${formData.customerId}`);
            if (customerCheckResponse.ok) {
                alert("Error: Customer ID is already exist. Please try a new ID .");
                return;
            }

            // Format data for submission
            // const formattedData = {...formData, customerId: parseInt(formData.customerId)}
            const formattedData = { ...formData, creditLimit: parseFloat(formData.creditLimit),  customerId: parseInt(formData.customerId) };

            // Submit the customer data
            const response = await fetch("http://localhost:3000/api/customers", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formattedData),
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                console.error("Backend error:", errorResponse);
                throw new Error(errorResponse.message || "Failed to create customer");
            }

            const result = await response.json();
            console.log("Customer created successfully:", result);
            alert("Customer created successfully!");
        } catch (error) {
            console.error("Error creating customer:", error);
            alert("Error creating customer. Please try again.");
        }
    };

    return (
        <div className="container">
            <div className="form-container">
                <h2>Create Customer</h2>

                <form onSubmit={handleSubmit}>
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
                                <label htmlFor="customerName">Customer Name</label>
                                <input
                                    type="text"
                                    id="customerName"
                                    name="customerName"
                                    value={formData.customerName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="data">
                                <label htmlFor="emailId">Email ID</label>
                                <input
                                    type="emailId"
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
                                <label htmlFor="billingAddress">Billing Address</label>
                                <input
                                    type="text"
                                    id="billingAddress"
                                    name="billingAddress"
                                    value={formData.billingAddress}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="data">
                                <label htmlFor="shippingAddress">Shipping Address</label>
                                <input
                                    type="text"
                                    id="shippingAddress"
                                    name="shippingAddress"
                                    value={formData.shippingAddress}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="data">
                                <label htmlFor="customerGroup">Customer Group</label>
                                <select
                                    id="customerGroup"
                                    name="customerGroup"
                                    value={formData.customerGroup}
                                    onChange={handleChange}
                                >
                                    <option>Whole Sale</option>
                                    <option>Retail</option>
                                </select>
                            </div>

                            <div className="data">
                                <label htmlFor="creditLimit">Credit Limit</label>
                                <input
                                    type="number"
                                    id="creditLimit"
                                    name="creditLimit"
                                    value={formData.creditLimit}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="data">
                                <label htmlFor="status">Status</label>
                                <select
                                    id="status"
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                >
                                    <option>Active</option>
                                    <option>Inactive</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="submit-button">
                        <button type="submit">Create Customer</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
