import cuid from "cuid";
import { BookType } from "../../components/book/book.types";

export const genBlankBook: () => BookType = () => ({
	id: cuid(),
	status: "",
	title: "",
	ISBN: "",
	author: "",
});
