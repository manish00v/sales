
import React, { useContext, useEffect } from "react";
import Tips from "../../../components/Tips/Tips";
import { TipsPageHeaderContext } from "../../../contexts/TipsPageHeaderContext";
import TipsPageHeader from "../../../components/Layout/TipsPageHeader/TipsPageHeader";

const DiscountRulesPage = () => {
	const { setCreateBtn, setEditBtn, setDisplayBtn, setCreateUrl, setEditUrl, setDisplayUrl } = useContext(TipsPageHeaderContext);

	useEffect(() => {
		setCreateBtn("Create Discount Rules");
		setEditBtn("Edit Discount Rules");
		setDisplayBtn("Display Discount Rules");
		setCreateUrl("/creatediscountrules");
		setEditUrl("/editdiscountrules");
		setDisplayUrl("/displaydiscountrules");
	}, []);

	return (
		<>
			<TipsPageHeader />
			<Tips />
		</>
	);
}

export default DiscountRulesPage;