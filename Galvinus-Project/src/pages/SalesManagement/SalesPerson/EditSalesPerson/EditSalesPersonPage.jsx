import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";

const EditSalesPersonPage = () => {
  const { setBtn, setGoBackUrl } = useContext(FormPageHeaderContext);
  const [salesPersonId, setSalesPersonId] = useState("");
  const [customerId, setCustomerId] = useState("")
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate salesPersonId
    if (!salesPersonId) {
      setError("Sales Person ID is required");
      return;
    }
	if (!customerId) {
		setError("Customer ID is required");
		return;
	  }
  
    if (isNaN(salesPersonId)) {
      setError("Sales Person ID must be a number");
      return;
    }

    // If validation passes, navigate to the EditSalesPersonForm page
    navigate(`/editsalespersonform/${salesPersonId}/${customerId}`);
  };

  useEffect(() => {
    setBtn("Edit");
    setGoBackUrl("/salesperson");
  }, [setBtn, setGoBackUrl]);

  return (
    <>
      <FormPageHeader />
      <div className="container">
        <div className="form-container">
          <h2>Edit Sales Person - Mandatory Details</h2>

          {/* Display error message if validation fails */}
          {error && <div className="error-message">{error}</div>}

          <form className="header-box" onSubmit={handleSubmit}>
            <div className="data-container">
              <div className="data">
                <label htmlFor="salesPersonId">Sales Person ID</label>
                <input
                  type="number"
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
									type="number"
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