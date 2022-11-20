import Box from "@mui/material/Box";
import React, { useContext } from "react";

import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Dashboard from "./Dashboard";
import Members from "./Members";
import Contact from "./Contact";
import Login from "./Login";
import ErrorPage from "./Error";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import Navbar from "../components/Navbar";
import Profile from "../components/Profile";
import Complaints from "../components/User/Complaints";
import RegisteredComplaints from "../components/User/Registered";
import RegisterComplaint from "../components/User/RegisterComplaint";
import UsersComponent from "../components/Admin/UsersComponet";
import ValidateComplaints from "../components/Reviewer/ValidateComplaints";
import ForwardedComplaints from "../components/Admin/ForwardedComplaints";

const Home = () => {
	const { role } = useContext(AuthContext);
	const token = localStorage.getItem("accessToken");
	const location = useLocation();

	axios.defaults.baseURL = "http://localhost:8080/";

	let IsNavHidden = true;
	const navAvailable = ["dashboard", "members", "contact"];
	navAvailable.map((path) => {
		if (location.pathname.includes(path)) IsNavHidden = false;
	});

	const ROLES = {
		USER: "USER",
		ADMIN: "ADMIN",
		REVIEWER: "REVIEWER",
	};

	if (!token)
		return (
			<Box sx={{ display: "flex" }}>
				<Routes>
					<Route path='login' element={<Login />} />
					<Route path='*' element={<Navigate to='/login' />} />
				</Routes>
			</Box>
		);
	else {
		return (
			<Box sx={{ display: "flex" }}>
				{!IsNavHidden && <Navbar />}
				<Routes>
					{role === ROLES.USER && (
						<Route path='dashboard' element={<Dashboard />}>
							<Route path='' element={<Profile />} />
							<Route path='profile' element={<Profile />} />
							<Route path='register' element={<RegisterComplaint />} />
							<Route path='complaints' element={<Complaints />} />
							<Route path='registered' element={<RegisteredComplaints />} />
							<Route path='*' element={<Navigate to='../error' />} />
						</Route>
					)}
					{role === ROLES.REVIEWER && (
						<Route path='dashboard' element={<Dashboard />}>
							<Route path='' element={<Profile />} />
							<Route path='profile' element={<Profile />} />
							<Route path='validate' element={<ValidateComplaints />} />
							<Route path='*' element={<Navigate to='../error' />} />
						</Route>
					)}
					{role === ROLES.ADMIN && (
						<Route path='dashboard' element={<Dashboard />}>
							<Route path='' element={<Profile />} />
							<Route path='profile' element={<Profile />} />
							<Route path='users' element={<UsersComponent />} />
							<Route path='assigned' element={<ForwardedComplaints />} />
							<Route path='*' element={<Navigate to='../error' />} />
						</Route>
					)}
					<Route path='login' element={<Login />} />
					<Route path='members' element={<Members />} />
					<Route path='contact' element={<Contact />} />
					<Route path='' element={<Navigate to='/dashboard' />} />
					<Route path='*' element={<ErrorPage />} />
				</Routes>
			</Box>
		);
	}
};

export default Home;
