
import { useContext, useEffect } from "react";
import Tips from "../../../components/Tips/Tips";
import { TipsPageHeaderContext } from "../../../contexts/TipsPageHeaderContext";
import TipsPageHeader from "../../../components/Layout/TipsPageHeader/TipsPageHeader";

const DiscountPage = () => {
	const { setCreateBtn, setEditBtn, setDisplayBtn, setCreateUrl, setEditUrl, setDisplayUrl } = useContext(TipsPageHeaderContext);

	useEffect(() => {
		setCreateBtn("Create Discount");
		setEditBtn("Edit Discount");
		setDisplayBtn("Display Discount");
		setCreateUrl("/creatediscount");
		setEditUrl("/editdiscount");
		setDisplayUrl("/displaydiscount");
	});

	return (
		<>
			<TipsPageHeader />
			<Tips />
		</>
	);
}

export default DiscountPage;