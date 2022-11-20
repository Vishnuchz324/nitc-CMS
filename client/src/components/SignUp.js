import React, { useState } from "react";
import {
	Grid,
	Paper,
	MenuItem,
	InputLabel,
	Avatar,
	Typography,
	TextField,
	Button,
	FormControl,
	Select,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import axios from "axios";
import AlertComponent from "./AlertComponent";

const SignUp = (props) => {
	const headerStyle = { margin: 0 };
	const avatarStyle = { backgroundColor: "#1bbd7e" };
	const [department, setDepartment] = useState("");
	const [formData, setFormData] = useState({});
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(null);

	const handleChange = (e) => {
		const field = e.target.name;
		const value = e.target.value;
		console.log(field, value);
		setFormData({
			...formData,
			[field]: value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setError(null);
		setSuccess(null);
		axios
			.post("/auth/signup", formData)
			.then((resp) => {
				setSuccess("succesfully registered");
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
			<Paper sx={{ p: 3 }}>
				<Grid align='center'>
					<Avatar style={avatarStyle}>
						<AddCircleOutlineIcon />
					</Avatar>
					<h2 style={headerStyle}>Sign Up</h2>
					<Typography variant='caption' gutterBottom>
						Please fill this form to create an account !
					</Typography>
				</Grid>
				<form onChange={handleChange} onSubmit={handleSubmit}>
					{error && <AlertComponent message={error} />}
					{success && <AlertComponent message={success} severity={"success"} />}
					<TextField
						sx={{ my: 1 }}
						fullWidth
						label='Name'
						name='name'
						placeholder='Enter your name'
						required
					/>
					<TextField
						sx={{ my: 1 }}
						fullWidth
						type='email'
						label='Email'
						name='email'
						placeholder='Enter your email'
						required
					/>

					<Grid container spacing={2} direction='row'>
						<Grid container item xs={6} direction='row'>
							<TextField
								fullWidth
								label='RollNo'
								name='rollNo'
								placeholder='Enter your roll number'
								required
							/>
						</Grid>
						<Grid container item xs={6} direction='row'>
							<FormControl fullWidth>
								<InputLabel id='demo-simple-select-label'>
									Department
								</InputLabel>
								<Select
									labelId='demo-simple-select-label'
									id='demo-simple-select'
									value={department}
									label='Department'
									required
									onChange={(e) => {
										e.target.name = "department";
										setDepartment(e.target.value);
										handleChange(e);
									}}
								>
									<MenuItem value={"CSE"}>CSE</MenuItem>
									<MenuItem value={"ECE"}>ECE</MenuItem>
									<MenuItem value={"EEE"}>EEE</MenuItem>
								</Select>
							</FormControl>
						</Grid>
					</Grid>

					<TextField
						sx={{ my: 1 }}
						fullWidth
						type='tel'
						label='Phone Number'
						name='contact'
						placeholder='Enter your phone number'
						required
					/>
					<TextField
						sx={{ my: 1 }}
						fullWidth
						type='password'
						label='Password'
						name='password'
						placeholder='Enter your password'
						required
					/>

					<Button
						sx={{ my: 2 }}
						fullWidth
						type='submit'
						variant='contained'
						color='primary'
					>
						Sign up
					</Button>
				</form>
			</Paper>
		</Grid>
	);
};

export default SignUp;
