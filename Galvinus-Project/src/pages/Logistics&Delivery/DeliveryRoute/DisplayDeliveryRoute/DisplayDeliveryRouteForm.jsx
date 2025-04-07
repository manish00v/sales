import React, { useContext, useEffect, useState } from "react";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function DisplayDeliveryRouteForm() {
  const { setUrl, setGoBackUrl } = useContext(FormPageHeaderContext);
  const location = useLocation();

  // Getting carrier data from location state (if available)
  const vehicleRoute = location.state?.vehicleRoute || {};

  // State to manage form inputs
  const [formData, setFormData] = useState({
    shipmentId: vehicleRoute.shipmentId || "",
    carrierId: vehicleRoute.carrierId || "",
    orderId: vehicleRoute.orderId || "",
    routeId: vehicleRoute.routeId || "",
    sourceLocation: vehicleRoute.sourceLocation || "",
    destinationLocation: vehicleRoute.destinationLocation || "",
    routeTime: vehicleRoute.routeTime || "",
    distance: vehicleRoute.distance || "",
  });

  useEffect(() => {
    setUrl("/deliveryroute");
    setGoBackUrl("/deliveryroute");
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
                  <label htmlFor="routeId">Route ID</label>
                  <input
                    type="text"
                    id="routeId"
                    name="routeId"
                    value={formData.routeId}
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
                  <label htmlFor="routeTime">Route Time</label>
                  <input
                    type="text"
                    id="routeTime"
                    name="routeTime"
                    value={formData.routeTime}
                    readOnly
                  />
                </div>

                <div className="data">
                  <label htmlFor="distance">Distance</label>
                  <input
                    type="text"
                    id="distance"
                    name="distance"
                    value={formData.distance}
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
