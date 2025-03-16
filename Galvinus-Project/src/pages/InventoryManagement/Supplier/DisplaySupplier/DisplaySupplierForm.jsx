
import React, { useContext, useEffect } from "react";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";

export default function DisplaySupplierForm() {
	const { setBtn, setGoBackUrl } = useContext(FormPageHeaderContext);
		
	useEffect(() => {
		setBtn("NoBtn");
		setGoBackUrl("/supplier");
	}, []);

	return (
		<>
			<FormPageHeader />

			<div className="container">
				<div className="form-container">
					<h2>Display Supplier</h2>

					<div className="header-box">
						<h2>Header</h2>

						<form>
							<div className="data-container">
								<div className="data">
									<label htmlFor="movementId">Movement ID</label>
									<input
										type="text"
										id="movementId"
										name="movementId"
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
									<label htmlFor="supplierName">Supplier Name</label>
									<input
										type="text"
										id="supplierName"
										name="supplierName"
										disabled
									/>
								</div>

								<div className="data">
									<label htmlFor="supplierContact">Supplier Contact</label>
									<input
										type="tel"
										id="supplierContact"
										name="supplierContact"
										disabled
									/>
								</div>

								<div className="data">
									<label htmlFor="supplierEmail">Supplier Email</label>
									<input
										type="email"
										id="supplierEmail"
										name="supplierEmail"
										disabled
									/>
								</div>

								<div className="data">
									<label htmlFor="leadTime">Lead Time</label>
									<input
										type="time"
										id="leadTime"
										name="leadTime"
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
