
import React, { useContext, useEffect } from "react";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";

export default function DisplayProductMovementForm() {
	const { setBtn, setGoBackUrl } = useContext(FormPageHeaderContext);
		
	useEffect(() => {
		setBtn("NoBtn");
		setGoBackUrl("/productmovement");
	}, []);

	return (
		<>
			<FormPageHeader />

			<div className="container">
				<div className="form-container">
					<h2>Display Product Movement</h2>

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
									<label htmlFor="inventoryId">Inventory ID</label>
									<input
										type="text"
										id="inventoryId"
										name="inventoryId"
										disabled
									/>
								</div>

								<div className="data">
									<label htmlFor="sourceLocation">Source Location</label>
									<input
										type="text"
										id="sourceLocation"
										name="sourceLocation"
										disabled
									/>
								</div>

								<div className="data">
									<label htmlFor="destinationLocation">Destination Location</label>
									<input
										type="text"
										id="destinationLocation"
										name="destinationLocation"
										disabled
									/>
								</div>

								<div className="data">
									<label htmlFor="quantity">Quantity</label>
									<input
										type="text"
										id="quantity"
										name="quantity"
										disabled
									/>
								</div>

								<div className="data">
									<label htmlFor="movementDate">Movement Date</label>
									<input
										type="date"
										id="movementDate"
										name="movementDate"
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
