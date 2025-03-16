
import React, { useContext, useEffect } from "react";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import CreateSupplierForm from "./CreateSupplierForm";

const CreateSupplierPage = () => {
	const { setBtn, setUrl, setGoBackUrl } = useContext(FormPageHeaderContext);

	useEffect(() => {
		setBtn("Create");
		setUrl("/supplier");
		setGoBackUrl("/supplier");
	}, []);

	return (
		<>
			<FormPageHeader />
			<CreateSupplierForm />
		</>
	);
}

export default CreateSupplierPage;