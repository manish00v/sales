
import React, { useContext, useEffect } from "react";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";

export default function EditInventoryForm() {
	const { setBtn, setUrl, setGoBackUrl } = useContext(FormPageHeaderContext);
		
	useEffect(() => {
		setBtn("Save");
		setUrl("/inventory");
		setGoBackUrl("/inventory");
	}, []);

	return (
		<>
			<FormPageHeader />

			<div className="container">
				<div className="form-container">
					<h2>Edit Inventory</h2>

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
										placeholder="Foreign Key for Product"
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
									<label htmlFor="locationId">Location ID</label>
									<input
										type="text"
										id="locationId"
										name="locationId"
										value=""
										required
									/>
								</div>

								<div className="data">
									<label htmlFor="stockLevel">Stock Level</label>
									<input
										type="text"
										id="stockLevel"
										name="stockLevel"
										value=""
										required
									/>
								</div>

								<div className="data">
									<label htmlFor="reorderLevel">Reorder Level</label>
									<input
										type="text"
										id="reorderLevel"
										name="reorderLevel"
										value=""
										required
									/>
								</div>

								<div className="data">
									<label htmlFor="safetyStock">Safety Stock</label>
									<input
										type="text"
										id="safetyStock"
										name="safetyStock"
										value=""
										required
									/>
								</div>

								<div className="data">
									<label htmlFor="safetyStock">Lot Number</label>
									<input
										type="text"
										id="safetyStock"
										name="safetyStock"
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
