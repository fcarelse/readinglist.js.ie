import { ChangeEvent } from "react";
import { BookPropsType } from "./book.types";
import TextField from "@mui/material/TextField";
import {
	Box,
	Button,
	MenuItem,
	Select,
	SelectChangeEvent,
} from "@mui/material";
import { Delete, PlusOne } from "@mui/icons-material";
import { BOOK_STATUSES } from "../../App.helper";

export const Book = ({ ...book }: BookPropsType) => {
	const changed =
		(field: keyof BookPropsType) =>
		(changeEvent: ChangeEvent<HTMLInputElement>) => {
			// @ts-ignore
			book.change(book.index, field, changeEvent.target?.value || "");
		};

	const changedStatus =
		(field: keyof BookPropsType) =>
		(changeEvent: SelectChangeEvent<string>) => {
			// @ts-ignore
			book.change(book.index, field, changeEvent.target?.value || "");
		};

	const cellMargin = "8px";

	return (
		<Box
			component="form"
			noValidate
			autoComplete="off"
			sx={{
				"& .MuiTextField-root": { m: 1, width: "25ch" },
			}}
		>
			<Box>
				<Select
					sx={{ margin: cellMargin }}
					title="Status"
					label="Status"
					value={book.status}
					onChange={changedStatus("status")}
				>
					{BOOK_STATUSES.map((status) => (
						<MenuItem value={status.tag} key={status.tag}>
							{status.label}
						</MenuItem>
					))}
				</Select>
				<TextField
					sx={{ margin: cellMargin }}
					label="Title"
					variant="outlined"
					value={book.title}
					onChange={changed("title")}
				/>
				<TextField
					sx={{ margin: cellMargin }}
					label="ISBN"
					type="text"
					variant="outlined"
					value={book.ISBN}
					onChange={changed("ISBN")}
				/>
				<TextField
					sx={{ margin: cellMargin }}
					label="Author"
					type="text"
					variant="outlined"
					value={book.author}
					onChange={changed("author")}
				/>
				<Button onClick={() => book.append(book.index)}>
					<PlusOne />
				</Button>
				<Button onClick={() => book.remove(book.index)}>
					<Delete />
				</Button>
			</Box>
		</Box>
	);
};
