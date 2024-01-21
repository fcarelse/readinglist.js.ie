import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { NavbarProps } from "./navbar.types";
import IconButton from "@mui/material/IconButton";
import { SaveAlt, UploadFile } from "@mui/icons-material";

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
						Reading Book List
					</Typography>
					<Box>
						<IconButton
							color="inherit"
							size="large"
							aria-label="Import from file"
							title="Import from file"
							onClick={() => importList()}
						>
							<UploadFile />
						</IconButton>
						<IconButton
							color="inherit"
							size="large"
							aria-label="Export to file"
							title="Export to file"
							onClick={() => exportList()}
						>
							<SaveAlt />
						</IconButton>
					</Box>
				</Toolbar>
			</AppBar>
		</Box>
	);
};
