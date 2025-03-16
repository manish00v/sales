
import { useContext, useEffect } from "react";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import CreateSalesOrderForm from "./CreateSalesOrderForm";

const CreateSalesOrderPage = () => {
	const { setBtn, setUrl, setGoBackUrl } = useContext(FormPageHeaderContext);

	useEffect(() => {
		setBtn("Create");
		setUrl("/salesorder");
		setGoBackUrl("/salesorder");
	});

	return (
		<>
			<FormPageHeader />
			<CreateSalesOrderForm/>
		</>
	);
}

export default CreateSalesOrderPage;