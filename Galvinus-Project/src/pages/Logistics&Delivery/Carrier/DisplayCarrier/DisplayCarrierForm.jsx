import React, { useContext, useEffect, useState } from "react";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";
import { useLocation } from "react-router-dom";

export default function DisplayCarrierForm() {
  const { setUrl, setGoBackUrl } = useContext(FormPageHeaderContext);

  const location = useLocation();

  // Getting shipment data from location state (if available)
  const carrierData = location.state?.carrierData || {};

  // ✅ Initializing state with shipment data
  const [formData, setFormData] = useState(() => ({
    carrierId: carrierData.carrierId || "",
    orderId: carrierData.orderId || "",
    shipmentId: carrierData.shipmentId || "",
    name: carrierData.name || "",
    serviceType: carrierData.serviceType || "",
    contactDetails: carrierData.contactDetails || "",
    costStructure: carrierData.costStructure || "",
  }));

  useEffect(() => {
    setUrl("/carrier");
    setGoBackUrl("/carrier");
  }, []);

  return (
    <>
      <FormPageHeader />

      <div className="container">
        <div className="form-container">
          <h2>Display Carrier</h2>

          <div className="header-box">
            <h2>Header</h2>

            <form>
              <div className="data-container">
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
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    readOnly
                  />
                </div>

                <div className="data">
                  <label htmlFor="serviceType">Service Type</label>
                  <input
                    type="text"
                    id="serviceType"
                    name="serviceType"
                    value={formData.serviceType}
                    readOnly
                  />
                </div>

                <div className="data">
                  <label htmlFor="contactDetails">Contact Details</label>
                  <input
                    type="text"
                    id="contactDetails"
                    name="contactDetails"
                    value={formData.contactDetails}
                    readOnly
                  />
                </div>

                <div className="data">
                  <label htmlFor="costStructure">Cost Structure</label>
                  <input
                    type="text"
                    id="costStructure"
                    name="costStructure"
                    value={formData.costStructure}
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
