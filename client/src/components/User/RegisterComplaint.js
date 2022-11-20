import React, { useState, useContext } from "react";
import { Grid, TextField, Button, Card, CardContent } from "@mui/material";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import AlertComponent from "../AlertComponent";

const RegisterComplaint = () => {
	const [complaint, setComplaint] = useState({});
	const [success, setSuccess] = useState();
	const [error, setError] = useState();
	const { token } = useContext(AuthContext);

	const handleChange = (e) => {
		setComplaint({
			...complaint,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setSuccess(null);
		setError(null);
		axios
			.post("/complaint/register", complaint, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((resp) => {
				let data = resp.data;
				setSuccess(`registered complaint ${data.title}`);
			})
			.catch((err) => {
				let data = err.response.data;
				if (data) setError(data.message);
				else setError("something went wrong");
			});
		console.log(complaint);
	};
	const btnstyle = { margin: "8px 0" };
	return (
		<Card style={{ margin: "0 auto", border: "solid 1px" }}>
			<CardContent>
				<Grid align='center'>
					<h2>Register Complaint</h2>
				</Grid>
				{error && <AlertComponent message={error} />}
				{success && <AlertComponent message={success} severity='success' />}
				<form onSubmit={handleSubmit} onChange={handleChange}>
					<Grid container spacing={1}>
						<Grid xs={12} s={6} item>
							<TextField
								fullWidth
								label='Title'
								name='title'
								placeholder='Enter title of the complaint'
								variant='outlined'
								required
							></TextField>
						</Grid>
						<Grid xs={12} s={6} item>
							<TextField
								fullWidth
								label='Description'
								multiline
								rows='5'
								name='description'
								placeholder='Enter description of the complaint'
								variant='outlined'
								required
							></TextField>
						</Grid>
						<Button
							type='submit'
							color='primary'
							variant='contained'
							style={btnstyle}
							fullWidth
						>
							Register
						</Button>
					</Grid>
				</form>
			</CardContent>
		</Card>
	);
};

export default RegisterComplaint;
