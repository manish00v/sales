
import React, { useContext, useEffect } from "react";
import Tips from "../../../components/Tips/Tips";
import { TipsPageHeaderContext } from "../../../contexts/TipsPageHeaderContext";
import TipsPageHeader from "../../../components/Layout/TipsPageHeader/TipsPageHeader";

const CurrencyExchangeRatePage = () => {
	const { setCreateBtn, setEditBtn, setDisplayBtn, setCreateUrl, setEditUrl, setDisplayUrl } = useContext(TipsPageHeaderContext);

	useEffect(() => {
		setCreateBtn("Create Currency Exchange Rate");
		setEditBtn("Edit Currency Exchange Rate");
		setDisplayBtn("Display Currency Exchange Rate");
		setCreateUrl("/createcurrencyexchangerate");
		setEditUrl("/editcurrencyexchangerate");
		setDisplayUrl("/displaycurrencyexchangerate");
	}, []);

	return (
		<>
			<TipsPageHeader />
			<Tips />
		</>
	);
}

export default CurrencyExchangeRatePage;