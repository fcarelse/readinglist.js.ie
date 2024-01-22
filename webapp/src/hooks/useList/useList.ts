import { useCallback, useEffect, useState } from "react";
import { BookListType } from "../../pages/booklist/booklist.types";
import { genBlankBook } from "../../pages/booklist/booklist.helper";
import { STATUS_TAGS, copyList, load, save } from "../../App.helper";
import { BookType } from "../../components/book/book.types";

export const useList = () => {
	const [list, setListDirect] = useState<BookListType>([]);
	const setList = useCallback(
		(oldList: BookListType) => setListDirect(copyList(oldList)),
		[]
	);

	useEffect(() => {
		(async () => {
			const loaded: BookListType = await load();
			if (loaded.length === 0) loaded.push(genBlankBook());
			loaded.forEach((book: BookType) => {
				if (!STATUS_TAGS.includes(book.status)) book.status = STATUS_TAGS[0];
			});
			setList(loaded);
			save(loaded);
		})();
	}, []);

	const change = (index: number, field: keyof BookType, value: string) => {
		console.log(index, field, value);
		const newList = copyList(list);
		newList[index][field] = value;
		setList(newList);
		save(newList);
	};

	const append = (index: number) => {
		const newList = copyList(list);
		newList.splice(index + 1, 0, genBlankBook());
		setList(newList);
		save(newList);
	};

	const remove = (index: number) => {
		const newList = copyList(list);
		newList.splice(index, 1);
		setList(newList);
		save(newList);
	};

	return { change, append, remove, list, setList };
};
