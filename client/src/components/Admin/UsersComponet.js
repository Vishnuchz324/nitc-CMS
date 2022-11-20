import React, { useState, useEffect, useContext } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const UsersComponent = () => {
	const [users, setUsers] = useState([]);
	const [refresh, setRefresh] = useState(false);
	const { token } = useContext(AuthContext);

	const columns = [
		{
			field: "name",
			headerName: "Name",
			width: 200,
			sortable: true,
		},
		{
			field: "email",
			headerName: "Email",
			width: 250,
			sortable: true,
		},
		{
			field: "rollNo",
			headerName: "Roll Number",
			width: 200,
			sortable: true,
		},
		{
			field: "department",
			headerName: "Department",
			width: 200,
			sortable: true,
		},
		{
			field: "role",
			headerName: "Role",
			width: 200,
			sortable: true,
		},
		{
			field: "promote",
			headerName: "Promote",
			type: "button",
			width: 100,
			editable: false,
			sortable: false,
			renderCell: (params) => {
				const handlePromote = (e) => {
					const currentRow = params.row;
					const userId = currentRow.id;
					axios
						.post(
							`/admin/register/reviewer/${userId}`,
							{},
							{
								headers: { Authorization: `Bearer ${token}` },
							}
						)
						.then((resp) => {
							console.log(resp);
							setRefresh(!refresh);
						})
						.catch((err) => console.log(err));
				};

				const currentRow = params.row;
				const role = currentRow.role;
				return (
					<div>
						{role === "USER" ? (
							<Button onClick={handlePromote} color='primary'>
								Promote
							</Button>
						) : (
							<Button color='primary' disabled>
								Reviewer
							</Button>
						)}
					</div>
				);
			},
		},
	];

	useEffect(() => {
		axios
			.get("/admin/users", {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((resp) => {
				setUsers(resp.data);
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
					width: "1200px",
				}}
			>
				<DataGrid
					rows={users}
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
						columnMenu: { background: "red", counter: users.length },
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

export default UsersComponent;
