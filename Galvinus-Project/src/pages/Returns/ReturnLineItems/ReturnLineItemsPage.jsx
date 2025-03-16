
import React, { useContext, useEffect } from "react";
import Tips from "../../../components/Tips/Tips";
import { TipsPageHeaderContext } from "../../../contexts/TipsPageHeaderContext";
import TipsPageHeader from "../../../components/Layout/TipsPageHeader/TipsPageHeader";

const ReturnLineItemsPage = () => {
	const { setCreateBtn, setEditBtn, setDisplayBtn, setCreateUrl, setEditUrl, setDisplayUrl } = useContext(TipsPageHeaderContext);

	useEffect(() => {
		setCreateBtn("Create Return Line Items");
		setEditBtn("Edit Return Line Items");
		setDisplayBtn("Display Return Line Items");
		setCreateUrl("/createreturnlineitems");
		setEditUrl("/editreturnlineitems");
		setDisplayUrl("/displayreturnlineitems");
	}, []);

	return (
		<>
			<TipsPageHeader />
			<Tips />
		</>
	);
}

export default ReturnLineItemsPage;