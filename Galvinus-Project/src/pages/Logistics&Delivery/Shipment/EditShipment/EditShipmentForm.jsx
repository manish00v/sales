
import React, { useContext, useEffect } from "react";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";

export default function EditShipmentForm() {
	const { setBtn, setUrl, setGoBackUrl } = useContext(FormPageHeaderContext);
		
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
										placeholder="(Primary Key)"
										value=""
										required
									/>
								</div>

								<div className="data">
									<label htmlFor="orderId">Order ID</label>
									<input
										type="text"
										id="orderId"
										name="orderId"
										placeholder="(Foreign Key to Sales Order)"
										value=""
										required
									/>
								</div>

								<div className="data">
									<label htmlFor="carrierId">Carrier ID</label>
									<input
										type="text"
										id="carrierId"
										name="carrierId"
										value=""
										required
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
										value=""
										required
									/>
								</div>

								<div className="data">
									<label htmlFor="shipmentStatus">Shipment Status</label>
									<input
										type="text"
										id="shipmentStatus"
										name="shipmentStatus"
										value=""
										required
									/>
								</div>

								<div className="data">
									<label htmlFor="dispatchDate">Dispatch Date</label>
									<input
										type="date"
										id="dispatchDate"
										name="dispatchDate"
										value=""
										required
									/>
								</div>

								<div className="data">
									<label htmlFor="estimatedDeliveryDate">Estimated Delivery Date</label>
									<input
										type="date"
										id="estimatedDeliveryDate"
										name="estimatedDeliveryDate"
										value=""
										required
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
