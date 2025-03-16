
import React, { useContext, useEffect } from "react";
import Tips from "../../../components/Tips/Tips";
import { TipsPageHeaderContext } from "../../../contexts/TipsPageHeaderContext";
import TipsPageHeader from "../../../components/Layout/TipsPageHeader/TipsPageHeader";

const ProductPage = () => {
	const { setCreateBtn, setEditBtn, setDisplayBtn, setCreateUrl, setEditUrl, setDisplayUrl } = useContext(TipsPageHeaderContext);

	useEffect(() => {
		setCreateBtn("Create Product");
		setEditBtn("Edit Product");
		setDisplayBtn("Display Product");
		setCreateUrl("/createproduct");
		setEditUrl("/editproduct");
		setDisplayUrl("/displayproduct");
	}, []);

	return (
		<>
			<TipsPageHeader />
			<Tips />
		</>
	);
}

export default ProductPage;