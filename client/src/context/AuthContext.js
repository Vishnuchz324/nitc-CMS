import React, { useState, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = (props) => {
	const [token, setToken] = useState();
	const [email, setEmail] = useState();
	const [role, setRole] = useState();
	const [isLoggedIn, setIsLoggedIN] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		let accessToken = localStorage.getItem("accessToken");
		if (accessToken) {
			setToken(localStorage.getItem("accessToken"));
			setEmail(localStorage.getItem("email"));
			setRole(localStorage.getItem("role"));
			setIsLoggedIN(true);
		} else {
			navigate("/login");
		}
	}, []);

	const setData = (token, email, role) => {
		localStorage.setItem("accessToken", token);
		localStorage.setItem("email", email);
		localStorage.setItem("role", role);
		setToken(token);
		setEmail(email);
		setRole(role);
		setIsLoggedIN(true);
	};

	const LogOut = () => {
		localStorage.removeItem("accessToken");
		localStorage.removeItem("email");
		localStorage.removeItem("role");
		setIsLoggedIN(false);
		navigate("/login");
	};

	const authContextValues = {
		token,
		email,
		role,
		isLoggedIn,
		setData,
		LogOut,
	};
	return (
		<AuthContext.Provider value={authContextValues}>
			{props.children}
		</AuthContext.Provider>
	);
};

export { AuthContext, AuthProvider };
