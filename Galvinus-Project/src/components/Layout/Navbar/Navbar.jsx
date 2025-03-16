

import "./Navbar.css";
import galvinusLogo from "../../../assets/galvinus_logo.jpeg"
import { Link } from "react-router-dom";

const Navbar = () => {
	return (
		<nav>
			{/* Logo Section */}
			<div className="logo-container">
				<img src={galvinusLogo} alt="galvinus-logo" />
				<span className="logo-text">Galvinus</span>
			</div>

			<div className="navbar-right">
				{/* Search Bar */}
				<div className="search-box">
					<input type="text" className="input-search" placeholder="Type to Search..." />
					<button className="btn-search"><i className="fas fa-search"></i></button>
				</div>

				{/* Navigation Icons */}
				<div className="nav-icons">
					{/* <Link to="/collaborationsettings" title="Teams"><i className="fas fa-users icon-team"></i></Link> */}
					<Link to="/notification" title="Notifications"><i className="fa-solid fa-bell"></i></Link>
					<Link to="/setting" title="Settings"><i className="fas fa-gear icon-setting"></i></Link>
					<Link to="/profile" title="Your Profile"><i className="fas fa-user-circle icon-profile"></i></Link>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;