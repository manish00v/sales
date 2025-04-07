import React, { useContext, useEffect, useState } from "react";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";
import { useLocation } from "react-router-dom";

export default function DisplayTaxConfigurationForm() {
  const { setUrl, setGoBackUrl } = useContext(FormPageHeaderContext);

  const location = useLocation();

  // Getting shipment data from location state (if available)
  const taxData = location.state?.taxData || {};

  // ✅ Initializing state with shipment data
  const [formData, setFormData] = useState(() => ({
    taxId: taxData.taxId || "",
    orderId: taxData.orderId || "",
    invoiceId: taxData.invoiceId || "",
    customerId: taxData.customerId || "",
    region: taxData.region || "",
    taxType: taxData.taxType || "",
    taxPercentage: taxData.taxPercentage || "",
  }));

  useEffect(() => {
    setUrl("/taxconfiguration");
    setGoBackUrl("/taxconfiguration");
  }, []);

  return (
    <>
      <FormPageHeader />

      <div className="container">
        <div className="form-container">
          <h2>Display Tax Configuration</h2>

          <div className="header-box">
            <h2>Header</h2>

            <form>
              <div className="data-container">
                <div className="data">
                  <label htmlFor="taxId">Tax ID</label>
                  <input
                    type="text"
                    id="taxId"
                    name="taxId"
                    value={formData.taxId}
                    readOnly
                  />
                </div>

                <div className="data">
                  <label htmlFor="invoiceId">Invoice ID</label>
                  <input
                    type="text"
                    id="invoiceId"
                    name="invoiceId"
                    value={formData.invoiceId}
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
                  <label htmlFor="customerId">Customer ID</label>
                  <input
                    type="text"
                    id="customerId"
                    name="customerId"
                    value={formData.customerId}
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
                  <label htmlFor="region">Region</label>
                  <input
                    type="text"
                    id="region"
                    name="region"
                    value={formData.region}
                    readOnly
                  />
                </div>

                <div className="data">
                  <label htmlFor="taxType">Tax Type</label>
                  <select
                    name="taxType"
                    id="taxType"
                    value={formData.taxType}
                    readOnly
                  >
                    <option value="">Select Tax Type</option>
                    <option value="IGST">IGST</option>
                    <option value="SGST">SGST</option>
                    <option value="CGST">CGST</option>
                  </select>
                </div>

                <div className="data">
                  <label htmlFor="taxPercentage">Tax Percentage</label>
                  <input
                    type="text"
                    id="taxPercentage"
                    name="taxPercentage"
                    value={formData.taxPercentage}
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
