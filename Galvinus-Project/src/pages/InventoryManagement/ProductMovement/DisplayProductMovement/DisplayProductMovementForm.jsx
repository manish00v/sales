import React, { useContext, useEffect, useState } from "react";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";
import { useLocation } from "react-router-dom";

export default function DisplayProductMovementForm() {
  const { setUrl, setGoBackUrl } = useContext(FormPageHeaderContext);
  const location = useLocation();
  const productMovementData = location.state?.productMovementData;

  const [formData, setFormData] = useState({
    movementId: productMovementData.movementId || "",
    inventoryId: productMovementData.inventoryId || "",
    productId: productMovementData.productId || "",
    warehouseId: productMovementData.warehouseId || "",
    sourceLocation: productMovementData.sourceLocation || "",
    destinationLocation: productMovementData.destinationLocation || "",
    quantity: productMovementData.quantity
      ? Number(productMovementData.quantity)
      : "",
    movementDate: productMovementData.movementDate
      ? new Date(productMovementData.movementDate).toISOString().split("T")[0]
      : "",
  });

  useEffect(() => {
    setUrl("/productmovement");
    setGoBackUrl("/productmovement");
  }, [setUrl, setGoBackUrl]);

  return (
    <>
      <FormPageHeader />

      <div className="container">
        <div className="form-container">
          <h2>Display Product Movement</h2>

          <div className="header-box">
            <h2>Header</h2>

            <form>
              <div className="data-container">
                <div className="data">
                  <label htmlFor="movementId">Movement ID</label>
                  <input
                    type="text"
                    id="movementId"
                    name="movementId"
                    value={formData.movementId}
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
              </div>
            </form>
          </div>

          <div className="item-box">
            <h2>Item</h2>

            <form>
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
                  <label htmlFor="sourceLocation">Source Location</label>
                  <input
                    type="text"
                    id="sourceLocation"
                    name="sourceLocation"
                    value={formData.sourceLocation}
                    readOnly
                  />
                </div>

                <div className="data">
                  <label htmlFor="destinationLocation">
                    Destination Location
                  </label>
                  <input
                    type="text"
                    id="destinationLocation"
                    name="destinationLocation"
                    value={formData.destinationLocation}
                    readOnly
                  />
                </div>

                <div className="data">
                  <label htmlFor="quantity">Quantity</label>
                  <input
                    type="text"
                    id="quantity"
                    name="quantity"
                    value={formData.quantity}
                    readOnly
                  />
                </div>

                <div className="data">
                  <label htmlFor="movementDate">Movement Date</label>
                  <input
                    type="date"
                    id="movementDate"
                    name="movementDate"
                    value={formData.movementDate}
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
