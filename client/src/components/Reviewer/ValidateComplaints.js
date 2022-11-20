import React, { useState, useEffect, useContext } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import { blue } from "@mui/material/colors";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ValidateForm from "./ValidateForm";

const COMPLAINT_STATUS = {
	NOT_VERIFIED: "NOT_VERIFIED",
	VERIFIED: "VERIFIED",
	COMPLETED: "COMPLETED",
	WORK_ASSIGNED: "WORK_ASSIGNED",
};
const ValidateComplaints = () => {
	const [complaints, setComplaints] = useState([]);
	const [complaintId, setComplaintId] = useState();

	const [refresh, setRefresh] = useState(false);
	const { token } = useContext(AuthContext);

	const [openForm, setOpenForm] = useState(false);
	const handleOpen = () => setOpenForm(true);
	const handleClose = () => {
		setOpenForm(false);
		setRefresh(!refresh);
	};

	const columns = [
		{ field: "id", headerName: "Sl.No", width: 80, sortable: true },
		{
			field: "title",
			headerName: "Title",
			width: 200,
			sortable: true,
		},
		{
			field: "description",
			headerName: "Description",
			width: 250,
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
			field: "validate",
			headerName: "Validate",
			type: "button",
			width: 100,
			editable: false,
			sortable: false,
			renderCell: (params) => {
				const handleValidate = (e) => {
					const currentRow = params.row;
					const complaintId = currentRow.id;
					setComplaintId(complaintId);
					handleOpen();
				};

				const currentRow = params.row;
				const status = currentRow.status;
				return (
					<div>
						{status !== COMPLAINT_STATUS.VERIFIED ? (
							<IconButton color='secondary' onClick={handleValidate}>
								<UploadFileIcon
									fontSize='small'
									style={{ color: blue[500], size: "small" }}
								/>
							</IconButton>
						) : (
							<IconButton color='secondary' disabled>
								<CheckCircleIcon
									fontSize='small'
									style={{ color: blue[500], size: "small" }}
								/>
							</IconButton>
						)}
					</div>
				);
			},
		},
	];

	useEffect(() => {
		axios
			.get("/complaint/all", {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((resp) => {
				setComplaints(resp.data);
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
			<ValidateForm
				open={openForm}
				handleClose={handleClose}
				complaintId={complaintId}
			/>
			<div
				style={{
					width: "1050px",
				}}
			>
				<DataGrid
					rows={complaints}
					columns={columns}
					pageSize={12}
					rowsPerPageOptions={[12]}
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

export default ValidateComplaints;
