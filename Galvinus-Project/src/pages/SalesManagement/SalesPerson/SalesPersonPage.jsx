
import React, { useEffect, useContext } from "react";
import Tips from "../../../components/Tips/Tips";
import { TipsPageHeaderContext } from "../../../contexts/TipsPageHeaderContext";
import TipsPageHeader from "../../../components/Layout/TipsPageHeader/TipsPageHeader";

const SalesPersonPage = () => {
	const { setCreateBtn, setEditBtn, setDisplayBtn, setCreateUrl, setEditUrl, setDisplayUrl } = useContext(TipsPageHeaderContext);

	useEffect(() => {
		setCreateBtn("Create Sales Person");
		setEditBtn("Edit Sales Person");
		setDisplayBtn("Display Sales Person");
		setCreateUrl("/createsalesperson");
		setEditUrl("/editsalesperson");
		setDisplayUrl("/displaysalesperson");
	}, []);

	return (
		<>
			<TipsPageHeader />
			<Tips />
		</>
	);
}

export default SalesPersonPage;