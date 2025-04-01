import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";

export default function DisplayInventoryForm() {
  const { setUrl, setGoBackUrl } = useContext(FormPageHeaderContext);
  const location = useLocation();
  const navigate = useNavigate();

  // Get inventory data from location state
  const inventoryData = location.state?.inventoryData;

  useEffect(() => {
    setUrl("/inventory");
    setGoBackUrl("/inventory");
  }, [setUrl, setGoBackUrl]);

  // Initialize form state
  const [formData, setFormData] = useState(() => ({
    inventoryId: inventoryData?.inventoryId || "",
    productId: inventoryData?.productId || "",
    warehouseId: inventoryData?.warehouseId || "",
    location: inventoryData?.location || "",
    stockLevel: inventoryData?.stockLevel || "",
    reorderLevel: inventoryData?.reorderLevel || "",
    safetyStock: inventoryData?.safetyStock || "",
    lotNumber: inventoryData?.lotNumber || "",
  }));

  // Handle input changes. All inputs are of type text, even numeric ones.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <FormPageHeader />
      <div className="container">
        <div className="form-container">
          <h2>Inventory Details</h2>
          <form>
            <div className="header-box">
              <h2>Header</h2>
              <div className="data-container">
                <div className="data">
                  <label htmlFor="inventoryId">Inventory ID</label>
                  <input
                    type="text"
                    id="inventoryId"
                    name="inventoryId"
                    value={formData.inventoryId}
                    readOnly
                  />
                </div>
                <div className="data">
                  <label htmlFor="productId">Product ID</label>
                  <input
                    type="text"
                    id="productId"
                    name="productId"
                    value={formData.productId}
                    onChange={handleChange}
                    readOnly
                  />
                </div>
              </div>
            </div>

            <div className="item-box">
              <h2>Item</h2>
              <div className="data-container">
                <div className="data">
                  <label htmlFor="location">Location</label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    readOnly
                  />
                </div>
                <div className="data">
                  <label htmlFor="stockLevel">Stock Level</label>
                  <input
                    type="text"
                    id="stockLevel"
                    name="stockLevel"
                    value={formData.stockLevel}
                    onChange={handleChange}
                    readOnly
                  />
                </div>
                <div className="data">
                  <label htmlFor="reorderLevel">Reorder Level</label>
                  <input
                    type="text"
                    id="reorderLevel"
                    name="reorderLevel"
                    value={formData.reorderLevel}
                    onChange={handleChange}
                    readOnly
                  />
                </div>

                <div className="data">
                  <label htmlFor="safetyStock">Safety Stock</label>
                  <input
                    type="text"
                    id="safetyStock"
                    name="safetyStock"
                    value={formData.safetyStock}
                    onChange={handleChange}
                    readOnly
                  />
                </div>
                <div className="data">
                  <label htmlFor="lotNumber">Lot Number</label>
                  <input
                    type="text"
                    id="lotNumber"
                    name="lotNumber"
                    value={formData.lotNumber}
                    onChange={handleChange}
                    readOnly
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
