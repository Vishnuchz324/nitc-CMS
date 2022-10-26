import Box from "@mui/material/Box";
import * as React from "react";
import { Dashboard } from "./Dashboard";
import { Members } from "./Members";
import { Navbar } from "../components/Navbar";
import { Routes, Route, Link } from "react-router-dom";

export const Home = () => {
	return (
		<Box sx={{ display: "flex" }}>
			<Navbar />
			<Routes>
				<Route path='/' element={<Dashboard />} />
				<Route path='/members' element={<Members />} />
			</Routes>
		</Box>
	);
};
