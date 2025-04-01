import React, { useContext, useEffect, useState } from "react";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";
import { useLocation, useNavigate } from "react-router-dom";

export default function DisplayShipmentForm() {
  const { setUrl, setGoBackUrl } = useContext(FormPageHeaderContext);

  const location = useLocation();

  // Getting shipment data from location state (if available)
  const shipmentData = location.state?.shipmentData || {};

  // ✅ Initializing state with shipment data
  const [formData, setFormData] = useState(() => ({
    shipmentId: shipmentData.shipmentId || "",
    orderId: shipmentData.orderId || "",
    trackingNumber: shipmentData.trackingNumber || "",
    shipmentStatus: shipmentData.shipmentStatus || "PENDING",
    dispatchDate: shipmentData.dispatchDate
      ? new Date(shipmentData.dispatchDate).toISOString().split("T")[0]
      : "",
    estimatedDeliveryDate: shipmentData.estimatedDeliveryDate
      ? new Date(shipmentData.estimatedDeliveryDate).toISOString().split("T")[0]
      : "",
  }));

  useEffect(() => {
    setUrl("/shipment");
    setGoBackUrl("/shipment");
  }, []);

  return (
    <>
      <FormPageHeader />

      <div className="container">
        <div className="form-container">
          <h2>Display Shipment</h2>

          <div className="header-box">
            <h2>Header</h2>

            <form>
              <div className="data-container">
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
              </div>
            </form>
          </div>

          <div className="item-box">
            <h2>Item</h2>

            <form>
              <div className="data-container">
                <div className="data">
                  <label htmlFor="trackingNumber">Tracking Number</label>
                  <input
                    type="text"
                    id="trackingNumber"
                    name="trackingNumber"
                    value={formData.trackingNumber}
                    readOnly
                  />
                </div>

                <div className="data">
                  <label htmlFor="shipmentStatus">Shipment Status</label>
                  <input
                    type="text"
                    id="shipmentStatus"
                    name="shipmentStatus"
                    value={formData.shipmentStatus}
                    readOnly
                  />
                </div>

                <div className="data">
                  <label htmlFor="dispatchDate">Dispatch Date</label>
                  <input
                    type="date"
                    id="dispatchDate"
                    name="dispatchDate"
                    value={formData.dispatchDate}
                    readOnly
                  />
                </div>

                <div className="data">
                  <label htmlFor="estimatedDeliveryDate">
                    Estimated Delivery Date
                  </label>
                  <input
                    type="date"
                    id="estimatedDeliveryDate"
                    name="estimatedDeliveryDate"
                    value={formData.estimatedDeliveryDate}
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
