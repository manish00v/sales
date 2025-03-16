import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";

export default function EditCustomerForm() {
  const { setBtn, setUrl, setGoBackUrl } = useContext(FormPageHeaderContext);
  const { customerId, productId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    customerId: "",
    productId: "",
    customerName: "",
    emailId: "",
    phoneNumber: "",
    billingAddress: "",
    shippingAddress: "",
    customerGroup: "Whole Sale",
    creditLimit: "",
    status: "Active",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch customer details when the component mounts
  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/customers/${customerId}/${productId}`
        );
        if (!response.ok) {
          throw new Error("Customer not found");
        }
        const data = await response.json();
        setFormData({
          customerId: data.customerId,
          productId: data.productId,
          customerName: data.customerName,
          emailId: data.emailId,
          phoneNumber: data.phoneNumber,
          billingAddress: data.billingAddress,
          shippingAddress: data.shippingAddress,
          customerGroup: data.customerGroup,
          creditLimit: data.creditLimit,
          status: data.status,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomer();
  }, [customerId, productId]);

  useEffect(() => {
    setBtn("Save");
    setUrl(`/customer/${customerId}`);
    setGoBackUrl("/customer");
  }, [setBtn, setUrl, setGoBackUrl, customerId]);

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
      const response = await fetch(
        `http://localhost:3000/api/customers/${customerId}/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update customer");
      }

      const result = await response.json();
      console.log("Customer updated successfully:", result);

      // Navigate back to the customers list page
      navigate("/customer");
    } catch (err) {
      console.error("Error updating customer:", err);
      setError(err.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <FormPageHeader />

      <div className="container">
        <div className="form-container">
          <h2>Edit Customer</h2>

          {/* Display error message if any */}
          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit}>
            {/* Header Box */}
            <div className="header-box">
              <h2>Header</h2>

              <div className="data-container">
                <div className="data">
                  <label htmlFor="customerId">Customer ID</label>
                  <input
                    type="text"
                    id="customerId"
                    name="customerId"
                    value={formData.customerId}
                    readOnly
                  />
                </div>

                <div className="data">
                  <label htmlFor="productId">Product ID</label>
                  <input
                    type="text"
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
                    type="tel"
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
                    type="text"
                    id="creditLimit"
                    name="creditLimit"
                    placeholder="Max Credit Allowed"
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

            <button type="submit" className="submit-btn">
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </>
  );
}