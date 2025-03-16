
import React, { useEffect, useContext } from "react";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";

export default function DisplayInventoryPage() {
	const { setBtn, setUrl, setGoBackUrl } = useContext(FormPageHeaderContext);
	
	useEffect(() => {
		setBtn("Display");
		setUrl("/displayinventorypage");		// Edit this
		setGoBackUrl("/inventory");
	}, []);

	return (
		<>
			<FormPageHeader />

			<div className="container">
				<div className="form-container">
					<h2>Display Inventory - Mandatory Details</h2>

					<form className="header-box">
						<div className="data-container">
							<div className="data">
								<label htmlFor="inventoryId">Inventory ID</label>
								<input
									type="text"
									id="inventoryId"
									name="inventoryId"
									required
								/>
							</div>

							<div className="data">
								<label htmlFor="inventoryId">Warehouse ID</label>
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
