import * as React from "react";
import { Box } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import { DataGrid } from '@mui/x-data-grid';

// import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";




const drawerWidth = 240;

const columns = [
	{ field: 'id', headerName: 'ID', width: 90 },
	{
	  field: 'firstName',
	  headerName: 'First name',
	  width: 150,
	  editable: true,
	},
	{
	  field: 'lastName',
	  headerName: 'Last name',
	  width: 150,
	  editable: true,
	},
	{
	  field: 'age',
	  headerName: 'Age',
	  type: 'number',
	  width: 90,
	  editable: true,
	},
	{
	  field: 'fullName',
	  headerName: 'Full name',
	  description: 'This column has a value getter and is not sortable.',
	  sortable: false,
	  width: 160,
	  valueGetter: (params) =>
		`${params.getValue(params.id, 'firstName') || ''} ${
		  params.getValue(params.id, 'lastName') || ''
		}`,
	},
  ];
  
  const rows = [
	{ id: 1, lastName: 'Faisal', firstName: 'Shada', age: 21 },
	{ id: 2, lastName: 'Faisal', firstName: 'Shada', age: 21 },
	{ id: 3, lastName: 'Faisal', firstName: 'Shada', age: 21 },
	{ id: 4, lastName: 'Faisal', firstName: 'Shada', age: 21 },
	{ id: 5, lastName: 'Faisal', firstName: 'Shada', age: 21 },
	{ id: 6, lastName: 'Faisal', firstName: 'Shada', age: 21 },
	{ id: 7, lastName: 'Faisal', firstName: 'Shada', age: 21 },
	{ id: 8, lastName: 'Faisal', firstName: 'Shada', age: 21 },
	{ id: 9, lastName: 'Faisal', firstName: 'Shada', age: 21 },
	{ id: 10, lastName: 'Faisal', firstName: 'Shada', age: 21 },
  ];
  


export const Dashboard = () => {
	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			<Drawer
				variant='permanent'
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					[`& .MuiDrawer-paper`]: {
						width: drawerWidth,
						boxSizing: "border-box",
					},
				}}
			>
				<Toolbar />
				<Box sx={{ overflow: "auto" }}>
					<List>
						{["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
							<ListItem key={text} disablePadding>
								<ListItemButton>
									<ListItemIcon>
										{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
									</ListItemIcon>
									<ListItemText primary={text} />
								</ListItemButton>
							</ListItem>
						))}
					</List>
					<Divider />
					<List>
						{["All mail", "Trash", "Spam"].map((text, index) => (
							<ListItem key={text} disablePadding>
								<ListItemButton>
									<ListItemIcon>
										{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
									</ListItemIcon>
									<ListItemText primary={text} />
								</ListItemButton>
							</ListItem>
						))}
					</List>
				</Box>

			</Drawer>
			<div style={{ height: 500 , width: 750 }}>
       		<div style={{ display: 'flex', height: '100%' }}>
			<Box component='main' sx={{ flexGrow: 1, p: 3 ,width: 'auto'}}>
				
				<Toolbar />
				
				<DataGrid
				rows={rows}
				columns={columns}
				pageSize={5}
				rowsPerPageOptions={[5]}
				checkboxSelection
				/>
				
			
				
			</Box>
			</div>
			</div>
		
							

		</Box>


		
		
	);
};
