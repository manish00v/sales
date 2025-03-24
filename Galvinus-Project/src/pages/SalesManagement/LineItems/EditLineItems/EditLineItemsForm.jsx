import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";

export default function EditLineItemsForm() {
  const { setUrl, setGoBackUrl } = useContext(FormPageHeaderContext);
  const { orderLineItemId } = useParams(); // Use orderLineItemsId from URL params
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    orderLineItemId: "",
    productId: "",
    quantity: "",
    unitPrice: "",
    discount: "",
    tax: "",
    totalLinePrice: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch line item details when the component mounts
  useEffect(() => {
    const fetchLineItem = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/line-items/${orderLineItemId}`
        );
        if (!response.ok) {
          throw new Error("Line item not found");
        }
        const data = await response.json();
        setFormData({
          orderLineItemId: data.orderLineItemId,
          productId: data.productId,
          quantity: data.quantity,
          unitPrice: data.unitPrice,
          discount: data.discount,
          tax: data.tax,
          totalLinePrice: data.totalLinePrice,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLineItem();
  }, [orderLineItemId]);

  useEffect(() => {
    setUrl(`/lineitems/${orderLineItemId}`);
    setGoBackUrl("/lineitems");
  }, [setUrl, setGoBackUrl, orderLineItemId]);

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
	  // Format data for submission
	  const formattedData = {
		productId: formData.productId,
		quantity: parseInt(formData.quantity), // Convert to number
		unitPrice: parseFloat(formData.unitPrice), // Convert to number
		totalLinePrice: parseFloat(formData.totalLinePrice), // Convert to number
    discount: parseFloat(formData.discount),
    tax: parseFloat(formData.tax),
	  };
  
	  const response = await fetch(
		`http://localhost:3000/api/line-items/${orderLineItemId}`,
		{
		  method: "PUT",
		  headers: {
			"Content-Type": "application/json",
		  },
		  body: JSON.stringify(formattedData),
		}
	  );
  
	  if (!response.ok) {
		throw new Error("Failed to update line item");
	  }
  
	  const result = await response.json();
	  console.log("Line item updated successfully:", result);
  
	  // Navigate back to the line items list page
	  navigate("/lineitems");
	} catch (err) {
	  console.error("Error updating line item:", err);
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
          <h2>Edit Line Item</h2>

          {/* Display error message if any */}
          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit}>
            {/* Header Box */}
            <div className="header-box">
              <h2>Header</h2>

              <div className="data-container">
                <div className="data">
                  <label htmlFor="orderLineItemId">Order Line Items ID</label>
                  <input
                    type="text"
                    id="orderLineItemId"
                    name="orderLineItemId"
                    value={formData.orderLineItemId}
                    onChange={handleChange}
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
                  <label htmlFor="quantity">Quantity</label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="data">
                  <label htmlFor="unitPrice">Unit Price</label>
                  <input
                    type="number"
                    id="unitPrice"
                    name="unitPrice"
                    value={formData.unitPrice}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="data">
                                <label htmlFor="discount">Discount</label>
                                <input
                                    type="number"
                                    id="discount"
                                    name="discount"
                                    value={formData.discount}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="data">
                                <label htmlFor="tax">Tax</label>
                                <input
                                    type="number"
                                    id="tax"
                                    name="tax"
                                    value={formData.tax}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                <div className="data">
                  <label htmlFor="totalLinePrice">Total Price</label>
                  <input
                    type="number"
                    id="totalLinePrice"
                    name="totalLinePrice"
                    value={formData.totalLinePrice}
                    onChange={handleChange}
                    required
                  />
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