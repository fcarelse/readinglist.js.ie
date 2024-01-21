import { BookType } from "../../components/book/book.types";
export type BookListType = Array<BookType>;

export type BookListProps = {
	change: (index: number, field: keyof BookType, value: string) => void;
	append: (index: number) => void;
	remove: (index: number) => void;
	list: BookListType;
};
