
import React, { useEffect, useContext } from "react";
import Tips from "../../../components/Tips/Tips";
import { TipsPageHeaderContext } from "../../../contexts/TipsPageHeaderContext";
import TipsPageHeader from "../../../components/Layout/TipsPageHeader/TipsPageHeader";

const LineItemsPage = () => {
	const { setCreateBtn, setEditBtn, setDisplayBtn, setCreateUrl, setEditUrl, setDisplayUrl } = useContext(TipsPageHeaderContext);

	useEffect(() => {
		setCreateBtn("Create Line Items");
		setEditBtn("Edit Line Items");
		setDisplayBtn("Display Line Items");
		setCreateUrl("/createlineitems");
		setEditUrl("/editlineitems");
		setDisplayUrl("/displaylineitems");
	}, []);

	return (
		<>
			<TipsPageHeader />
			<Tips />
		</>
	);
}

export default LineItemsPage;