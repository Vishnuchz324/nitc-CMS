import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import { Link } from "react-router-dom";
// import { makeStyles } from "@mui/styles";

// const useStyles = makeStyles((theme) => ({
// 	navlinks: {
// 		marginLeft: theme.spacing(10),
// 		display: "flex",
// 	},
// 	logo: {
// 		flexGrow: "1",
// 		cursor: "pointer",
// 	},
// 	link: {
// 		textDecoration: "none",
// 		color: "white",
// 		fontSize: "20px",
// 		marginLeft: theme.spacing(20),
// 		"&:hover": {
// 			color: "yellow",
// 			borderBottom: "1px solid white",
// 		},
// 	},
// }));

export const Navbar = () => {
	// const classes = useStyles
	return (
		<AppBar
			position='fixed'
			sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
		>
			<Toolbar>
				<Typography variant='h6'>News</Typography>

				<Link to='/'> Home</Link>
				<Link to='/members'> Members</Link>
			</Toolbar>
		</AppBar>
	);
};
