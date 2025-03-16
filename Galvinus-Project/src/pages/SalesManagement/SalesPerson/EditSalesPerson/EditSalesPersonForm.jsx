import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";

export default function EditSalesPersonForm() {
  const { setBtn, setUrl, setGoBackUrl } = useContext(FormPageHeaderContext);
  const { salesPersonId } = useParams(); // Use salesPersonId from URL params
  const {customerId} = useParams();
  const navigate = useNavigate();
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

  // Fetch sales person details when the component mounts
  useEffect(() => {
    const fetchSalesPerson = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/sales-persons/${salesPersonId}/${customerId}`
        );
        if (!response.ok) {
          throw new Error("Sales person not found");
        }
        const data = await response.json();
        setFormData({
          salesPersonId: data.salesPersonId,
          customerId: data.customerId,
          orderId: data.orderId,
          productId: data.productId,
          salesPersonName: data.salesPersonName,
          emailId: data.emailId,
          phoneNumber: data.phoneNumber,
          region: data.region,
          target: data.target,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSalesPerson();
  }, [salesPersonId, customerId]);

  useEffect(() => {
    setBtn("Save");
    setUrl(`/salesperson/${salesPersonId}`);
    setGoBackUrl("/salesperson");
  }, [setBtn, setUrl, setGoBackUrl, salesPersonId]);

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
      const formattedData = {
        customerId: parseInt(formData.customerId),
        orderId: formData.orderId,
        productId: formData.productId,
        salesPersonName: formData.salesPersonName,
        emailId: formData.emailId,
        phoneNumber: formData.phoneNumber,
        region: formData.region,
        target: formData.target,
      };

      const response = await fetch(
        `http://localhost:3000/api/sales-persons/${salesPersonId}/${customerId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formattedData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update sales person");
      }

      const result = await response.json();
      console.log("Sales person updated successfully:", result);

      // Navigate back to the sales persons list page
      navigate("/salesperson");
    } catch (err) {
      console.error("Error updating sales person:", err);
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
          <h2>Edit Sales Person</h2>

          {/* Display error message if any */}
          {error && <div className="error-message">{error}</div>}

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
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
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