import React from "react";
import DashDrawer from "../components/DashDrawer";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import AddCardIcon from "@mui/icons-material/AddCard";
import FolderIcon from "@mui/icons-material/Folder";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import PeopleIcon from "@mui/icons-material/People";
import AllInboxIcon from "@mui/icons-material/AllInbox";
import RuleFolderIcon from "@mui/icons-material/RuleFolder";

const ROLES = {
	USER: "USER",
	ADMIN: "ADMIN",
	REVIEWER: "REVIEWER",
};

const Dashboard = () => {
	const { role } = useContext(AuthContext);
	const userMenuItems = [
		{
			name: "Profile",
			path: "profile",
			icon: <PersonIcon />,
		},
		{
			name: "Register Complaint",
			path: "register",
			icon: <AddCardIcon />,
		},
		{
			name: "All Complaiints",
			path: "complaints",
			icon: <FolderIcon />,
		},
		{
			name: "Registered",
			path: "registered",
			icon: <FolderSharedIcon />,
		},
	];
	const adminMenuItems = [
		{
			name: "Profile",
			path: "profile",
			icon: <PersonIcon />,
		},
		{
			name: "Users",
			path: "users",
			icon: <PeopleIcon />,
		},
		{
			name: "Forwarded Complaints",
			path: "assigned",
			icon: <AllInboxIcon />,
		},
	];
	const reviewerMenuItems = [
		{
			name: "Profile",
			path: "profile",
			icon: <PersonIcon />,
		},
		{
			name: "Validate",
			path: "validate",
			icon: <RuleFolderIcon />,
		},
	];
	let menuItems;

	if (role === ROLES.ADMIN) menuItems = adminMenuItems;
	else if (role === ROLES.REVIEWER) menuItems = reviewerMenuItems;
	else menuItems = userMenuItems;

	return (
		<>
			<CssBaseline />
			<DashDrawer menuItems={menuItems}>
				<Outlet />
			</DashDrawer>
		</>
	);
};

export default Dashboard;
