import React, { useState, useContext } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Card, CardContent, Grid, TextField } from "@mui/material";
import AlertComponent from "../AlertComponent";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	borderRadius: "10px",
	margin: "0 auto",
	p: 4,
};
const btnstyle = { margin: "8px 0" };

const AssignWorkModal = ({ open, handleClose, validateId }) => {
	const [success, setSuccess] = useState();
	const [error, setError] = useState();
	const [workData, setWorkData] = useState({});
	const { token } = useContext(AuthContext);

	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.post(`admin/assign/${validateId}`, workData, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((resp) => {
				setSuccess(`succesfully assigned work`);
			})
			.catch((err) => {
				const response = err.response;
				if (response.data) setError(response.data);
				else setError("something went wrong");
			});
	};

	const handleChange = (e) => {
		setWorkData({
			...workData,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<div>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'
			>
				<Card sx={style}>
					<CardContent>
						<Grid align='center'>
							<h3>Assign Work</h3>
						</Grid>
						<br />
						{error && <AlertComponent message={error} />}
						{success && <AlertComponent message={success} severity='success' />}
						<form onSubmit={handleSubmit} onChange={handleChange}>
							<Grid container spacing={1}>
								<Grid xs={12} s={6} item>
									<TextField
										fullWidth
										label='Worker Name'
										name='workerName'
										placeholder='Enter the worker name'
										variant='outlined'
									></TextField>
								</Grid>
								<Grid xs={12} s={6} item>
									<TextField
										fullWidth
										label='Worker Contact'
										name='workerContact'
										placeholder='Enter the worker contact'
										variant='outlined'
									></TextField>
								</Grid>
								<Grid xs={12} s={6} item>
									<TextField
										fullWidth
										label='Remarks'
										multiline
										rows='5'
										name='remarks'
										placeholder='Enter the remarks '
										variant='outlined'
									></TextField>
								</Grid>
								<Button
									type='submit'
									color='primary'
									variant='contained'
									style={btnstyle}
									fullWidth
								>
									Assign Work
								</Button>
							</Grid>
						</form>
					</CardContent>
				</Card>
			</Modal>
		</div>
	);
};

export default AssignWorkModal;
