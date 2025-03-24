import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";

export default function EditPricingRulesForm() {
  const { setBtn, setUrl, setGoBackUrl } = useContext(FormPageHeaderContext);
  const { ruleId } = useParams(); // Use ruleId from URL params
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    ruleId: "",
    productId: "",
    discountId: "",
    customerGroup: "",
    region: "",
    basePrice: "",
    effectiveDate: "",
    expireDate: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch pricing rule details when the component mounts
  useEffect(() => {
    const fetchPricingRule = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/pricing-rules/${ruleId}`
        );
        if (!response.ok) {
          throw new Error("Pricing rule not found");
        }
        const data = await response.json();
        setFormData({
          ruleId: data.ruleId,
          productId: data.productId,
          discountId: data.discountId,
          customerGroup: data.customerGroup,
          region: data.region,
          basePrice: data.basePrice,
          effectiveDate: data.effectiveDate.split("T")[0], // Extract date part
          expireDate: data.expireDate.split("T")[0], // Extract date part
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPricingRule();
  }, [ruleId]);

  useEffect(() => {
    setBtn("Save");
    setUrl(`/pricingrules/${ruleId}`);
    setGoBackUrl("/pricingrules");
  }, [setBtn, setUrl, setGoBackUrl, ruleId]);

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
        basePrice: parseFloat(formData.basePrice), // Convert to number
        effectiveDate: new Date(formData.effectiveDate).toISOString(), // Ensure proper date format
        expireDate: new Date(formData.expireDate).toISOString(), // Ensure proper date format
      };

      const response = await fetch(
        `http://localhost:3001/api/pricing-rules/${ruleId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formattedData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update pricing rule");
      }

      const result = await response.json();
      console.log("Pricing rule updated successfully:", result);

      // Navigate back to the pricing rules list page
      navigate("/pricingrules");
    } catch (err) {
      console.error("Error updating pricing rule:", err);
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
          <h2>Edit Pricing Rules</h2>

          {/* Display error message if any */}
          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit}>
            {/* Header Box */}
            <div className="header-box">
              <h2>Header</h2>

              <div className="data-container">
                <div className="data">
                  <label htmlFor="ruleId">Rule ID</label>
                  <input
                    type="text"
                    id="ruleId"
                    name="ruleId"
                    value={formData.ruleId}
                    
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
                  <label htmlFor="discountId">Discount ID</label>
                  <input
                    type="text"
                    id="discountId"
                    name="discountId"
                    value={formData.discountId}
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
                  <label htmlFor="customerGroup">Customer Group</label>
                  <input
                    type="text"
                    id="customerGroup"
                    name="customerGroup"
                    value={formData.customerGroup}
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
                  <label htmlFor="basePrice">Base Price</label>
                  <input
                    type="number"
                    id="basePrice"
                    name="basePrice"
                    value={formData.basePrice}
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
                  <label htmlFor="expireDate">Expire Date</label>
                  <input
                    type="date"
                    id="expireDate"
                    name="expireDate"
                    value={formData.expireDate}
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