import { useState, useContext } from "react"; // Add useContext import
import { useNavigate } from "react-router-dom";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext"; // Import the context
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";

const EditProductPage = () => {
  const { setBtn, setGoBackUrl } = useContext(FormPageHeaderContext); // Use useContext
  const [productId, setProductId] = useState("");
  const [error, setError] = useState(null); // State to store error messages
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate productId
    if (!productId) {
      alert("Product ID is required");
      return;
    }

    try {
      // Fetch product details from the API
      const response = await fetch(`http://localhost:3001/api/products/${productId}`);
      if (!response.ok) {
        throw new Error("Product not found");
      }

      // If product exists, navigate to the EditProductForm page
      navigate(`/editproductform/${productId}`);
    } catch (err) {
      console.error("Error fetching product:", err);
      alert(`Product ID ${productId} does not exist. Please check the ID and try again.`); // Alert the user
    }
  };

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