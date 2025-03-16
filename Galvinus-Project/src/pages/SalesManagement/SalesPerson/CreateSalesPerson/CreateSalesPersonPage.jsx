
import React, { useContext, useEffect } from "react";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import CreateSalesPersonForm from "./CreateSalesPersonForm";

const CreateSalesPersonPage = () => {
	const { setBtn, setUrl, setGoBackUrl } = useContext(FormPageHeaderContext);

	useEffect(() => {
		setBtn("Create");
		setUrl("/salesperson");
		setGoBackUrl("/salesperson");
	}, []);

	return (
		<>
			<FormPageHeader />
			<CreateSalesPersonForm />
		</>
	);
}

export default CreateSalesPersonPage;