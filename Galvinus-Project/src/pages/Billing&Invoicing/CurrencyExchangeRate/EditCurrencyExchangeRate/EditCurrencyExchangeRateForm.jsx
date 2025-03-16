
import React, { useContext, useEffect } from "react";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";

export default function EditCurrencyExchangeRateForm() {
	const { setBtn, setUrl, setGoBackUrl } = useContext(FormPageHeaderContext);
		
	useEffect(() => {
		setBtn("Save");
		setUrl("/currencyexchangerate");
		setGoBackUrl("/currencyexchangerate");
	}, []);

	return (
		<>
			<FormPageHeader />

			<div className="container">
				<div className="form-container">
					<h2>Edit Currency Exchange Rate</h2>

					<div className="header-box">
						<h2>Header</h2>

						<form>
							<div className="data-container">
								<div className="data">
									<label htmlFor="invoiceId">Invoice ID</label>
									<input
										type="text"
										id="invoiceId"
										name="invoiceId"
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
									<label htmlFor="customerId">Customer ID</label>
									<input
										type="text"
										id="customerId"
										name="customerId"
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
									<label htmlFor="currencyCode">Currency Code</label>
									<input
										type="text"
										id="currencyCode"
										name="currencyCode"
										value=""
										required
									/>
								</div>

								<div className="data">
									<label htmlFor="exchangeRate">Exchange Rate</label>
									<input
										type="number"
										id="exchangeRate"
										name="exchangeRate"
										value=""
										required
									/>
								</div>

								<div className="data">
									<label htmlFor="effectiveDate">Effective Date</label>
									<input
										type="date"
										id="effectiveDate"
										name="effectiveDate"
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
