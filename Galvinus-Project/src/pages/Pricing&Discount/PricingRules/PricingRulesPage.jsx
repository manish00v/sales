
import React, { useContext, useEffect } from "react";
import Tips from "../../../components/Tips/Tips";
import { TipsPageHeaderContext } from "../../../contexts/TipsPageHeaderContext";
import TipsPageHeader from "../../../components/Layout/TipsPageHeader/TipsPageHeader";

const PricingRulesPage = () => {
	const { setCreateBtn, setEditBtn, setDisplayBtn, setCreateUrl, setEditUrl, setDisplayUrl } = useContext(TipsPageHeaderContext);

	useEffect(() => {
		setCreateBtn("Create Pricing Rules");
		setEditBtn("Edit Pricing Rules");
		setDisplayBtn("Display Pricing Rules");
		setCreateUrl("/createpricingrules");
		setEditUrl("/editpricingrules");
		setDisplayUrl("/displaypricingrules");
	}, []);

	return (
		<>
			<TipsPageHeader />
			<Tips />
		</>
	);
}

export default PricingRulesPage;