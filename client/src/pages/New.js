import React from "react";
import { Toolbar } from "@mui/material";
import DashDrawer from "../components/DashDrawer";
import DataTable from "../components/DataTable";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import { useContext } from "react";
import { Route, Router, Routes } from "react-router-dom";

const Dashboard = () => {
	const { token, LogOut } = useContext(AuthContext);
	return (
		<Router basename='/home'>
			<DashDrawer>
				<Routes>
					<Route path='/data' element={<DataTable />} />
				</Routes>
			</DashDrawer>
		</Router>
	);
};

export default Dashboard;
