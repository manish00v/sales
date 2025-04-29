import { useContext, useState,  useEffect } from "react";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";
import { useNavigate } from "react-router-dom";

const EditReturnOrderPage = () => {
  const { setBtn, setUrl, setGoBackUrl } = useContext(FormPageHeaderContext);
  const [returnOrderId, setReturnOrderId] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setBtn("Search");
    setUrl(""); // We'll handle submission manually
    setGoBackUrl("/returnorder");
  });

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/api/return-orders/${returnOrderId}`);
      if (!response.ok) {
        throw new Error("Return order not found");
      }
	  
      const data = await response.json();
      navigate(`/editreturnorderform/${returnOrderId}`, { state: { returnOrder: data } });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <FormPageHeader />
      
      <div className="container">
        <div className="form-container">
          <h2>Edit Return Order - Mandatory Details</h2>
          
          {error && <div className="error-message">{error}</div>}

          <form className="header-box" onSubmit={handleSearch}>
            <div className="data-container">
              <div className="data">
                <label htmlFor="returnOrderId">Return Order ID</label>
                <input
                  type="text"
                  id="returnOrderId"
                  name="returnOrderId"
                  placeholder="(Primary Key)"
                  value={returnOrderId}
                  onChange={(e) => setReturnOrderId(e.target.value)}
                  required
                />
              </div>
            </div>
            <button type="submit" className="submit-btn">
              Edit Return Order
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditReturnOrderPage;