import * as React from "react";
import { Box } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";

import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";

const drawerWidth = 240;

const DashDrawer = ({ children, menuItems, baseUrl }) => {
	return (
		<Box
			sx={{
				display: "flex",
				width: "100%",
				height: "100vh",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
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
						{menuItems.map(({ name, path, icon }) => (
							<ListItem
								key={name}
								disablePadding
								component={Link}
								to={path}
								button
							>
								<ListItemButton>
									<ListItemIcon>{icon}</ListItemIcon>
									<ListItemText primary={name} />
								</ListItemButton>
							</ListItem>
						))}
					</List>
				</Box>
			</Drawer>
			<Box>{children}</Box>
		</Box>
	);
};

export default DashDrawer;
