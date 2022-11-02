import Box from "@mui/material/Box";
import * as React from "react";
import { Dashboard } from "./Dashboard";
import { Members } from "./Members";
import { Contact } from "./Contact";
import { SignInOutContainer } from "../components/signinout";
import { Navbar } from "../components/Navbar";
import { Routes, Route } from "react-router-dom";

export const Home = () => {
	return (
		<Box sx={{ display: "flex" }}>
			<Navbar />
			<Routes>
				<Route path='/' element={<Dashboard />} />
				<Route path='/members' element={<Members />} />
				<Route path='/contact' element={<Contact />} />
				<Route path='/signup' element={<SignInOutContainer />} />

			</Routes>
		</Box>
	);
};
