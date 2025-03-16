
import React, { useContext, useEffect } from "react";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import CreateDiscountRulesForm from "./CreateDiscountRulesForm";

const CreateDiscountRulesPage = () => {
	const { setBtn, setUrl, setGoBackUrl } = useContext(FormPageHeaderContext);

	useEffect(() => {
		setBtn("Create");
		setUrl("/discountrules");
		setGoBackUrl("/discountrules");
	}, []);

	return (
		<>
			<FormPageHeader />
			<CreateDiscountRulesForm />
		</>
	);
}

export default CreateDiscountRulesPage;