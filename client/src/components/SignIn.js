import React, { useContext, useState } from "react";
import {
	Grid,
	Paper,
	Avatar,
	TextField,
	Button,
	Typography,
	Link,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import AlertComponent from "./AlertComponent";
import { useNavigate } from "react-router-dom";

const SignIn = ({ handleToggle }) => {
	const avatarStyle = { backgroundColor: "#1bbd7e" };
	const btnstyle = { margin: "8px 0" };

	const { setData } = useContext(AuthContext);
	const [formData, setFormData] = useState({});
	const [error, setError] = useState(null);

	const navigate = useNavigate();

	const handleChange = (e) => {
		const field = e.target.name;
		const value = e.target.value;

		setFormData({
			...formData,
			[field]: value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setError(null);
		axios
			.post("/auth/signin", formData)
			.then((resp) => {
				const { accessToken, email, role } = resp.data;
				setData(accessToken, email, role);

				navigate("/");
			})
			.catch((err) => {
				const errResponse = err.response;
				if (errResponse) {
					const data = errResponse.data;
					setError(data.message);
				} else {
					setError("something went wrong");
				}
			});
	};

	return (
		<Grid>
			<Paper
				sx={{
					p: 3,
				}}
			>
				<form onChange={handleChange} onSubmit={handleSubmit}>
					{error && <AlertComponent message={error} />}
					<Grid align='center'>
						<Avatar style={avatarStyle}>
							<LockIcon />
						</Avatar>
						<h2>Sign In</h2>
					</Grid>
					<TextField
						sx={{ my: 1 }}
						label='Email'
						name='email'
						type='email'
						placeholder='Enter email'
						fullWidth
						required
					/>
					<TextField
						sx={{ my: 1 }}
						name='password'
						type='password'
						label='Password'
						placeholder='Enter password'
						fullWidth
						required
					/>
					<Button
						type='submit'
						color='primary'
						variant='contained'
						style={btnstyle}
						fullWidth
					>
						Sign in
					</Button>

					<Typography sx={{ my: 2 }}>
						{" "}
						Do you have an account ?
						<Link href='#' onClick={() => handleToggle("event", 1)}>
							Sign Up
						</Link>
					</Typography>
				</form>
			</Paper>
		</Grid>
	);
};

export default SignIn;
