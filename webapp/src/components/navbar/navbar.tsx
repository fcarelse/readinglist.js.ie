import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { NavbarProps } from "./navbar.types";

export const Navbar = (props: NavbarProps) => {
	const { importList, exportList } = props;

	return (
		<Box sx={{ display: "flex", alignItems: "center" }}>
			<CssBaseline />
			<AppBar component="nav">
				<Toolbar>
					<Typography
						variant="h6"
						sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
					>
						Reading List
					</Typography>
					<Button onClick={() => importList()}>Import</Button>
					<Button onClick={() => exportList()}>Export</Button>
				</Toolbar>
			</AppBar>
		</Box>
	);
};
