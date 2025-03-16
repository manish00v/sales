
import React, { useContext, useEffect } from "react";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";

export default function EditPaymentForm() {
	const { setBtn, setUrl, setGoBackUrl } = useContext(FormPageHeaderContext);
		
	useEffect(() => {
		setBtn("Save");
		setUrl("/payment");
		setGoBackUrl("/payment");
	}, []);

	return (
		<>
			<FormPageHeader />

			<div className="container">
				<div className="form-container">
					<h2>Edit Payment</h2>

					<div className="header-box">
						<h2>Header</h2>

						<form>
							<div className="data-container">
								<div className="data">
									<label htmlFor="paymentId">Payment ID</label>
									<input
										type="text"
										id="paymentId"
										name="paymentId"
										placeholder="(Primary Key)"
										value=""
										required
									/>
								</div>

								<div className="data">
									<label htmlFor="invoiceId">Invoice ID</label>
									<input
										type="text"
										id="invoiceId"
										name="invoiceId"
										placeholder="Foreign Key to Invoice"
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
									<label htmlFor="amountPaid">Amount Paid</label>
									<input
										type="text"
										id="amountPaid"
										name="amountPaid"
										value=""
										required
									/>
								</div>

								<div className="data">
									<label htmlFor="paymentDate">Payment Date</label>
									<input
										type="date"
										id="paymentDate"
										name="paymentDate"
										value=""
										required
									/>
								</div>

								<div className="data">
									<label htmlFor="paymentMode">Payment Mode</label>
									<input
										type="text"
										id="paymentMode"
										name="paymentMode"
										value=""
										required
									/>
								</div>

								<div className="data">
									<label htmlFor="transactionReferenceNumber">Transaction Reference Number</label>
									<input
										type="text"
										id="transactionReferenceNumber"
										name="transactionReferenceNumber"
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
