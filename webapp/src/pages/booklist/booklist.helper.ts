import { createId } from "@paralleldrive/cuid2";
import { BookType } from "../../components/book/book.types";
import { STATUS_TAGS } from "../../App.helper";

export const genBlankBook: () => BookType = () => ({
	id: createId(),
	status: STATUS_TAGS[0],
	title: "",
	ISBN: "",
	author: "",
});
