import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";

const EditCustomerPage = () => {
  const { setGoBackUrl } = useContext(FormPageHeaderContext);
  const [customerId, setCustomerId] = useState("");
  const [productId, setProductId] = useState("");
  const [error] = useState(null); // State to store error messages
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate customerId and productId
    if (!customerId || !productId) {
      alert("Customer ID and Product ID are required");
      return;
    }

    try {
      // Check if customerId exists in the customer table
      const customerResponse = await fetch(`http://localhost:3000/api/customers/${customerId}`);
      if (!customerResponse.ok) {
        alert("Customer ID does not exist. Please check the ID and try again.");
        return;
      }

      // Check if productId exists in the product table
      const productResponse = await fetch(`http://localhost:3001/api/products/${productId}`);
      if (!productResponse.ok) {
        alert("Product ID does not exist. Please check the ID and try again.");
        return;
      }

      // Check if customerId is associated with productId in the customer table
      const customerProductResponse = await fetch(`http://localhost:3000/api/customers/${customerId}/${productId}`);
      if (!customerProductResponse.ok) {
        alert("The provided Customer ID is not associated with the given Product ID.");
        return;
      }

      // If all validations pass, navigate to the EditCustomerForm page
      navigate(`/editcustomerform/${customerId}/${productId}`);
    } catch (error) {
      console.error("Error validating IDs:", error);
      alert("An error occurred while validating the IDs. Please try again.");
    }
  };

  useEffect(() => {
    setGoBackUrl("/customer");
  }, [setGoBackUrl]);

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
                  type="text"
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