
import React, { useContext, useEffect } from "react";
import Tips from "../../../components/Tips/Tips";
import { TipsPageHeaderContext } from "../../../contexts/TipsPageHeaderContext";
import TipsPageHeader from "../../../components/Layout/TipsPageHeader/TipsPageHeader";

const DeliveryRoutePage = () => {
	const { setCreateBtn, setEditBtn, setDisplayBtn, setCreateUrl, setEditUrl, setDisplayUrl } = useContext(TipsPageHeaderContext);

	useEffect(() => {
		setCreateBtn("Create Delivery Route");
		setEditBtn("Edit Delivery Route");
		setDisplayBtn("Display Delivery Route");
		setCreateUrl("/createdeliveryroute");
		setEditUrl("/editdeliveryroute");
		setDisplayUrl("/displaydeliveryroute");
	}, []);

	return (
		<>
			<TipsPageHeader />
			<Tips />
		</>
	);
}

export default DeliveryRoutePage;