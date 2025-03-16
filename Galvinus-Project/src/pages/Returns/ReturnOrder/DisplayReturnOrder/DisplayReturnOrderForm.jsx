
import React, { useContext, useEffect } from "react";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";

export default function DisplayReturnOrderForm() {
	const { setBtn, setGoBackUrl } = useContext(FormPageHeaderContext);
		
	useEffect(() => {
		setBtn("NoBtn");
		setGoBackUrl("/returnorder");
	}, []);

	return (
		<>
			<FormPageHeader />

			<div className="container">
				<div className="form-container">
					<h2>Display Return Order</h2>

					<div className="header-box">
						<h2>Header</h2>

						<form>
							<div className="data-container">
								<div className="data">
									<label htmlFor="returnOrderId">Return Order ID</label>
									<input
										type="text"
										id="returnOrderId"
										name="returnOrderId"
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

								<div className="data">
									<label htmlFor="originalSalesOrderId">Original Sales Order ID</label>
									<input
										type="text"
										id="originalSalesOrderId"
										name="originalSalesOrderId"
										disabled
									/>
								</div>

								<div className="data">
									<label htmlFor="originalSalesOrderId">Original Sales Order ID</label>
									<input
										type="text"
										id="originalSalesOrderId"
										name="originalSalesOrderId"
										disabled
									/>
								</div>
								
								<div className="data">
									<label htmlFor="productId">Product ID</label>
									<input
										type="text"
										id="productId"
										name="productId"
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
									<label htmlFor="returnDate">Return Date</label>
									<input
										type="date"
										id="returnDate"
										name="returnDate"
										disabled
									/>
								</div>

								<div className="data">
									<label htmlFor="reasonForReturn">Reason for Return</label>
									<input
										type="text"
										id="reasonForReturn"
										name="reasonForReturn"
										disabled
									/>
								</div>

								<div className="data">
									<label htmlFor="approvalStatus">Approval Status</label>
									<input
										type="text"
										id="approvalStatus"
										name="approvalStatus"
										disabled
									/>
								</div>

								<div className="data">
									<label htmlFor="returnStatus">Return Status</label>
									<input
										type="date"
										id="returnStatus"
										name="returnStatus"
										disabled
									/>
								</div>

								<div className="data">
									<label htmlFor="refundReplacementStatus">Refund/Replacement Status</label>
									<input
										type="date"
										id="refundReplacementStatus"
										name="refundReplacementStatus"
										disabled
									/>
								</div>

								<div className="data">
									<label htmlFor="totalRefundAmount">Total Refund Amount</label>
									<input
										type="date"
										id="totalRefundAmount"
										name="totalRefundAmount"
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
