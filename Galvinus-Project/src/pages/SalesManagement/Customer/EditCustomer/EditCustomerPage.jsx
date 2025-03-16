import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";

const EditCustomerPage = () => {
  const { setBtn, setGoBackUrl } = useContext(FormPageHeaderContext);
  const [customerId, setCustomerId] = useState("");
  const [productId, setProductId] = useState("");
  const [error, setError] = useState(null); // State to store error messages
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate discountId and productId
    if (!customerId || !productId) {
      setError("Discount ID and Product ID are required");
      return;
    }

    // Check if discountId and productId are valid numbers
    if (isNaN(customerId)) {
      setError("Discount ID must be a number");
      return;
    }
    // if (is(productId)) {
    //   setError("Product ID must be a number");
    //   return;
    // }

    // If validation passes, navigate to the EditCustomerForm page
    navigate(`/editcustomerform/${customerId}/${productId}`);
  };

  useEffect(() => {
    setBtn("Edit");
    setGoBackUrl("/customer");
  }, [setBtn, setGoBackUrl]);

  return (
    <>
      <FormPageHeader />
      <div className="container">
        <div className="form-container">
          <h2>Edit Customer - Mandatory Details</h2>

          {/* Display error message if validation fails */}
          {error && <div className="error-message">{error}</div>}

          <form className="header-box" onSubmit={handleSubmit}>
            <div className="data-container">
              <div className="data">
                <label htmlFor="customerId">Customer ID</label>
                <input
                  type="number"
                  id="customerId"
                  name="customerId"
                  value={customerId}
                  onChange={(e) => setCustomerId(e.target.value)}
                  required
                />
              </div>

              <div className="data">
                <label htmlFor="productId">Product ID</label>
                <input
                  type="text"
                  id="productId"
                  name="productId"
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="submit-btn">
              Edit Customer
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditCustomerPage;
