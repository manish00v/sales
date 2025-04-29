import React, { useContext, useEffect, useState } from "react";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";
import { useNavigate } from "react-router-dom";

const EditCarrierPage = () => {
  const { setGoBackUrl } = useContext(FormPageHeaderContext);
  const navigate = useNavigate(); // ✅ Initialize navigation
  const token = localStorage.getItem("accessToken");

  const [formData, setFormData] = useState({
    carrierId: "",
    shipmentId: "",
    orderId: "",
    name: "",
    serviceType: "",
    contactDetails: "",
    costStructure: "",
  });

  // ✅ Fix handleChange function
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value, // ✅ Dynamically update state
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:6744/api/carrier/get-carrier?carrierId=${formData.carrierId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Ensure response is valid JSON
      let data;
      try {
        data = await response.json();
      } catch (jsonError) {
        console.error("Invalid JSON response:", jsonError);
        alert("Server error: Invalid response format");
        return;
      }

      if (response.ok) {
        console.log("Fetched carrier:", data);

        // ✅ Navigate and pass `data` safely
        navigate(`/editcarrierpage/${formData.carrierId}`, {
          state: { carrierData: data },
        });
      } else {
        console.log("Error fetching carrier", data?.error || "Unknown error");
        alert(`Error fetching carrier: ${data?.message || "Unknown error"}`);

        // Reset only `carrierId` to allow new input
        setFormData((prev) => ({
          ...prev,
          carrierId: "",
        }));
      }
    } catch (error) {
      console.log("Error:", error);
      alert("Network error: Unable to fetch carrier.");
    }
  };

  useEffect(() => {
    setGoBackUrl("/carrier");
  }, []);

  return (
    <>
      <FormPageHeader />

      <div className="container">
        <div className="form-container">
          <h2>Edit Carrier - Mandatory Details</h2>

          <form className="header-box" onSubmit={handleSubmit}>
            <div className="data-container">
              <div className="data">
                <label htmlFor="carrierId">carrier ID</label>
                <input
                  type="text"
                  id="carrierId"
                  name="carrierId"
                  placeholder="(Primary Key)"
                  value={formData.carrierId}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <button type="submit" className="edit-btn">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditCarrierPage;
