
import React, { useContext, useEffect } from "react";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";

export default function DisplayCarrierForm() {
	const { setBtn, setGoBackUrl } = useContext(FormPageHeaderContext);
		
	useEffect(() => {
		setBtn("NoBtn");
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
										disabled
									/>
								</div>

								<div className="data">
									<label htmlFor="serviceType">Service Type</label>
									<input
										type="text"
										id="serviceType"
										name="serviceType"
										disabled
									/>
								</div>

								<div className="data">
									<label htmlFor="contactDetails">Contact Details</label>
									<input
										type="text"
										id="contactDetails"
										name="contactDetails"
										disabled
									/>
								</div>

								<div className="data">
									<label htmlFor="costStructure">Cost Structure</label>
									<input
										type="text"
										id="costStructure"
										name="costStructure"
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
