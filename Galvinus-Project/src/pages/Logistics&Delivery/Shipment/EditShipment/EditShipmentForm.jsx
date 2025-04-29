import React, { useContext, useEffect, useState } from "react";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function EditShipmentForm() {
  const { setBtn, setUrl, setGoBackUrl } = useContext(FormPageHeaderContext);
  const token = localStorage.getItem("accessToken");
  const location = useLocation();
  const navigate = useNavigate();
  const { shipmentId } = useParams();

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

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => {
      let updatedFormData = { ...prevState, [name]: value };

      // ✅ Ensure estimatedDeliveryDate is not before dispatchDate
      if (name === "dispatchDate" && updatedFormData.estimatedDeliveryDate) {
        if (new Date(value) > new Date(updatedFormData.estimatedDeliveryDate)) {
          alert("Estimated Delivery Date cannot be before Dispatch Date!");
          updatedFormData.estimatedDeliveryDate = value; // Reset to match dispatchDate
        }
      }

      if (name === "estimatedDeliveryDate" && updatedFormData.dispatchDate) {
        if (new Date(value) < new Date(updatedFormData.dispatchDate)) {
          alert("Estimated Delivery Date cannot be before Dispatch Date!");
          return prevState; // Prevent invalid change
        }
      }

      // ✅ Validate Tracking Number (Must be a number with at least 5 digits)
      if (name === "trackingNumber") {
        if (!/^\d{5,}$/.test(value)) {
          alert("Tracking Number must be a number with at least 5 digits.");
          return prevState; // Prevent invalid change
        }
      }

      return updatedFormData;
    });
  };

  // ✅ Handle form submission (Updating shipment)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:6744/api/shipment/edit-shipment/${shipmentId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            orderId: formData.orderId,
            trackingNumber: formData.trackingNumber,
            shipmentStatus: formData.shipmentStatus,
            dispatchDate: formData.dispatchDate
              ? new Date(formData.dispatchDate).toISOString()
              : null,
            estimatedDeliveryDate: formData.estimatedDeliveryDate
              ? new Date(formData.estimatedDeliveryDate).toISOString()
              : null,
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        alert("Shipment updated successfully!");
        navigate("/shipment"); // ✅ Redirect after successful update
      } else {
        alert(`Error updating shipment: ${data.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong! Please try again.");
    }
  };

  useEffect(() => {
    setBtn("Save");
    setUrl("/shipment");
    setGoBackUrl("/shipment");
  }, []);

  return (
    <>
      <FormPageHeader />

      <div className="container">
        <div className="form-container">
          <h2>Edit Shipment</h2>

          <form onSubmit={handleSubmit}>
            <div className="header-box">
              <h2>Header</h2>

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
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="item-box">
              <h2>Item</h2>

              <div className="data-container">
                <div className="data">
                  <label htmlFor="trackingNumber">Tracking Number</label>
                  <input
                    type="text"
                    id="trackingNumber"
                    name="trackingNumber"
                    value={formData.trackingNumber}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="data">
                  <label htmlFor="shipmentStatus">Shipment Status</label>
                  <select
                    name="shipmentStatus"
                    id="shipmentStatus"
                    value={formData.shipmentStatus}
                    onChange={handleChange}
                  >
                    <option value="PENDING">Pending</option>
                    <option value="DISPATCHED">Dispatch</option>
                    <option value="IN_TRANSIT">In-Transit</option>
                    <option value="DELIVERED">Delivered</option>
                    <option value="CANCELLED">Cancelled</option>
                  </select>
                </div>

                <div className="data">
                  <label htmlFor="dispatchDate">Dispatch Date</label>
                  <input
                    type="date"
                    id="dispatchDate"
                    name="dispatchDate"
                    value={formData.dispatchDate}
                    onChange={handleChange}
                    required
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
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            <button type="submit" className="edit-btn">
              Submit Edit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
