
import React, { useEffect, useContext } from "react";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";

export default function DisplayPaymentPage() {
	const { setBtn, setUrl, setGoBackUrl } = useContext(FormPageHeaderContext);
	
	useEffect(() => {
		setBtn("Display");
		setUrl("/displaypaymentpage");		// Edit this
		setGoBackUrl("/payment");
	}, []);

	return (
		<>
			<FormPageHeader />

			<div className="container">
				<div className="form-container">
					<h2>Display Payment - Mandatory Details</h2>

					<form className="header-box">
						<div className="data-container">
							<div className="data">
								<label htmlFor="paymentId">Payment ID</label>
								<input
									type="text"
									id="paymentId"
									name="paymentId"
									required
								/>
							</div>

							<div className="data">
								<label htmlFor="invoiceId">Invoice ID</label>
								<input
									type="text"
									id="invoiceId"
									name="invoiceId"
									required
								/>
							</div>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}
