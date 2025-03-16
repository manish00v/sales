
import React, { useContext, useEffect } from "react";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import CreateReturnLineItemsForm from "./CreateReturnLineItemsForm";

const CreateReturnLineItemsPage = () => {
	const { setBtn, setUrl, setGoBackUrl } = useContext(FormPageHeaderContext);

	useEffect(() => {
		setBtn("Create");
		setUrl("/returnlineitems");
		setGoBackUrl("/returnlineitems");
	}, []);

	return (
		<>
			<FormPageHeader />
			<CreateReturnLineItemsForm />
		</>
	);
}

export default CreateReturnLineItemsPage;