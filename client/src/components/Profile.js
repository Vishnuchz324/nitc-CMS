import React, { useState, useEffect, useContext } from "react";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { Paper } from "@mui/material";

const Profile = () => {
	const [user, setUser] = useState({});

	const { token } = useContext(AuthContext);

	useEffect(() => {
		axios
			.get("/user/", {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((resp) => {
				setUser(resp.data);
				console.log(resp.data);
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<Paper
			sx={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				px: 3,
				py: 5,
			}}
			elevation={3}
		>
			<h2>Profile</h2>

			<Avatar
				alt={user.email}
				src='./'
				sx={{
					bgcolor: "#677eff",
					height: "60px",
					width: "60px",
					marginTop: "10px",
				}}
			/>

			<TextField
				label='Name'
				value={user.name}
				InputProps={{
					readOnly: true,
				}}
				style={{ width: 400, marginTop: "25px" }}
			/>

			<TextField
				label='Email'
				value={user.email}
				InputProps={{
					readOnly: true,
				}}
				variant='outlined'
				style={{ width: 400, marginTop: "25px" }}
			/>

			{user.role !== "ADMIN" && (
				<div>
					<TextField
						label='Roll Number'
						value={user.rollNo}
						InputProps={{
							readOnly: true,
						}}
						style={{ width: 400, marginTop: "25px" }}
					/>
					<br />
					<TextField
						label='Department'
						value={user.department}
						InputProps={{
							readOnly: true,
						}}
						style={{ width: 400, marginTop: "25px" }}
					/>
				</div>
			)}

			{user.role === "ADMIN" && (
				<div>
					<TextField
						label='Designation'
						value={user.designation}
						InputProps={{
							readOnly: true,
						}}
						style={{ width: 400, marginTop: "25px" }}
					/>
					<br />
				</div>
			)}
		</Paper>
	);
};

export default Profile;
