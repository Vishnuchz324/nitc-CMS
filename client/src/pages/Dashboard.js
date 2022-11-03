import * as React from "react";
import { Box ,Button,IconButton,Checkbox, FormControlLabel} from "@mui/material";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import { blue} from '@mui/material/colors';
import ForwardIcon from '@mui/icons-material/Forward';
import DeleteIcon from '@mui/icons-material/Delete';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';

// import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Complaint } from "../components/complaint-register";
import { AssignWorker } from "../components/assign-worker";
import { Edit } from "../components/EditComplaint";
import { Validate } from "../components/validate";



const drawerWidth = 240;

const handleEditClick = () => {
	// some action
}
const handleForwardClick = () => {
	// some action
}
const handleDelClick = () => {
	// some action
}
const handleAssignClick = () => {
	// some action
}

const columns = [
	{ field: 'id', headerName: 'ID', width: 80 },
	{
	  field: 'title',
	  headerName: 'Title',
	  width: 200,
	  editable: true,
	},
	{
	  field: 'description',
	  headerName: 'Description',
	  width: 250,
	  editable: true,
	},
	{
	  field: 'numvotes',
	  headerName: 'Num-Votes',
	  type: 'number',
	  width: 140,
	  editable: true,
	  renderCell: (cellValues) => {
		return (
		<FormControlLabel
		control={<Checkbox icon={<FavoriteBorder />} 
					checkedIcon={<Favorite />}
			name="checkedH" />}
		label="votes"
		// Vishnu- Daa ivide ee votes inte stalath numvotes akan patuvo??
		/>
		);
	  }
	},
	{
		field: 'reg_at',
		headerName: 'Registered At',
		width: 140,
		editable: true,
	  },

	  {
		field: 'edit',
		headerName: 'Edit',
		type: 'button',
		width: 158,
		editable: true,
		renderCell: (cellValues) => {
			return (
				<div>
				<IconButton color="secondary"  aria-label="add an alarm" onClick={handleEditClick} >
				<EditIcon fontSize="small" style={{ color: blue[500] ,size:"small"}} />
				</IconButton>
				<IconButton color="secondary" size="small" aria-label="add an alarm" onClick={handleForwardClick} >
				<ForwardIcon fontSize="small" style={{ color: blue[500] }} />
				</IconButton>
				<IconButton color="secondary" aria-label="add an alarm" onClick={handleDelClick} >
				<DeleteIcon fontSize="small" style={{ color: blue[500] }} />
				</IconButton>
				<IconButton color="secondary" aria-label="add an alarm" onClick={handleAssignClick} >
				<AssignmentIndIcon fontSize="small" style={{ color: blue[500] }} />
				</IconButton>

		</div>

			);
		  }
	  },
	
	
  ];
  
  const rows = [
	// needs to add data in this form!!!!
	{ id: 1, title: 'Laptop Lost', description: 'I lost my laptop from E hostel', numvotes: 2, reg_at:"Online", },
	{ id: 2, title: 'Laptop Lost', description: 'I lost my laptop from E hostel', numvotes: 2, reg_at:"Online", },
	{ id: 3, title: 'Laptop Lost', description: 'I lost my laptop from E hostel', numvotes: 2, reg_at:"Online", },
	{ id: 4, title: 'Laptop Lost', description: 'I lost my laptop from E hostel', numvotes: 2, reg_at:"Online", },
	{ id: 5, title: 'Laptop Lost', description: 'I lost my laptop from E hostel', numvotes: 2, reg_at:"Online", },
	{ id: 6, title: 'Laptop Lost', description: 'I lost my laptop from E hostel', numvotes: 2, reg_at:"Online", },
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
			<div style={{ height: 500 , width: 1120, alignContent:'center',paddingLeft:100, }}>
       		<div style={{ display: 'flex', height: '100%' }}>
			<Box component='main' sx={{ flexGrow: 1, p: 3 ,width: 'auto'}}>
				
				<Toolbar />
				<div style={{ display: 'flex', height: '100%' }}>
  				<div style={{ flexGrow: 1 }}>
				<DataGrid
				rows={rows}
				columns={columns}
				pageSize={6}
				rowsPerPageOptions={[6]}
				

				componentsProps={{
					columnMenu: { background: 'red', counter: rows.length },
				  }}

				  sx={{
					boxShadow: 2,
					border: 2,
					borderColor: 'primary.lightblack',
					'& .MuiDataGrid-cell:hover': {
					  color: 'primary.main',
					},
					'& .MuiDataGrid-columnHeader': {
						border: "2px groove black"
					  },
					'& .MuiDataGrid-row': {
						backgroundColor: 'rgba(215, 215, 235, .7)',
						// border: "1px solid black"
					  },
					  "& .MuiDataGrid-columnHeaders": {
						backgroundColor: 'rgba(235, 235, 235, .7)',
						color: "rgba(0,0,0,0.99)",
						fontSize: 16,
						
						// border: "2px solid black"
					  },
					  '& .MuiDataGrid-cell': {
						// backgroundColor: 'rgba(215, 215, 235, .7)',
						border: "2px groove grey"
					  },

					
				  }}
				/>
				</div>
				</div>
			
			<Complaint/>
			<AssignWorker/>
			<Edit/>
            
			<br>
			</br>
			///
			<Validate/>
			
				
			</Box>

			
			</div>
			</div>
		
							

		</Box>


		
		
	);
};
