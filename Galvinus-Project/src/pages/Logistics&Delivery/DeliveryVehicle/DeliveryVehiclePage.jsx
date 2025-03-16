
import React, { useContext, useEffect } from "react";
import Tips from "../../../components/Tips/Tips";
import { TipsPageHeaderContext } from "../../../contexts/TipsPageHeaderContext";
import TipsPageHeader from "../../../components/Layout/TipsPageHeader/TipsPageHeader";

const DeliveryVehiclePage = () => {
	const { setCreateBtn, setEditBtn, setDisplayBtn, setCreateUrl, setEditUrl, setDisplayUrl } = useContext(TipsPageHeaderContext);

	useEffect(() => {
		setCreateBtn("Create Delivery Vehicle");
		setEditBtn("Edit Delivery Vehicle");
		setDisplayBtn("Display Deliver Vehicle");
		setCreateUrl("/createdeliveryvehicle");
		setEditUrl("/editdeliveryvehicle");
		setDisplayUrl("/displaydeliveryvehicle");
	}, []);

	return (
		<>
			<TipsPageHeader />
			<Tips />
		</>
	);
}

export default DeliveryVehiclePage;