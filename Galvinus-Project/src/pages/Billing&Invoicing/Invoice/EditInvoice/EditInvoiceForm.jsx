
import React, { useContext, useEffect } from "react";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";

export default function EditInvoiceForm() {
	const { setBtn, setUrl, setGoBackUrl } = useContext(FormPageHeaderContext);
		
	useEffect(() => {
		setBtn("Save");
		setUrl("/invoice");
		setGoBackUrl("/invoice");
	}, []);

	return (
		<>
			<FormPageHeader />

			<div className="container">
				<div className="form-container">
					<h2>Edit Invoice</h2>

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
										placeholder="(Primary Key)"
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
										placeholder="(Foreign Key of Sales Order)"
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
									<label htmlFor="invoiceDate">Invoice Date</label>
									<input
										type="date"
										id="invoiceDate"
										name="invoiceDate"
										value=""
										required
									/>
								</div>

								<div className="data">
									<label htmlFor="totalAmount">Total Amount</label>
									<input
										type="text"
										id="totalAmount"
										name="totalAmount"
										value=""
										required
									/>
								</div>

								<div className="data">
									<label htmlFor="tax">Tax</label>
									<input
										type="text"
										id="tax"
										name="tax"
										value=""
										required
									/>
								</div>

								<div className="data">
									<label htmlFor="paymentStatus">Payment Status</label>
									<input
										type="text"
										id="paymentStatus"
										name="paymentStatus"
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
