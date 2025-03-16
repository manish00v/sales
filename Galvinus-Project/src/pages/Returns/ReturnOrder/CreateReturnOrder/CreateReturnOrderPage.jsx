
import React, { useContext, useEffect } from "react";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import CreateReturnOrderForm from "./CreateReturnOrderForm";

const CreateReturnOrderPage = () => {
	const { setBtn, setUrl, setGoBackUrl } = useContext(FormPageHeaderContext);

	useEffect(() => {
		setBtn("Create");
		setUrl("/returnorder");
		setGoBackUrl("/returnorder");
	}, []);

	return (
		<>
			<FormPageHeader />
			<CreateReturnOrderForm />
		</>
	);
}

export default CreateReturnOrderPage;