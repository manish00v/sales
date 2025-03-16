
import React, { useContext, useEffect } from "react";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import CreateLineItemsForm from "./CreateLineItemsForm";

const CreateLineItemsPage = () => {
	const { setBtn, setUrl, setGoBackUrl } = useContext(FormPageHeaderContext);

	useEffect(() => {
		setBtn("Create");
		setUrl("/lineitems");
		setGoBackUrl("/lineitems");
	}, []);

	return (
		<>
			<FormPageHeader />
			<CreateLineItemsForm />
		</>
	);
}

export default CreateLineItemsPage;