import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";
import axios from "axios"; // Import axios for making API calls

const EditDiscountPage = () => {
  const { setBtn, setGoBackUrl } = useContext(FormPageHeaderContext);
  const [discountId, setDiscountId] = useState("");
  const [error] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate discountId
    if (!discountId) {
      alert("Discount ID is required"); // Alert if Discount ID is empty
      return;
    }

    try {
      // Make an API call to check if the Discount ID exists
      const response = await axios.get(`http://localhost:3001/api/discounts/${discountId}`); // Adjust the API endpoint as needed

      if (response.data) {
        // If the Discount ID exists, navigate to the EditDiscountForm page
        navigate(`/editdiscountform/${discountId}`);
      } else {
        // If the Discount ID does not exist, show an alert
        alert("Discount ID not found. Please check the ID and try again.");
      }
    } catch (error) {
      // Handle any errors that occur during the API call
      console.error("Error verifying Discount ID:", error);
      alert("Discount ID not found. Please check the ID and try again."); // Alert if Discount ID does not exist
    }
  };

  useEffect(() => {
    setGoBackUrl("/discount");
  }, [setBtn, setGoBackUrl]);

  return (
    <>
      <FormPageHeader />
      <div className="container">
        <div className="form-container">
          <h2>Edit Discount - Mandatory Details</h2>

          {/* Display error message if validation fails */}
          {error && <div className="error-message">{error}</div>}

          <form className="header-box" onSubmit={handleSubmit}>
            <div className="data-container">
              <div className="data">
                <label htmlFor="discountId">Discount ID</label>
                <input
                  type="text"
                  id="discountId"
                  name="discountId"
                  value={discountId}
                  onChange={(e) => setDiscountId(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="submit-btn">
              Edit Discount
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditDiscountPage;