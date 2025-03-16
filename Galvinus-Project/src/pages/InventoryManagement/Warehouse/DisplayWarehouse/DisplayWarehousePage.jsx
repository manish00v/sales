
import React, { useEffect, useContext } from "react";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";

export default function DisplayWarehousePage() {
	const { setBtn, setUrl, setGoBackUrl } = useContext(FormPageHeaderContext);
	
	useEffect(() => {
		setBtn("Display");
		setUrl("/displaywarehousepage");		// Edit this
		setGoBackUrl("/warehouse");
	}, []);

	return (
		<>
			<FormPageHeader />

			<div className="container">
				<div className="form-container">
					<h2>Display Warehouse - Mandatory Details</h2>

					<form className="header-box">
						<div className="data-container">
							<div className="data">
								<label htmlFor="warehouseId">Warehouse ID</label>
								<input
									type="text"
									id="warehouseId"
									name="warehouseId"
									required
								/>
							</div>

							<div className="data">
								<label htmlFor="inventoryId">Inventory ID</label>
								<input
									type="text"
									id="inventoryId"
									name="inventoryId"
									required
								/>
							</div>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}
