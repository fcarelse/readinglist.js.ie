import { GitHub, Lightbulb } from "@mui/icons-material";
import { Button, Paper } from "@mui/material";

export const Footer = () => {
	return (
		<Paper
			sx={{
				position: "fixed",
				bottom: 0,
				left: 0,
				right: 0,
				textAlign: "center",
				margin: "10px",
				padding: "10px",
				border: "solid grey 1px",
				borderRadius: "none",
			}}
		>
			<Button href="https://readinglist.js.ie/concept">
				<Lightbulb /> Concept
			</Button>
			<Button href="https://github.com/fcarelse/readinglist.js.ie">
				<GitHub /> Repo
			</Button>
		</Paper>
	);
};
