
import React, { useContext, useEffect } from "react";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";

export default function EditReturnLineItemsForm() {
	const { setBtn, setUrl, setGoBackUrl } = useContext(FormPageHeaderContext);
		
	useEffect(() => {
		setBtn("Save");
		setUrl("/returnlineitems");
		setGoBackUrl("/returnlineitems");
	}, []);

	return (
		<>
			<FormPageHeader />

			<div className="container">
				<div className="form-container">
					<h2>Edit Return Line Items</h2>

					<div className="header-box">
						<h2>Header</h2>

						<form>
							<div className="data-container">
								<div className="data">
									<label htmlFor="lineItemId">Line Item ID</label>
									<input
										type="text"
										id="lineItemId"
										name="lineItemId"
										placeholder="(Primary Key)"
										value=""
										required
									/>
								</div>

								<div className="data">
									<label htmlFor="productId">Product ID</label>
									<input
										type="text"
										id="productId"
										name="productId"
										value=""
										required
									/>
								</div>

								<div className="data">
									<label htmlFor="productNameId">Product Name</label>
									<input
										type="text"
										id="productNameId"
										name="productNameId"
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
									<label htmlFor="quantityReturned">Quantity Returned</label>
									<input
										type="date"
										id="quantityReturned"
										name="quantityReturned"
										value=""
										required
									/>
								</div>

								<div className="data">
									<label htmlFor="returnReason">Return Reason</label>
									<input
										type="text"
										id="returnReason"
										name="returnReason"
										value=""
										required
									/>
								</div>

								<div className="data">
									<label htmlFor="conditionOfProduct">Condition of Product</label>
									<input
										type="text"
										id="conditionOfProduct"
										name="conditionOfProduct"
										value=""
										required
									/>
								</div>

								<div className="data">
									<label htmlFor="originalPrice">Original Price</label>
									<input
										type="date"
										id="originalPrice"
										name="originalPrice"
										value=""
										required
									/>
								</div>

								<div className="data">
									<label htmlFor="refundAmount">Refund Amount</label>
									<input
										type="date"
										id="refundAmount"
										name="refundAmount"
										value=""
										required
									/>
								</div>

								<div className="data">
									<label htmlFor="approvalStatus">Approval Status</label>
									<input
										type="date"
										id="approvalStatus"
										name="approvalStatus"
										value=""
										required
									/>
								</div>

								<div className="data">
									<label htmlFor="replacementStatus">Replacement Status</label>
									<input
										type="date"
										id="replacementStatus"
										name="replacementStatus"
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
