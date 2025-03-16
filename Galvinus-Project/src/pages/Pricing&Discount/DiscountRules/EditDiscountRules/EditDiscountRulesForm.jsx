import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";

export default function EditDiscountRulesForm() {
  const { setBtn, setUrl, setGoBackUrl } = useContext(FormPageHeaderContext);
  const { discountId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    discountId: "",
    productId: "",
    applicableTo: "",
    criteria: "",
    discountType: "",
    discountValue: "",
    effectiveDate: "",
    expiryDate: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch discount rule details when the component mounts
  useEffect(() => {
    const fetchDiscountRule = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/discount-rules/${discountId}`
        );
        if (!response.ok) {
          throw new Error("Discount rule not found");
        }
        const data = await response.json();
        setFormData({
          discountId: data.discountId,
          productId: data.productId,
          applicableTo: data.applicableTo,
          criteria: data.criteria,
          discountType: data.discountType,
          discountValue: data.discountValue,
          effectiveDate: data.effectiveDate.split("T")[0], // Extract date part
          expiryDate: data.expiryDate.split("T")[0], // Extract date part
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDiscountRule();
  }, [discountId]);

  useEffect(() => {
    setBtn("Save");
    setUrl(`/discountrules/${discountId}`);
    setGoBackUrl("/discountrules");
  }, [setBtn, setUrl, setGoBackUrl, discountId]);

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
        ...formData,
        discountValue: parseFloat(formData.discountValue), // Convert to number
        effectiveDate: new Date(formData.effectiveDate).toISOString(), // Ensure proper date format
        expiryDate: new Date(formData.expiryDate).toISOString(), // Ensure proper date format
      };

      const response = await fetch(
        `http://localhost:3000/api/discount-rules/${discountId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formattedData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update discount rule");
      }

      const result = await response.json();
      console.log("Discount rule updated successfully:", result);

      // Navigate back to the discount rules list page
      navigate("/discountrules");
    } catch (err) {
      console.error("Error updating discount rule:", err);
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
          <h2>Edit Discount Rules</h2>

          {/* Display error message if any */}
          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit}>
            {/* Header Box */}
            <div className="header-box">
              <h2>Header</h2>

              <div className="data-container">
                <div className="data">
                  <label htmlFor="discountId">Discount ID</label>
                  <input
                    type="number"
                    id="discountId"
                    name="discountId"
                    value={formData.discountId}
                    disabled
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
                  <label htmlFor="applicableTo">Applicable to</label>
                  <select
                    id="applicableTo"
                    name="applicableTo"
                    value={formData.applicableTo}
                    onChange={handleChange}
                  >
                    <option>Product</option>
                    <option>Category</option>
                    <option>Order Total</option>
                  </select>
                </div>

                <div className="data">
                  <label htmlFor="criteria">Criteria</label>
                  <input
                    type="text"
                    id="criteria"
                    name="criteria"
                    placeholder="(Min. Order Quantity)"
                    value={formData.criteria}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="data">
                  <label htmlFor="discountType">Discount Type</label>
                  <select
                    id="discountType"
                    name="discountType"
                    value={formData.discountType}
                    onChange={handleChange}
                  >
                    <option>Flat</option>
                    <option>Percentage</option>
                  </select>
                </div>

                <div className="data">
                  <label htmlFor="discountValue">Discount Value</label>
                  <input
                    type="number" // Use type="number" to enforce numeric input
                    id="discountValue"
                    name="discountValue"
                    value={formData.discountValue}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="data">
                  <label htmlFor="effectiveDate">Effective Date</label>
                  <input
                    type="date"
                    id="effectiveDate"
                    name="effectiveDate"
                    value={formData.effectiveDate}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="data">
                  <label htmlFor="expiryDate">Expiry Date</label>
                  <input
                    type="date"
                    id="expiryDate"
                    name="expiryDate"
                    value={formData.expiryDate}
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
