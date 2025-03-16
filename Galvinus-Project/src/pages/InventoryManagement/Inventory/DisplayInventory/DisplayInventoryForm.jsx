
import React, { useContext, useEffect } from "react";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";

export default function DisplayInventoryForm() {
	const { setBtn, setGoBackUrl } = useContext(FormPageHeaderContext);
		
	useEffect(() => {
		setBtn("NoBtn");
		setGoBackUrl("/inventory");
	}, []);

	return (
		<>
			<FormPageHeader />

			<div className="container">
				<div className="form-container">
					<h2>Display Inventory</h2>

					<div className="header-box">
						<h2>Header</h2>

						<form>
							<div className="data-container">
								<div className="data">
									<label htmlFor="inventoryId">Inventory ID</label>
									<input
										type="text"
										id="inventoryId"
										name="inventoryId"
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

								<div className="data">
									<label htmlFor="warehouseId">Warehouse ID</label>
									<input
										type="text"
										id="warehouseId"
										name="warehouseId"
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
									<label htmlFor="discountCriteria">Discount Criteria</label>
									<input
										type="text"
										id="discountCriteria"
										name="discountCriteria"
										disabled
									/>
								</div>

								<div className="data">
									<label htmlFor="productDiscount">Product Discount</label>
									<input
										type="text"
										id="productDiscount"
										name="productDiscount"
										disabled
									/>
								</div>

								<div className="data">
									<label htmlFor="customerDiscount">Customer Discount</label>
									<input
										type="text"
										id="customerDiscount"
										name="customerDiscount"
										disabled
									/>
								</div>

								<div className="data">
									<label htmlFor="discountValue">Discount Value</label>
									<input
										type="text"
										id="discountValue"
										name="discountValue"
										disabled
									/>
								</div>

								<div className="data">
									<label htmlFor="discountEligibilityCondition">Discount Eligibility Condition</label>
									<input
										type="text"
										id="discountEligibilityCondition"
										name="discountEligibiltyCondition"
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
