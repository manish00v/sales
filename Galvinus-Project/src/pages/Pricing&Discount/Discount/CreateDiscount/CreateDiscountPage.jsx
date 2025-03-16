
import { useContext, useEffect } from "react";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import CreateDiscountForm from "./CreateDiscountForm";

const CreateDiscountPage = () => {
	const { setBtn, setUrl, setGoBackUrl } = useContext(FormPageHeaderContext);

	useEffect(() => {
		setBtn("Create");
		setUrl("/discount");
		setGoBackUrl("/discount");
	});

	return (
		<>
			<FormPageHeader />
			<CreateDiscountForm />
		</>
	);
}

export default CreateDiscountPage;