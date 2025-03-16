
import React, { useContext, useEffect } from "react";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";

export default function EditSupplierForm() {
	const { setBtn, setUrl, setGoBackUrl } = useContext(FormPageHeaderContext);
		
	useEffect(() => {
		setBtn("Save");
		setUrl("/supplier");
		setGoBackUrl("/supplier");
	}, []);

	return (
		<>
			<FormPageHeader />

			<div className="container">
				<div className="form-container">
					<h2>Edit Supplier</h2>

					<div className="header-box">
						<h2>Header</h2>

						<form>
							<div className="data-container">
								<div className="data">
									<label htmlFor="supplierId">Supplier ID</label>
									<input
										type="text"
										id="supplierId"
										name="supplierId"
										placeholder="(Primary Key)"
										value=""
										required
									/>
								</div>

								<div className="data">
									<label htmlFor="inventoryId">Inventory ID</label>
									<input
										type="text"
										id="inventoryId"
										name="inventoryId"
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
										value=""
										required
									/>
								</div>

								<div className="data">
									<label htmlFor="supplierContact">Supplier Contact</label>
									<input
										type="tel"
										id="supplierContact"
										name="supplierContact"
										value=""
										required
									/>
								</div>

								<div className="data">
									<label htmlFor="supplierEmail">Supplier Email</label>
									<input
										type="email"
										id="supplierEmail"
										name="supplierEmail"
										value=""
										required
									/>
								</div>

								<div className="data">
									<label htmlFor="leadTime">Lead Time</label>
									<input
										type="time"
										id="leadTime"
										name="leadTime"
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
