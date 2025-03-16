
import React, { useContext, useEffect } from "react";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";

export default function EditProductMovementForm() {
	const { setBtn, setUrl, setGoBackUrl } = useContext(FormPageHeaderContext);
		
	useEffect(() => {
		setBtn("Save");
		setUrl("/productmovement");
		setGoBackUrl("/productmovement");
	}, []);

	return (
		<>
			<FormPageHeader />

			<div className="container">
				<div className="form-container">
					<h2>Edit Product Movement</h2>

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
									<label htmlFor="warehouseId">Warehouse ID</label>
									<input
										type="text"
										id="warehouseId"
										name="warehouseId"
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
									<label htmlFor="sourceLocation">Source Location</label>
									<input
										type="text"
										id="sourceLocation"
										name="sourceLocation"
										value=""
										required
									/>
								</div>

								<div className="data">
									<label htmlFor="destinationLocation">Destination Location</label>
									<input
										type="text"
										id="destinationLocation"
										name="destinationLocation"
										value=""
										required
									/>
								</div>

								<div className="data">
									<label htmlFor="quantity">Quantity</label>
									<input
										type="text"
										id="quantity"
										name="quantity"
										value=""
										required
									/>
								</div>

								<div className="data">
									<label htmlFor="movementDate">Movement Date</label>
									<input
										type="date"
										id="movementDate"
										name="movementDate"
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
