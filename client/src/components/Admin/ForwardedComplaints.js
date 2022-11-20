import React, { useState, useEffect, useContext } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton, Button } from "@mui/material";
import { blue } from "@mui/material/colors";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import PersonIcon from "@mui/icons-material/Person";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import AssignWorkModal from "./AssignWorkModal";

const COMPLAINT_STATUS = {
	NOT_VERIFIED: "NOT_VERIFIED",
	VERIFIED: "VERIFIED",
	COMPLETED: "COMPLETED",
	WORK_ASSIGNED: "WORK_ASSIGNED",
};

const ForwardedComplaints = () => {
	const [complaints, setComplaints] = useState([]);
	const [validateId, setValidateId] = useState(true);
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
			field: "status",
			headerName: "Status",
			width: 200,
			sortable: true,
		},
		{
			field: "remarks",
			headerName: "Remarks",
			width: 140,
			sortable: true,
		},
		{
			field: "forwardedAt",
			headerName: "Date",
			type: "date",
			width: 200,
			sortable: true,
		},
		{
			field: "assignWork",
			headerName: "Actions",
			type: "button",
			width: 100,
			editable: false,
			sortable: false,
			renderCell: (params) => {
				const handleClose = (e) => {
					setRefresh(!refresh);
				};
				const handleAssignWork = (e) => {
					const currentRow = params.row;
					setValidateId(currentRow.id);
					handleOpen();
				};

				const currentRow = params.row;
				const status = currentRow.status;
				return (
					<div>
						{status !== COMPLAINT_STATUS.COMPLETED ? (
							<div>
								{status !== COMPLAINT_STATUS.WORK_ASSIGNED ? (
									<>
										<IconButton color='secondary' onClick={handleAssignWork}>
											<PersonAddAltIcon
												fontSize='small'
												style={{ color: blue[500], size: "small" }}
											/>
										</IconButton>
										<IconButton color='secondary' onClick={handleClose}>
											<CheckCircleOutlineIcon
												fontSize='small'
												style={{ color: blue[500], size: "small" }}
											/>
										</IconButton>
									</>
								) : (
									<>
										<IconButton color='secondary' disabled>
											<PersonIcon
												fontSize='small'
												style={{ color: blue[500], size: "small" }}
											/>
										</IconButton>
										<IconButton color='secondary' onClick={handleClose}>
											<CheckCircleOutlineIcon
												fontSize='small'
												style={{ color: blue[500], size: "small" }}
											/>
										</IconButton>
									</>
								)}
							</div>
						) : (
							<div>
								<Button color='secondary' disabled>
									CLOSED
								</Button>
							</div>
						)}
					</div>
				);
			},
		},
	];

	useEffect(() => {
		axios
			.get("/admin/assigned", {
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
			<AssignWorkModal
				open={openForm}
				handleClose={handleClose}
				validateId={validateId}
			/>
			<div
				style={{
					width: "1100px",
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

export default ForwardedComplaints;
