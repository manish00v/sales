import React, { useContext, useEffect, useState } from "react";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";
import { useLocation } from "react-router-dom";

export default function DisplayDeliveryVehicleForm() {
  const { setUrl, setGoBackUrl } = useContext(FormPageHeaderContext);

  const location = useLocation();

  // Getting shipment data from location state (if available)
  const vehicleData = location.state?.vehicleData || {};

  // ✅ Initializing state with shipment data
  const [formData, setFormData] = useState(() => ({
    carrierId: vehicleData.carrierId || "",
    orderId: vehicleData.orderId || "",
    shipmentId: vehicleData.shipmentId || "",
    vehicleId: vehicleData.vehicleId || "",
    vehicleType: vehicleData.vehicleType || "",
    vehicleCapacity: vehicleData.vehicleCapacity || "",
    assignedDriver: vehicleData.assignedDriver || "",
  }));

  useEffect(() => {
    setUrl("/deliveryvehicle");
    setGoBackUrl("/deliveryvehicle");
  }, []);

  return (
    <>
      <FormPageHeader />

      <div className="container">
        <div className="form-container">
          <h2>Display Delivery Route</h2>

          <div className="header-box">
            <h2>Header</h2>

            <form>
              <div className="data-container">
                <div className="data">
                  <label htmlFor="vehicleId">Vehicle ID</label>
                  <input
                    type="text"
                    id="vehicleId"
                    name="vehicleId"
                    value={formData.vehicleId}
                    readOnly
                  />
                </div>

                <div className="data">
                  <label htmlFor="shipmentId">Shipment ID</label>
                  <input
                    type="text"
                    id="shipmentId"
                    name="shipmentId"
                    value={formData.shipmentId}
                    readOnly
                  />
                </div>

                <div className="data">
                  <label htmlFor="orderId">Order ID</label>
                  <input
                    type="text"
                    id="orderId"
                    name="orderId"
                    value={formData.orderId}
                    readOnly
                  />
                </div>

                <div className="data">
                  <label htmlFor="carrierId">Carrier ID</label>
                  <input
                    type="text"
                    id="carrierId"
                    name="carrierId"
                    value={formData.carrierId}
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
                  <label htmlFor="vehicleType">Vehicle Type</label>
                  <input
                    type="text"
                    id="vehicleType"
                    name="vehicleType"
                    value={formData.vehicleType}
                    readOnly
                  />
                </div>

                <div className="data">
                  <label htmlFor="vehicleCapacity">Vehicle Capacity</label>
                  <input
                    type="text"
                    id="vehicleCapacity"
                    name="vehicleCapacity"
                    value={formData.vehicleCapacity}
                    readOnly
                  />
                </div>

                <div className="data">
                  <label htmlFor="assignedDriver">Assigned Driver</label>
                  <input
                    type="text"
                    id="assignedDriver"
                    name="assignedDriver"
                    value={formData.assignedDriver}
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
