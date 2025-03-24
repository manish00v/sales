import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";

const EditSalesPersonPage = () => {
  const { setGoBackUrl } = useContext(FormPageHeaderContext);
  const [salesPersonId, setSalesPersonId] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate IDs are provided
    if (!salesPersonId || !customerId) {
      setError("Both Sales Person ID and Customer ID are required");
      return;
    }

    try {
      // 1. Check if salesPersonId exists
      const salesPersonResponse = await fetch(`http://localhost:3000/api/sales-persons/${salesPersonId}`);
      if (!salesPersonResponse.ok) {
        alert(`Sales Person ID ${salesPersonId} does not exist. Please create it first.`);
        return;
      }

      // 2. Check if customerId exists
      const customerResponse = await fetch(`http://localhost:3000/api/customers/${customerId}`);
      if (!customerResponse.ok) {
        alert(`Customer ID ${customerId} does not exist. Please create it first.`);
        return;
      }

      // 3. Check if salesPersonId is associated with customerId
      const associationResponse = await fetch(
        `http://localhost:3000/api/sales-persons/${salesPersonId}/${customerId}`
      );
      if (!associationResponse.ok) {
        alert(`Sales Person ID ${salesPersonId} is not associated with Customer ID ${customerId}.`);
        return;
      }

      // All validations passed - navigate to edit page
      navigate(`/editsalespersonform/${salesPersonId}/${customerId}`);

    } catch (error) {
      console.error("Validation error:", error);
      alert("An error occurred during validation. Please try again.");
    }
  };

  useEffect(() => {
    setGoBackUrl("/salesperson");
  }, [setGoBackUrl]);

  return (
    <>
      <FormPageHeader />
      <div className="container">
        <div className="form-container">
          <h2>Edit Sales Person - Mandatory Details</h2>

          {error && <div className="error-message">{error}</div>}

          <form className="header-box" onSubmit={handleSubmit}>
            <div className="data-container">
              <div className="data">
                <label htmlFor="salesPersonId">Sales Person ID</label>
                <input
                  type="text"
                  id="salesPersonId"
                  name="salesPersonId"
                  value={salesPersonId}
                  onChange={(e) => setSalesPersonId(e.target.value)}
                  required
                />
              </div>

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
            </div>

            <button type="submit" className="submit-btn">
              Edit Sales Person
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditSalesPersonPage;