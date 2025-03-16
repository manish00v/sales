import React, { useState } from "react";
import "../../../../components/Layout/Styles/BoxFormStyles.css";

export default function CreateCarrierForm() {
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
				<h2>Create Discount</h2>

				<form>
					{/* Header Box */}
					<div className="header-box">
						<h2>Header</h2>

						<div className="data-container">
							<div className="data">
								<label htmlFor="carrierId">Carrier ID</label>
								<input
									type="text"
									id="carrierId"
									name="carrierId"
									placeholder="(Primary Key)"
									value={formData.customerId}
									onChange={handleChange}
									required
								/>
							</div>

							<div className="data">
								<label htmlFor="shipmentId">Shipment ID</label>
								<input
									type="text"
									id="shipmentId"
									name="shipmentId"
									value={formData.orderId}
									onChange={handleChange}
									required
								/>
							</div>

							<div className="data">
								<label htmlFor="orderId">Order ID</label>
								<input
									type="text"
									id="orderId"
									name="orderId"
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
								<label htmlFor="name">Name</label>
								<input
									type="text"
									id="name"
									name="name"
									value={formData.orderDate}
									onChange={handleChange}
									required
								/>
							</div>

							<div className="data">
								<label htmlFor="serviceType">Service Type</label>
								<input
									type="text"
									id="serviceType"
									name="serviceType"
									value={formData.requiredDate}
									onChange={handleChange}
									required
								/>
							</div>

							<div className="data">
								<label htmlFor="contactDetails">Contact Details</label>
								<input
									type="text"
									id="contactDetails"
									name="contactDetails"
									value={formData.deliveryBlock}
									onChange={handleChange}
									required
								/>
							</div>

							<div className="data">
								<label htmlFor="costStructure">Cost Structure</label>
								<input
									type="text"
									id="costStructure"
									name="costStructure"
									value={formData.deliveryBlock}
									onChange={handleChange}
									required
								/>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}
