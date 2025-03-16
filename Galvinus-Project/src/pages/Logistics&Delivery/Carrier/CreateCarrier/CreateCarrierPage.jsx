
import { useContext, useEffect } from "react";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import CreateCarrierForm from "./CreateCarrierForm";

const CreateCarrierPage = () => {
	const { setBtn, setUrl, setGoBackUrl } = useContext(FormPageHeaderContext);

	useEffect(() => {
		setBtn("Create");
		setUrl("/carrier");
		setGoBackUrl("/carrier");
	}, []);

	return (
		<>
			<FormPageHeader />
			<CreateCarrierForm />
		</>
	);
}

export default CreateCarrierPage;