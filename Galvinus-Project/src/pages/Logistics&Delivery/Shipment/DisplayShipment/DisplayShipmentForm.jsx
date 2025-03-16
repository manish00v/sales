
import React, { useContext, useEffect } from "react";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";

export default function DisplayShipmentForm() {
	const { setBtn, setGoBackUrl } = useContext(FormPageHeaderContext);
		
	useEffect(() => {
		setBtn("NoBtn");
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
										disabled
									/>
								</div>

								<div className="data">
									<label htmlFor="orderId">Order ID</label>
									<input
										type="text"
										id="orderId"
										name="orderId"
										disabled
									/>
								</div>

								<div className="data">
									<label htmlFor="carrierId">Carrier ID</label>
									<input
										type="text"
										id="carrierId"
										name="carrierId"
										disabled
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
										disabled
									/>
								</div>

								<div className="data">
									<label htmlFor="shipmentStatus">Shipment Status</label>
									<input
										type="text"
										id="shipmentStatus"
										name="shipmentStatus"
										disabled
									/>
								</div>

								<div className="data">
									<label htmlFor="dispatchDate">Dispatch Date</label>
									<input
										type="date"
										id="dispatchDate"
										name="dispatchDate"
										disabled
									/>
								</div>

								<div className="data">
									<label htmlFor="estimatedDeliveryDate">Estimated Delivery Date</label>
									<input
										type="date"
										id="estimatedDeliveryDate"
										name="estimatedDeliveryDate"
										disabled
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
