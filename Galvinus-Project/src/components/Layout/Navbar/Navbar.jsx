import "./Navbar.css";
import galvinusLogo from "../../../assets/galvinus_logo.jpeg";
import { Link } from "react-router-dom";

import { useState } from "react";
import "./Navbar.css";
import Settings from "../../../header/Setting/Setting"; // Update the import path to match your project structure

const Navbar = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);

  const toggleSettings = () => {
    setSettingsOpen((prevState) => !prevState);
  };

  const closeSettings = () => {
    setSettingsOpen(false);
  };

  return (
    <>
      <nav>
        {/* Logo Section */}
        <div className="logo-container">
          <img src={galvinusLogo} alt="galvinus-logo" />
          <span className="logo-text">Galvinus</span>
        </div>

        <div className="navbar-right">
          {/* Search Bar */}
          <div className="search-box">
            <input
              type="text"
              className="input-search"
              placeholder="Type to Search..."
            />
            <button className="btn-search">
              <i className="fas fa-search"></i>
            </button>
          </div>

          {/* Navigation Icons */}
          <div className="nav-icons">
            {/* <Link to="/collaborationsettings" title="Teams"><i className="fas fa-users icon-team"></i></Link> */}
            <Link to="/notification" title="Notifications">
              <i className="fa-solid fa-bell"></i>
            </Link>
            {/* Settings icon now triggers the popup instead of navigating */}
			
            <button
              className="icon-button"
              title="Settings"
              onClick={toggleSettings}
            >
              <i className="fas fa-gear icon-setting"></i>
            </button>
            <Link to="/profile" title="Your Profile">
              <i className="fas fa-user-circle icon-profile"></i>
            </Link>
          </div>
        </div>
      </nav>

      {/* Settings Popup Component */}
      <Settings isOpen={settingsOpen} onClose={closeSettings} />
    </>
  );
};

export default Navbar;
