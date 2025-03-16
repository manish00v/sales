
import React, { useContext, useEffect } from "react";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";

export default function EditCarrierForm() {
	const { setBtn, setUrl, setGoBackUrl } = useContext(FormPageHeaderContext);
		
	useEffect(() => {
		setBtn("Save");
		setUrl("/carrier");
		setGoBackUrl("/carrier");
	}, []);

	return (
		<>
			<FormPageHeader />

			<div className="container">
				<div className="form-container">
					<h2>Edit Carrier</h2>

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
										value=""
										required
									/>
								</div>

								<div className="data">
									<label htmlFor="serviceType">Service Type</label>
									<input
										type="text"
										id="serviceType"
										name="serviceType"
										value=""
										required
									/>
								</div>

								<div className="data">
									<label htmlFor="contactDetails">Contact Details</label>
									<input
										type="text"
										id="contactDetails"
										name="contactDetails"
										value=""
										required
									/>
								</div>

								<div className="data">
									<label htmlFor="costStructure">Cost Structure</label>
									<input
										type="text"
										id="costStructure"
										name="costStructure"
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
