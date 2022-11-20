import React, { useState, useEffect, useContext } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import {
	Card,
	CardContent,
	Grid,
	MenuItem,
	TextField,
	Select,
	InputLabel,
	FormControl,
} from "@mui/material";
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

const ValidateForm = ({ open, handleClose, complaintId }) => {
	const [remark, setRemark] = useState("");
	const [success, setSuccess] = useState();
	const [error, setError] = useState();
	const [adminId, setAdminId] = useState();
	const [admins, setAdmins] = useState([]);
	const { token } = useContext(AuthContext);

	useEffect(() => {
		axios
			.get("/admin", {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((resp) => {
				setAdmins(resp.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.post(
				`/reviewer/validate/${complaintId}`,
				{
					assignedTo: adminId,
					remarks: remark,
				},
				{ headers: { Authorization: `Bearer ${token}` } }
			)
			.then((resp) => {
				setSuccess(`succesfully validated the complaint`);
			})
			.catch((err) => {
				const response = err.response;
				if (response.data) setError(response.data);
				else setError("something went wrong");
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
							<h3>Validate Complaint</h3>
						</Grid>
						<br />
						{error && <AlertComponent message={error} />}
						{success && <AlertComponent message={success} severity='success' />}
						<form onSubmit={handleSubmit}>
							<Grid container spacing={1}>
								<Grid xs={12} s={6} item direction='row'>
									<FormControl fullWidth>
										<InputLabel id='demo-simple-select-label'>
											Department
										</InputLabel>
										<Select
											labelId='demo-simple-select-label'
											id='demo-simple-select'
											value={adminId}
											label='Admin'
											required
											onChange={(e) => {
												e.target.name = "admin";
												setAdminId(e.target.value);
											}}
										>
											{admins.map((admin) => (
												<MenuItem value={admin.id}>
													{admin.designation}
												</MenuItem>
											))}
										</Select>
									</FormControl>
								</Grid>
								<Grid xs={12} s={6} item>
									<TextField
										fullWidth
										label='Remarks'
										multiline
										rows='5'
										name='remarks'
										onChange={(e) => {
											setRemark(e.target.value);
										}}
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
									Validate
								</Button>
							</Grid>
						</form>
					</CardContent>
				</Card>
			</Modal>
		</div>
	);
};

export default ValidateForm;
