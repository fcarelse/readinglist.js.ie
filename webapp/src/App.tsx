import { useEffect, useState } from "react";
import { BookListType } from "./pages/booklist/booklist.types";
import { BookList } from "./pages/booklist/booklist";
import { Navbar } from "./components/navbar/navbar";
import { STATUS_TAGS, copyList, jsonToArray, load, save } from "./App.helper";
import { ListExporter } from "./App.types";
import "./App.css";
import moment from "moment";
import { genBlankBook } from "./pages/booklist/booklist.helper";
import { BookType } from "./components/book/book.types";

function App() {
	const [list, setList] = useState<BookListType>([]);

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

	const importList = () => {
		document?.getElementById("importBooklist")?.click();
	};

	const loadFile = () => {
		const uploaderElement = document.getElementById("importBooklist");
		const reader = new FileReader();
		// @ts-ignore
		reader.readAsText(uploaderElement.files[0]);
		reader.onload = (loadEvent) => {
			// @ts-ignore
			const newList = jsonToArray(loadEvent?.target?.result);
			if (newList) {
				setList(newList);
				save(newList);
			}
		};
	};

	const exportList: ListExporter = (list: BookListType) => {
		list.forEach((book) => {
			if (!STATUS_TAGS.includes(book.status)) book.status = STATUS_TAGS[0];
		});
		const encodedData = btoa(JSON.stringify(list, null, 2));
		const uri = "data:application/json;base64," + encodedData;

		const downloadLink = document.createElement("a");
		downloadLink.href = uri;
		const timestamp = moment().format("YYYYMMDDhhmmss");
		downloadLink.download = `booklist-${timestamp}.json`;

		document.body.appendChild(downloadLink);
		downloadLink.click();
		document.body.removeChild(downloadLink);
	};

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

	return (
		<div className="App">
			<Navbar
				importList={() => importList()}
				exportList={() => exportList(list)}
			/>
			<BookList list={list} change={change} append={append} remove={remove} />
			<div className="hidden">
				<input
					id="importBooklist"
					type="file"
					accept="application/json"
					onChange={loadFile}
				/>
			</div>
		</div>
	);
}

export default App;
