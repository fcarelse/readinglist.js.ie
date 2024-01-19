import React, { ChangeEvent } from "react";
import { BookPropsType } from "./book.types";

export const Book = ({ ...book }: BookPropsType) => {
	const changed =
		(field: keyof BookPropsType) =>
		(changeEvent: ChangeEvent<HTMLInputElement>) => {
			// @ts-ignore
			book.change(book.index, field, changeEvent.target?.value || "");
		};

	return (
		<div>
			<input type="text" value={book.title} onChange={changed("title")} />
			<input type="text" value={book.ISBN} onChange={changed("ISBN")} />
			<input type="text" value={book.author} onChange={changed("author")} />
			<button onClick={() => book.append(book.index)}>Append</button>
			<button onClick={() => book.remove(book.index)}>Remove</button>
		</div>
	);
};
