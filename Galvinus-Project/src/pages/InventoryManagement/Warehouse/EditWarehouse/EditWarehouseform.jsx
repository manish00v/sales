
import React, { useContext, useEffect } from "react";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";

export default function EditWarehouseForm() {
	const { setBtn, setUrl, setGoBackUrl } = useContext(FormPageHeaderContext);
		
	useEffect(() => {
		setBtn("Save");
		setUrl("/warehouse");
		setGoBackUrl("/warehouse");
	}, []);

	return (
		<>
			<FormPageHeader />

			<div className="container">
				<div className="form-container">
					<h2>Edit Warehouse</h2>

					<div className="header-box">
						<h2>Header</h2>

						<form>
							<div className="data-container">
								<div className="data">
									<label htmlFor="warehouseId">Warehouse ID</label>
									<input
										type="text"
										id="warehouseId"
										name="warehouseId"
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
									<label htmlFor="warehouseName">Warehouse Name</label>
									<input
										type="text"
										id="warehouseName"
										name="warehouseName"
										value=""
										required
									/>
								</div>

								<div className="data">
									<label htmlFor="warehouseAddress">Warehouse Address</label>
									<input
										type="text"
										id="warehouseAddress"
										name="warehouseAddress"
										value=""
										required
									/>
								</div>

								<div className="data">
									<label htmlFor="warehouseCapacity">Warehouse Capacity</label>
									<input
										type="text"
										id="warehouseCapacity"
										name="warehouseCapacity"
										value=""
										required
									/>
								</div>

								<div className="data">
									<label htmlFor="warehouseType">Warehouse Type</label>
									<select
										id="warehouseType"
										name="warehouseType"
										value=""
									>
										<option>Owned</option>
										<option>3rd Party</option>
									</select>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
}
