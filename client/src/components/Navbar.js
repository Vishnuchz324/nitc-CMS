import React, { useContext, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
	Avatar,
	Box,
	Button,
	IconButton,
	Menu,
	MenuItem,
	Tooltip,
} from "@mui/material";

const Navbar = () => {
	const { LogOut } = useContext(AuthContext);
	const navigate = useNavigate();
	const [anchorElUser, setAnchorElUser] = useState(null);

	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const pages = [
		{
			name: "Home",
			link: "/",
			default: true,
		},
		{
			name: "Members",
			link: "/members",
		},
		{
			name: "Contact",
			link: "/contact",
		},
	];

	return (
		<AppBar
			className='nav'
			position='fixed'
			sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
		>
			<Toolbar>
				<Typography
					variant='h6'
					noWrap
					sx={{
						mr: 2,
						display: { xs: "none", md: "flex" },
						fontFamily: "monospace",
						fontWeight: 700,
						letterSpacing: ".3rem",
						color: "inherit",
						textDecoration: "none",
						cursor: "pointer",
						flexGrow: 1,
					}}
				>
					CMS
				</Typography>
				<Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
					{pages.map((page) => (
						<Button
							key={page}
							onClick={(e) => {
								navigate(page.link);
							}}
							sx={{ color: "white", display: "block" }}
						>
							{page.name}
						</Button>
					))}
				</Box>
				<Box sx={{ flexGrow: 0 }}>
					<Tooltip title='Open settings'>
						<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
							<Avatar sx={{ width: 36, height: 36 }} />
						</IconButton>
					</Tooltip>
					<Menu
						// sx={{ mt: "45px" }}
						id='menu-appbar'
						anchorEl={anchorElUser}
						anchorOrigin={{
							vertical: "top",
							horizontal: "right",
						}}
						keepMounted
						transformOrigin={{
							vertical: "top",
							horizontal: "right",
						}}
						open={Boolean(anchorElUser)}
						onClose={handleCloseUserMenu}
					>
						<MenuItem key={"profile"} onClick={handleCloseUserMenu}>
							<Typography textAlign='center'>profile</Typography>
						</MenuItem>
						<MenuItem
							key={"logout"}
							onClick={(e) => {
								LogOut();
							}}
						>
							<Typography textAlign='center'>logout</Typography>
						</MenuItem>
					</Menu>
				</Box>
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
