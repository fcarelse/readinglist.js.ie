import { BookType } from "../../components/book/book.types";
import { Book } from "../../components/book/book";
import { BookListProps } from "./booklist.types";

export const BookList = (props: BookListProps) => {
	const { change, append, remove, list } = props;

	return (
		<div>
			{list.map((book: BookType, index: number) => (
				<Book
					{...book}
					append={append}
					remove={remove}
					change={change}
					index={index}
					key={"book" + index}
				/>
			))}
		</div>
	);
};
