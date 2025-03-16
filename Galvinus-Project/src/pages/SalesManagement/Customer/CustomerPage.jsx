
import React, { useContext, useEffect } from "react";
import Tips from "../../../components/Tips/Tips";
import { TipsPageHeaderContext } from "../../../contexts/TipsPageHeaderContext";
import TipsPageHeader from "../../../components/Layout/TipsPageHeader/TipsPageHeader";

const CustomerPage = () => {
	const { setCreateBtn, setEditBtn, setDisplayBtn, setCreateUrl, setEditUrl, setDisplayUrl } = useContext(TipsPageHeaderContext);

	useEffect(() => {
		setCreateBtn("Create Customer");
		setEditBtn("Edit Customer");
		setDisplayBtn("Display Customer");
		setCreateUrl("/createcustomer");
		setEditUrl("/editcustomer");
		setDisplayUrl("/displaycustomer");
	}, []);
	
	return (
		<>
			<TipsPageHeader />
			<Tips />
		</>
	);
}

export default CustomerPage;