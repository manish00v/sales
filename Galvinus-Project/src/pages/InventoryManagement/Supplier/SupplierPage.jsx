
import React, { useContext, useEffect } from "react";
import Tips from "../../../components/Tips/Tips";
import { TipsPageHeaderContext } from "../../../contexts/TipsPageHeaderContext";
import TipsPageHeader from "../../../components/Layout/TipsPageHeader/TipsPageHeader";

const SupplierPage = () => {
	const { setCreateBtn, setEditBtn, setDisplayBtn, setCreateUrl, setEditUrl, setDisplayUrl } = useContext(TipsPageHeaderContext);

	useEffect(() => {
		setCreateBtn("Create Supplier");
		setEditBtn("Edit Supplier");
		setDisplayBtn("Display Supplier");
		setCreateUrl("/createsupplier");
		setEditUrl("/editsupplier");
		setDisplayUrl("/displaysupplier");
	}, []);

	return (
		<>
			<TipsPageHeader />
			<Tips />
		</>
	);
}

export default SupplierPage;