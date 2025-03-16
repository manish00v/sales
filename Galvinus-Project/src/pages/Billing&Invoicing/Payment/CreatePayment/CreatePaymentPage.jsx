
import React, { useContext, useEffect } from "react";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import CreatePaymentForm from "./CreatePaymentForm";
const CreatePaymentPage = () => {
	const { setBtn, setUrl, setGoBackUrl } = useContext(FormPageHeaderContext);

	useEffect(() => {
		setBtn("Create");
		setUrl("/payment");
		setGoBackUrl("/payment");
	}, []);

	return (
		<>
			<FormPageHeader />
			<CreatePaymentForm />
		</>
	);
}

export default CreatePaymentPage;