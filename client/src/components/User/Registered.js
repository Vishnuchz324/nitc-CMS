import React, { useState, useEffect, useContext } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import { blue } from "@mui/material/colors";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import AlertComponent from "../AlertComponent";

const RegisteredComplaints = () => {
	const [complaints, setComplaints] = useState([]);
	const [refresh, setRefresh] = useState(false);

	const [error, setError] = useState();
	const [success, setSuccess] = useState();
	const { token } = useContext(AuthContext);

	const columns = [
		{
			field: "id",
			headerName: "Sl.No",
			width: 80,
			sortable: true,
			editable: false,
		},
		{
			field: "title",
			headerName: "Title",
			width: 200,
			editable: true,
			sortable: true,
		},
		{
			field: "description",
			headerName: "Description",
			width: 250,

			editable: true,
			sortable: true,
		},
		{
			field: "numVotes",
			headerName: "Num-Votes",
			type: "number",
			width: 120,
			sortable: true,
		},
		{
			field: "status",
			headerName: "Status",
			width: 140,
			sortable: true,
		},
		{
			field: "createdAt",
			headerName: "Registered On",
			width: 150,
			sortable: true,
			editable: false,
		},
		{
			field: "edit",
			headerName: "Edit",
			type: "button",
			width: 100,
			editable: false,
			sortable: false,
			renderCell: (params) => {
				const handleEdit = (e) => {
					const complaintData = params.row;
					const complaintId = complaintData.id;
					setError(null);
					setSuccess(null);
					axios
						.put(`/complaint/update/${complaintId}`, complaintData, {
							headers: { Authorization: `Bearer ${token}` },
						})
						.then((resp) => {
							setSuccess(`succesfully edited the complaint ${complaintId}`);
							// setRefresh(!refresh);
						})
						.catch((err) => {
							let resp = err.response;
							if (resp.data) setError(resp.data.message[0]);
							else setError("something went wrong");
						});
				};

				return (
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<IconButton
							color='secondary'
							aria-label='add an alarm'
							onClick={handleEdit}
						>
							<EditIcon
								fontSize='small'
								style={{ color: blue[500], size: "small" }}
							/>
						</IconButton>
					</div>
				);
			},
		},
	];

	useEffect(() => {
		axios
			.get("/complaint/", {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((resp) => {
				setComplaints(resp.data);
				setRefresh(!refresh);
			})
			.catch((err) => console.log(err));
	}, [refresh]);

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				px: 3,
				py: 5,
			}}
		>
			<div
				style={{
					width: "1050px",
				}}
			>
				{error && <AlertComponent message={error} />}
				{success && <AlertComponent message={success} severity='success' />}
				<DataGrid
					rows={complaints}
					columns={columns}
					pageSize={6}
					rowsPerPageOptions={[6]}
					autoHeight
					initialState={{
						sorting: {
							sortModel: [
								{
									field: "id",
									sort: "asc",
								},
							],
						},
					}}
					componentsProps={{
						columnMenu: { background: "red", counter: complaints.length },
					}}
					sx={{
						// boxShadow: 2,
						// border: 2,
						borderColor: "primary.lightblack",
						"& .MuiDataGrid-cell:hover": {
							color: "primary.main",
						},

						"& .MuiDataGrid-row": {
							backgroundColor: "rgba(215, 215, 235, .5)",
							// border: "1px solid black"
						},
						"& .MuiDataGrid-columnHeaders": {
							backgroundColor: "rgba(235, 235, 235, .7)",
							color: "rgba(0,0,0,0.99)",
							fontSize: 14,

							// border: "2px solid black"
						},
						"& .MuiDataGrid-cell": {
							// backgroundColor: 'rgba(215, 215, 235, .7)',
							border: "0.5px groove rgb((128,128,128,0.6)",
						},
					}}
				/>
			</div>
		</div>
	);
};

export default RegisteredComplaints;
