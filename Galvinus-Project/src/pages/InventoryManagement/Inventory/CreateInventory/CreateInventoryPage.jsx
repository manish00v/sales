
import React, { useContext, useEffect } from "react";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import CreateInventoryForm from "./CreateInventoryForm"

const CreateInventoryPage = () => {
	const { setBtn, setUrl, setGoBackUrl } = useContext(FormPageHeaderContext);

	useEffect(() => {
		setBtn("Create");
		setUrl("/inventory");
		setGoBackUrl("/inventory");
	}, []);

	return (
		<>
			<FormPageHeader />
			<CreateInventoryForm />
		</>
	);
}

export default CreateInventoryPage;