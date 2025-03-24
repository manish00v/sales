import { useState, useContext, useEffect } from "react"; // Add useContext import
import { useNavigate } from "react-router-dom";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext"; // Import the context
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";

export default function DisplayProductPage() {
  const { setBtn, setGoBackUrl } = useContext(FormPageHeaderContext); // Use useContext
  const [productId, setProductId] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [error, setError] = useState(null); // State to store error messages
  const navigate = useNavigate();
  useEffect(() => {
    setBtn("Create");
    setGoBackUrl("/product");
  });
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate productId and category
    if (!productId || !productCategory) {
      setError("Product ID and Category are required");
      return;
    }

  
    try {
      // Fetch product details from the API
      const response = await fetch(`http://localhost:3001/api/products/${productId}`);
      if (!response.ok) {
        throw new Error("Product not found");
      }

      const productData = await response.json();

      // Check if the category matches
      if (productData.category !== productCategory) {
        alert(`For product ID ${productId} Category do not match. Please check your Category inputs.`);        return; // Stop further execution
      }

      // If validation passes, navigate to the DisplayProductForm page
      navigate(`/displayproductform/${productId}/${productCategory}`);
    } catch (err) {
      console.error("Error fetching product:", err);
      alert(`Product ID ${productId} is not exist in database, Please input currect Product ID.`);        return; // Stop further execution
    }
  };
  return (
    <>
      <FormPageHeader /> {/* Render the FormPageHeader component */}
      <div className="container">
        <div className="form-container">
          <h2>Display Product - Mandatory Details</h2>

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

              <div className="data">
                <label htmlFor="productCategory">Product Category</label>
                <input
                  type="text"
                  id="productCategory"
                  name="productCategory"
                  value={productCategory}
                  onChange={(e) => setProductCategory(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="submit-btn">
              Display Product
            </button>
          </form>
        </div>
      </div>
    </>
  );
}