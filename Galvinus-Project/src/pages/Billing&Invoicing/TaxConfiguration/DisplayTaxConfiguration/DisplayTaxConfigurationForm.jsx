
import React, { useContext, useEffect } from "react";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";

export default function DisplayTaxConfigurationForm() {
	const { setBtn, setGoBackUrl } = useContext(FormPageHeaderContext);
		
	useEffect(() => {
		setBtn("NoBtn");
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
										disabled
									/>
								</div>

								<div className="data">
									<label htmlFor="invoiceId">Invoice ID</label>
									<input
										type="text"
										id="invoiceId"
										name="invoiceId"
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
									<label htmlFor="customerId">Customer ID</label>
									<input
										type="text"
										id="customerId"
										name="customerId"
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
									<label htmlFor="region">Region</label>
									<input
										type="text"
										id="region"
										name="region"
										disabled
									/>
								</div>

								<div className="data">
									<label htmlFor="taxType">Tax Type</label>
									<input
										type="text"
										id="taxType"
										name="taxType"
										disabled
									/>
								</div>

								<div className="data">
									<label htmlFor="taxPercentage">Tax Percentage</label>
									<input
										type="text"
										id="taxPercentage"
										name="taxPercentage"
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
