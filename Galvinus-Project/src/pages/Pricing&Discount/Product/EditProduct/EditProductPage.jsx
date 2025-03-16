import { useState, useContext } from "react"; // Add useContext import
import { useNavigate } from "react-router-dom";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext"; // Import the context
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";

const EditProductPage = () => {
  const { setBtn, setGoBackUrl } = useContext(FormPageHeaderContext); // Use useContext
  const [productId, setProductId] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate productId
    if (!productId) {
      setError("Product ID is required");
      return;
    }

    if (isNaN(productId)) {
      setError("Product ID must be a number");
      return;
    }

    // If validation passes, navigate to the EditProductForm page
    navigate(`/editproductform/${productId}`);
  };
  setBtn, setGoBackUrl
  return (
    <>
      <FormPageHeader /> {/* Render the FormPageHeader component */}
      <div className="container">
        <div className="form-container">
          <h2>Edit Product - Mandatory Details</h2>

          {/* Display error message if validation fails */}
          {error && <div className="error-message">{error}</div>}

          <form className="header-box" onSubmit={handleSubmit}>
            <div className="data-container">
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
              Edit Product
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProductPage;