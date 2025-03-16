
import { useContext } from "react";
import "./FormPageHeader.css";
import { Link } from "react-router-dom";
import { FormPageHeaderContext } from "../../../contexts/FormPageHeaderContext";

const FormPageHeader = () => {
	const { btn, url, goBackUrl } = useContext(FormPageHeaderContext);

	return (
		<div className="content-area-navbar">
			{/* {btn.includes("Create") && (
				<Link to={url} className="icon-button">
					<i className="fas fa-plus" />
					{btn}
				</Link>
			)} */}

			{btn.includes("Edit") && (
				<Link to={url} className="icon-button">
					<i className="fas fa-edit" />
					{btn}
				</Link>
			)}

			{btn.includes("Display") && (
				<Link to={url} className="icon-button">
					<i className="fa-solid fa-tv"></i>
					{btn}
				</Link>
			)}
			
			{btn.includes("Save") && (
                <Link to={url} className="icon-button">
                    <i className="fa-solid fa-floppy-disk"></i>
                    {btn}
                </Link>
            )}

			{(!btn.includes("Display") || btn.includes("NoBtn")) && (
				<Link to={goBackUrl} className="icon-button">
					<i className="fa-solid fa-arrow-left"></i>
					Go Back
				</Link>
			)}
		</div>
	);
}

export default FormPageHeader;