
import React, { useContext, useEffect } from "react";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";

export default function DisplayDeliveryRouteForm() {
	const { setBtn, setGoBackUrl } = useContext(FormPageHeaderContext);
		
	useEffect(() => {
		setBtn("NoBtn");
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
										disabled
									/>
								</div>

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
									<label htmlFor="sourceLocation">Source Location</label>
									<input
										type="text"
										id="sourceLocation"
										name="sourceLocation"
										disabled
									/>
								</div>

								<div className="data">
									<label htmlFor="destinationLocation">Destination Location</label>
									<input
										type="text"
										id="destinationLocation"
										name="destinationLocation"
										disabled
									/>
								</div>

								<div className="data">
									<label htmlFor="routeTime">Route Time</label>
									<input
										type="time"
										id="routeTime"
										name="routeTime"
										disabled
									/>
								</div>

								<div className="data">
									<label htmlFor="distance">Distance</label>
									<input
										type="text"
										id="distance"
										name="distance"
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
