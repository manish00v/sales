
import React, { useContext, useEffect } from "react";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import CreateShipmentForm from "./CreateShipmentForm";

const CreateShipmentPage = () => {
	const { setBtn, setUrl, setGoBackUrl } = useContext(FormPageHeaderContext);

	useEffect(() => {
		setBtn("Create");
		setUrl("/shipment");
		setGoBackUrl("/shipment");
	}, []);

	return (
		<>
			<FormPageHeader />
			<CreateShipmentForm />
		</>
	);
}

export default CreateShipmentPage;