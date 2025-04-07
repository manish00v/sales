import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";

export default function EditReturnLineItemsForm() {
  const { setBtn, setUrl, setGoBackUrl } = useContext(FormPageHeaderContext);
  const { lineItemId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    lineItemId: "",
    productId: "",
    productName: "",
    quantityReturned: "",
    conditionOfProduct: "",
    originalPrice: "",
    refundAmount: "",
    replacementStatus: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReturnLineItem = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/return-line-items/${lineItemId}`
        );
        if (!response.ok) {
          throw new Error("Return line item not found");
        }
        const data = await response.json();
        setFormData({
          lineItemId: data.lineItemId,
          productId: data.productId,
          productName: data.productName,
          quantityReturned: data.quantityReturned,
          conditionOfProduct: data.conditionOfProduct,
          originalPrice: data.originalPrice,
          refundAmount: data.refundAmount,
          replacementStatus: data.replacementStatus,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReturnLineItem();
  }, [lineItemId]);

  useEffect(() => {
    setUrl(`/returnlineitems/${lineItemId}`);
    setGoBackUrl("/returnlineitems");
  }, [setBtn, setUrl, setGoBackUrl, lineItemId]);

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
        `http://localhost:3000/api/return-line-items/${lineItemId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update return line item");
      }

      navigate("/returnlineitems");
    } catch (err) {
      console.error("Error updating return line item:", err);
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
          <h2>Edit Return Line Items</h2>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="header-box">
              <h2>Header</h2>

              <div className="data-container">
                <div className="data">
                  <label htmlFor="lineItemId">Line Item ID</label>
                  <input
                    type="text"
                    id="lineItemId"
                    name="lineItemId"
                    value={formData.lineItemId}
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

                <div className="data">
                  <label htmlFor="productName">Product Name</label>
                  <input
                    type="text"
                    id="productName"
                    name="productName"
                    value={formData.productName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="item-box">
              <h2>Item</h2>

              <div className="data-container">
                <div className="data">
                  <label htmlFor="quantityReturned">Quantity Returned</label>
                  <input
                    type="number"
                    id="quantityReturned"
                    name="quantityReturned"
                    value={formData.quantityReturned}
                    onChange={handleChange}
                    min="0"
                    required
                  />
                </div>

                <div className="data">
                  <label htmlFor="conditionOfProduct">
                    Condition of Product
                  </label>
                  <select
                    id="conditionOfProduct"
                    name="conditionOfProduct"
                    value={formData.conditionOfProduct || ""} // Ensure fallback
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Condition</option>
                    <option value="new">New</option>
                    <option value="used">Used</option>
                    <option value="damaged">Damaged</option>
                  </select>
                </div>

                <div className="data">
                  <label htmlFor="originalPrice">Original Price</label>
                  <input
                    type="number"
                    id="originalPrice"
                    name="originalPrice"
                    value={formData.originalPrice}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    required
                  />
                </div>

                <div className="data">
                  <label htmlFor="refundAmount">Refund Amount</label>
                  <input
                    type="number"
                    id="refundAmount"
                    name="refundAmount"
                    value={formData.refundAmount}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    required
                  />
                </div>

                <div className="data">
                  <label htmlFor="replacementStatus">Replacement Status</label>
                  <select
                    id="replacementStatus"
                    name="replacementStatus"
                    value={formData.replacementStatus}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Status</option>
                    <option value="processed">Processed</option>
                    <option value="pending">Pending</option>
                    <option value="not_required">Not Required</option>
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
