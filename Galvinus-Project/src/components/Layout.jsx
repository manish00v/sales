
// import React from "react";
import Navbar from "./Layout/Navbar/Navbar";
import Sidebar from "./Layout/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import "./Layout.css";

const Layout = () => {
	return (
		<>
			<Navbar />
			<Sidebar />
			<div className="main-content">
				<Outlet />
			</div>
		</>
	);
}

export default Layout;