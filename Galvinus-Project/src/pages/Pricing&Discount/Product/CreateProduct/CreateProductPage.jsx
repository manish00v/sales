
import { useContext, useEffect } from "react";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import CreateProductForm from "./CreateProductForm";

const CreateProductPage = () => {
	const { setBtn, setUrl, setGoBackUrl } = useContext(FormPageHeaderContext);

	useEffect(() => {
		setBtn("Create");
		setUrl("/product");
		setGoBackUrl("/product");
	});

	return (
		<>
			<FormPageHeader />
			<CreateProductForm />
		</>
	);
}

export default CreateProductPage;