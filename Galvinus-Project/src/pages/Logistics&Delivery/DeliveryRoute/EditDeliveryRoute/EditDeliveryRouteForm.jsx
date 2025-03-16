
import React, { useContext, useEffect } from "react";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";

export default function EditDeliveryRouteForm() {
	const { setBtn, setUrl, setGoBackUrl } = useContext(FormPageHeaderContext);
		
	useEffect(() => {
		setBtn("Save");
		setUrl("/deliveryroute");
		setGoBackUrl("/deliveryroute");
	}, []);

	return (
		<>
			<FormPageHeader />

			<div className="container">
				<div className="form-container">
					<h2>Edit Delivery Route</h2>

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
										placeholder="(Primary Key)"
										value=""
										required
									/>
								</div>

								<div className="data">
									<label htmlFor="shipmentId">Shipment ID</label>
									<input
										type="text"
										id="shipmentId"
										name="shipmentId"
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
									<label htmlFor="sourceLocation">Source Location</label>
									<input
										type="text"
										id="sourceLocation"
										name="sourceLocation"
										value=""
										required
									/>
								</div>

								<div className="data">
									<label htmlFor="destinationLocation">Destination Location</label>
									<input
										type="text"
										id="destinationLocation"
										name="destinationLocation"
										value=""
										required
									/>
								</div>

								<div className="data">
									<label htmlFor="routeTime">Route Time</label>
									<input
										type="time"
										id="routeTime"
										name="routeTime"
										value=""
										required
									/>
								</div>

								<div className="data">
									<label htmlFor="distance">Distance</label>
									<input
										type="text"
										id="distance"
										name="distance"
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
