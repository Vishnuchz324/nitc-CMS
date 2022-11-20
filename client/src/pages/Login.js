import React, { useState } from "react";
import { Tab, Paper, Tabs, Box, Typography } from "@mui/material";

import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";

const Login = () => {
	const [value, setValue] = useState(0);

	const handleToggle = (event, newValue) => {
		setValue(newValue);
	};

	const paperStyle = {
		width: "400px",
		margin: "80px auto",
	};
	function TabPanel(props) {
		const { children, value, index, ...other } = props;
		return (
			<Box
				role='tabpanel'
				hidden={value !== index}
				id={`simple-tabpanel-${index}`}
				aria-labelledby={`simple-tab-${index}`}
				{...other}
			>
				{value === index && (
					<Box>
						<Typography>{children}</Typography>
					</Box>
				)}
			</Box>
		);
	}

	return (
		<Paper elevation={20} style={paperStyle} sx={{ boxShadow: 3 }}>
			<Tabs
				value={value}
				indicatorColor='primary'
				textColor='primary'
				onChange={handleToggle}
				aria-label='disabled tabs example'
			>
				<Tab label='Sign In' />

				<Tab label='Sign Up' />
			</Tabs>
			<TabPanel value={value} index={0}>
				<SignIn handleChange={handleToggle} />
			</TabPanel>
			<TabPanel value={value} index={1}>
				<SignUp />
			</TabPanel>
		</Paper>
	);
};

export default Login;
