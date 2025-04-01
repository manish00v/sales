import React, { useContext, useEffect, useState } from "react";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";
import { useLocation } from "react-router-dom";

export default function DisplayWarehouseForm() {
  const { setUrl, setGoBackUrl } = useContext(FormPageHeaderContext);
  const location = useLocation();
  const warehouseData = location.state?.warehouseData;

  const [formData, setFormData] = useState({
    warehouseId: warehouseData?.warehouseId || "",
    inventoryId: warehouseData?.inventoryId || "",
    productId: warehouseData?.productId || "",
    warehouseCapacity: warehouseData?.warehouseCapacity || "",
    warehouseAddress: warehouseData?.warehouseAddress || "",
    warehouseType: warehouseData?.warehouseType || "OWNED",
    warehouseName: warehouseData?.warehouseName || "",
  });

  useEffect(() => {
    setUrl("/warehouse");
    setGoBackUrl("/warehouse");
  }, [setUrl, setGoBackUrl]);

  return (
    <>
      <FormPageHeader />

      <div className="container">
        <div className="form-container">
          <h2>Display Warehouse</h2>

          <div className="header-box">
            <h2>Header</h2>

            <form>
              <div className="data-container">
                <div className="data">
                  <label htmlFor="warehouseId">Warehouse ID</label>
                  <input
                    type="text"
                    id="warehouseId"
                    name="warehouseId"
                    value={formData.warehouseId}
                    readOnly
                  />
                </div>

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
                    readOnly
                  />
                </div>
              </div>
            </form>
          </div>

          <div className="item-box">
            <h2>Item</h2>

            <form>
              <div className="data-container">
                <div className="data">
                  <label htmlFor="warehouseName">Warehouse Name</label>
                  <input
                    type="text"
                    id="warehouseName"
                    name="warehouseName"
                    value={formData.warehouseName}
                    readOnly
                  />
                </div>

                <div className="data">
                  <label htmlFor="warehouseAddress">Warehouse Address</label>
                  <input
                    type="text"
                    id="warehouseAddress"
                    name="warehouseAddress"
                    value={formData.warehouseAddress}
                    readOnly
                  />
                </div>

                <div className="data">
                  <label htmlFor="warehouseCapacity">Warehouse Capacity</label>
                  <input
                    type="text"
                    id="warehouseCapacity"
                    name="warehouseCapacity"
                    value={formData.warehouseCapacity}
                    readOnly
                  />
                </div>

                <div className="data">
                  <label htmlFor="warehouseType">Warehouse Type</label>
                  <input
                    type="text"
                    id="warehouseType"
                    name="warehouseType"
                    value={formData.warehouseType}
                    readOnly
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
