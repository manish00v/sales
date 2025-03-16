
import React, { useContext, useEffect } from "react";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";

export default function DisplayDeliveryVehicleForm() {
	const { setBtn, setGoBackUrl } = useContext(FormPageHeaderContext);
		
	useEffect(() => {
		setBtn("NoBtn");
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
									<label htmlFor="vehicleType">Vehicle Type</label>
									<input
										type="text"
										id="vehicleType"
										name="vehicleType"
										disabled
									/>
								</div>

								<div className="data">
									<label htmlFor="vehicleCapacity">Vehicle Capacity</label>
									<input
										type="text"
										id="vehicleCapacity"
										name="vehicleCapacity"
										disabled
									/>
								</div>

								<div className="data">
									<label htmlFor="assignedDriver">Assigned Driver</label>
									<input
										type="text"
										id="assignedDriver"
										name="assignedDriver"
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
