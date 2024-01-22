import { BookList } from "./pages/booklist/booklist";
import { Navbar } from "./components/navbar/navbar";
import { STATUS_TAGS, jsonToArray, save } from "./App.helper";
import "./App.css";
import moment from "moment";
import { Footer } from "./components/footer/footer";
import { useList } from "./hooks/useList/useList";

function App() {
	const { append, remove, change, list, setList } = useList();

	const importList = () => {
		document.getElementById("importBooklist")?.click();
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

	const exportList = () => {
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

	return (
		<div className="App">
			<Navbar importList={importList} exportList={exportList} />
			<BookList list={list} change={change} append={append} remove={remove} />
			<div className="hidden">
				<input
					id="importBooklist"
					type="file"
					accept="application/json"
					onChange={loadFile}
				/>
			</div>
			<Footer />
		</div>
	);
}

export default App;
