import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";

export default function EditDiscountForm() {
  const { setBtn, setUrl, setGoBackUrl } = useContext(FormPageHeaderContext);
  const { discountId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    discountId: "",
    productId: "",
    discountCriteria: "",
    productDiscount: "",
    customerDiscount: "",
    discountValue: "",
    discountEligibilityCondition: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch discount details when the component mounts
  useEffect(() => {
    const fetchDiscount = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/discounts/${discountId}`
        );
        if (!response.ok) {
          throw new Error("Discount not found");
        }
        const data = await response.json();
        setFormData({
          discountId: data.discountId,
          productId: data.productId,
          discountCriteria: data.discountCriteria,
          productDiscount: data.productDiscount,
          customerDiscount: data.customerDiscount,
          discountValue: data.discountValue,
          discountEligibilityCondition: data.discountEligibilityCondition,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDiscount();
  }, [discountId]);

  useEffect(() => {
    
    setUrl(`/discount/${discountId}`);
    setGoBackUrl("/discount");
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
		const formattedData = {
			...formData,
			productDiscount: parseFloat(formData.productDiscount),
			customerDiscount: parseFloat(formData.customerDiscount),
			discountValue: parseFloat(formData.discountValue),
		};

      const response = await fetch(
        `http://localhost:3001/api/discounts/${discountId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formattedData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update discount");
      }

      const result = await response.json();
      console.log("Discount updated successfully:", result);

      // Navigate back to the discounts list page
      navigate("/discount");
    } catch (err) {
      console.error("Error updating discount:", err);
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
          <h2>Edit Discount</h2>

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
                    type="text"
                    id="discountId"
                    name="discountId"
                    value={formData.discountId}
                    
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
                  <label htmlFor="discountCriteria">Discount Criteria</label>
                  <input
                    type="text"
                    id="discountCriteria"
                    name="discountCriteria"
                    value={formData.discountCriteria}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="data">
                  <label htmlFor="productDiscount">Product Discount</label>
                  <input
                    type="number"
                    id="productDiscount"
                    name="productDiscount"
                    value={formData.productDiscount}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="data">
                  <label htmlFor="customerDiscount">Customer Discount</label>
                  <input
                    type="number"
                    id="customerDiscount"
                    name="customerDiscount"
                    value={formData.customerDiscount}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="data">
                  <label htmlFor="discountValue">Discount Value</label>
                  <input
                    type="number"
                    id="discountValue"
                    name="discountValue"
                    value={formData.discountValue}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="data">
                  <label htmlFor="discountEligibilityCondition">
                    Discount Eligibility Condition
                  </label>
                  <input
                    type="text"
                    id="discountEligibilityCondition"
                    name="discountEligibilityCondition"
                    value={formData.discountEligibilityCondition}
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