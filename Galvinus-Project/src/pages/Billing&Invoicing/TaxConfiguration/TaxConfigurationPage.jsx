
import React, { useContext, useEffect } from "react";
import Tips from "../../../components/Tips/Tips";
import { TipsPageHeaderContext } from "../../../contexts/TipsPageHeaderContext";
import TipsPageHeader from "../../../components/Layout/TipsPageHeader/TipsPageHeader";

const TaxConfigurationPage = () => {
	const { setCreateBtn, setEditBtn, setDisplayBtn, setCreateUrl, setEditUrl, setDisplayUrl } = useContext(TipsPageHeaderContext);

	useEffect(() => {
		setCreateBtn("Create Tax Configuration");
		setEditBtn("Edit Tax Configuration");
		setDisplayBtn("Display Tax Configuration");
		setCreateUrl("/createtaxconfiguration");
		setEditUrl("/edittaxconfiguration");
		setDisplayUrl("/displaytaxconfiguration");
	}, []);

	return (
		<>
			<TipsPageHeader />
			<Tips />
		</>
	);
}

export default TaxConfigurationPage;