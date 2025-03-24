import { useState, useEffect, useContext } from "react"; // Add useContext import
import { useParams } from "react-router-dom";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext"; // Import the context
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";

export default function DisplayProductForm() {
  const { setBtn, setGoBackUrl } = useContext(FormPageHeaderContext); // Use useContext
  const { productId, category } = useParams(); // Extract productId and category from the URL
  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    productId: "",
    stockStatus: "",
    description: "",
    unitOfMeasurement: "",
    weightVolume: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch product details when the component mounts
  useEffect(() => {
    const fetchProduct = async () => {
		    
          
    
      try {
        // Validate productId and category
        if (!productId || !category) {
          throw new Error("Product ID and Category are required");
        }

        console.log("Fetching product with ID:", productId, "and category:", category); // Debugging
        const response = await fetch(`http://localhost:3001/api/products/${productId}/${category}`);
        if (!response.ok) {
          throw new Error("Product Id and category are not found in the Database");
        }
        const data = await response.json();
        console.log("Fetched product data:", data); // Debugging

        // Handle array response
        const product = Array.isArray(data) ? data[0] : data;
        console.log("Extracted product:", product); // Debugging

        // Check if the fetched product matches the provided productId and category
        if (product.productId !== parseInt(productId) || product.category !== category) {
          throw new Error("Product ID and Category do not match");
        }

        // Populate the form data if the product is found
        setFormData({
          productName: product.productName,
          category: product.category,
          productId: product.productId,
          stockStatus: product.stockStatus,
          description: product.description,
          unitOfMeasurement: product.unitOfMeasurement,
          weightVolume: product.weightVolume,
        });
      } catch (err) {
        console.error("Error fetching product:", err); // Debugging
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId, category,  setBtn, setGoBackUrl]);

  if (loading) {
    return <div>Loading...</div>;
  }
  
  return (
    <>
      <FormPageHeader /> {/* Render the FormPageHeader component */}
      <div className="container">
        <div className="form-container">
          <h2>Display Product</h2>

          {/* Display error message if product is not found or does not match */}
          {error && <div className="error-message">{error}</div>}

          <form>
            {/* Header Box */}
            <div className="header-box">
              <h2>Header</h2>

              <div className="data-container">
                <div className="data">
                  <label htmlFor="productId">Product ID</label>
                  <input
                    type="text"
                    id="productId"
                    name="productId"
                    value={formData.productId}
                    // disabled 
                  />
                </div>
              </div>
            </div>

            {/* Item Box */}
            <div className="item-box">
              <h2>Item</h2>

              <div className="data-container">
                <div className="data">
                  <label htmlFor="productName">Product Name</label>
                  <input
                    type="text"
                    id="productName"
                    name="productName"
                    value={formData.productName}
                    // disabled 
                  />
                </div>

                <div className="data">
                  <label htmlFor="category">Category</label>
                  <input
                    type="text"
                    id="category"
                    name="category"
                    value={formData.category}
                    // disabled
                  />
                </div>

                <div className="data">
                  <label htmlFor="description">Description</label>
                  <input
                    type="text"
                    id="description"
                    name="description"
                    value={formData.description}
                  
                  />
                </div>

                <div className="data">
                  <label htmlFor="unitOfMeasurement">Unit of Measurement</label>
                  <input
                    type="text"
                    id="unitOfMeasurement"
                    name="unitOfMeasurement"
                    value={formData.unitOfMeasurement}
                 
                  />
                </div>

                <div className="data">
                  <label htmlFor="weightVolume">Weight/Volume</label>
                  <input
                    type="text"
                    id="weightVolume"
                    name="weightVolume"
                    value={formData.weightVolume}
                 
                  />
                </div>

                <div className="data">
                  <label htmlFor="stockStatus">Stock Status</label>
                  <input
                    type="text"
                    id="stockStatus"
                    name="stockStatus"
                    value={formData.stockStatus}
                   
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}