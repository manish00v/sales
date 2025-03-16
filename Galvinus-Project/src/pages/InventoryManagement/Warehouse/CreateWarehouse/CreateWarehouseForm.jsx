import React, { useState } from "react";
import "../../../../components/Layout/Styles/BoxFormStyles.css";

export default function CreateWarehouseForm() {
	const [formData, setFormData] = useState({
		customerId: "",
		orderId: "",
		productId: "",
		orderDate: "",
		requiredDate: "",
		deliveryBlock: "",
		orderStatus: "pending",
		paymentStatus: "unpaid",
		total: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	return (
		<div className="container">
			<div className="form-container">
				<h2>Create Warehouse</h2>

				<form>
					{/* Header Box */}
					<div className="header-box">
						<h2>Header</h2>

						<div className="data-container">
							<div className="data">
								<label htmlFor="warehouseId">Warehouse ID</label>
								<input
									type="text"
									id="warehouseId"
									name="warehouseId"
									placeholder="(Primary Key)"
									value={formData.customerId}
									onChange={handleChange}
									required
								/>
							</div>

							<div className="data">
								<label htmlFor="inventoryId">Inventory ID</label>
								<input
									type="text"
									id="inventoryId"
									name="inventoryId"
									value={formData.orderId}
									onChange={handleChange}
									required
								/>
							</div>

							<div className="data">
								<label htmlFor="productId">Product ID</label>
								<input
									type="text"
									id="productId"
									name="productId"
									value={formData.orderId}
									onChange={handleChange}
									required
								/>
							</div>
						</div>
					</div>

					{/* Item Box */}
					<div className="item-box">
						<h2>Item</h2>

						<div className="data-container">
							<div className="data">
								<label htmlFor="warehouseName">Warehouse Name</label>
								<input
									type="text"
									id="warehouseName"
									name="warehouseName"
									value={formData.orderDate}
									onChange={handleChange}
									required
								/>
							</div>

							<div className="data">
								<label htmlFor="warehouseAddress">Warehouse Address</label>
								<input
									type="text"
									id="warehouseAddress"
									name="warehouseAddress"
									value={formData.requiredDate}
									onChange={handleChange}
									required
								/>
							</div>

							<div className="data">
								<label htmlFor="warehouseCapacity">Warehouse Capacity</label>
								<input
									type="text"
									id="warehouseCapacity"
									name="warehouseCapacity"
									value={formData.deliveryBlock}
									onChange={handleChange}
									required
								/>
							</div>

							<div className="data">
								<label htmlFor="warehouseType">Warehouse Type</label>
								<select
									id="warehouseType"
									name="warehouseType"
									value={formData.paymentStatus}
									onChange={handleChange}
								>
									<option>Owned</option>
									<option>3rd Party</option>
								</select>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}
