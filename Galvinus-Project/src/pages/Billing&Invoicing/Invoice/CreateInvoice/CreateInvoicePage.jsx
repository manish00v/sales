
import React, { useContext, useEffect } from "react";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import CreateInvoiceForm from "./CreateInvoiceForm";
const CreateInvoicePage = () => {
	const { setBtn, setUrl, setGoBackUrl } = useContext(FormPageHeaderContext);

	useEffect(() => {
		setBtn("Create");
		setUrl("/invoice");
		setGoBackUrl("/invoice");
	}, []);

	return (
		<>
			<FormPageHeader />
			<CreateInvoiceForm />
		</>
	);
}

export default CreateInvoicePage;