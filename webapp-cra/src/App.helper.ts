import { BookType } from "./components/book/book.types";
import { BookListType } from "./pages/booklist/booklist.types";

export type RecordArray = Array<Record<string, any>>;

export const byField = function (arr: RecordArray, field: string, value: any) {
	return arr.filter((item) => item[field] === value)[0];
};

export const listValues = function (arr: RecordArray, key: string) {
	var list = [];
	if (arr === undefined) {
		console.error("Array Undefined");
		return [];
	}
	for (var i = 0; i < arr.length; i++) list.push(arr[i][key]);
	return list;
};

export const clearField = function (
	arr: Array<Record<string, any>>,
	field: string
) {
	if (!field) return arr;
	if (!(arr instanceof Array)) return [];
	for (var i = 0; i < arr.length; i++)
		if (arr[i][field] !== undefined) delete arr[i][field];
	return arr;
};

export const jsonToArray = function (jsonArray: string) {
	var s = [];
	try {
		s = JSON.parse(jsonArray);
	} catch (e) {
		s = [];
	}
	return s;
};

export const arrayToJson = function (array: Array<any>) {
	var s = "[]";
	if (!(array instanceof Array)) return s;
	try {
		s = JSON.stringify(array);
	} catch (e) {
		s = "[]";
	}
	return s;
};

export const BOOK_STATUSES = [
	{ tag: "unread", label: "Unread" },
	{ tag: "reading", label: "In Progress" },
	{ tag: "read", label: "Finished" },
];

export const STATUS_TAGS = listValues(BOOK_STATUSES, "tag");

export const load = () => {
	return jsonToArray(localStorage.getItem("booklist") || "");
};

export const save = (list: BookListType) => {
	localStorage.setItem("booklist", arrayToJson(list));
};

export const copyList = (list: BookListType) => [
	...list.map((book: BookType) => ({ ...book })),
];
