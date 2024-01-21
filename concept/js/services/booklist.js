app.factory('Booklist', ['Book', 'Utils', function (Book, Utils) {

	var Booklist = sys.Booklist = class Booklist {
		constructor() {
			const list = arguments[0];
			this.list = list instanceof Array ? list : [];
		}

		add(book, index) {
			if (index != null) {
				this.list.splice(index + 1, 0, new Book(book))
			} else {
				this.list.push(new Book(book));
			}
			Booklist.save()
		}

		remove(index) {
			this.list.splice(index, 1);
			Booklist.save()
		}

		change(id, field, value) {
			const book = this.list.filter(book => book.id == id)[0] || {};
			book[field] = value;
			Booklist.save()
		}

		static import() {
			$('#importBooklist').click();
		}

		loadFile() {
			const uploaderElement = document.getElementById("importBooklist");
			const reader = new FileReader();
			reader.readAsText(uploaderElement.files[0]);
			reader.onload = function (loadEvent) {
				const newList = Utils.jsonToArray(loadEvent.target.result);
				if (newList) {
					data.booklist.list = Utils.jsonToArray(loadEvent.target.result);
				}
				Booklist.save();
				Utils.safeApply();
				console.log(loadEvent.target.result);
			};
		}

		static export() {
			const list = Utils.cloneRecords(data.booklist.list);
			Utils.clearField(list, '$$hashKey');
			list.forEach((book, index) => {
				book.id = index + 1;
				if (!Booklist.statusTags.includes(book.status)) book.status = Booklist.statusTags[0];
			});
			const uri = 'data:application/json;base64,' + btoa(JSON.stringify(list, null, 2));

			var downloadLink = document.createElement("a");
			downloadLink.href = uri;
			downloadLink.download = `booklist-${moment().format('YYYYMMDDhhmmss')}.json`;

			document.body.appendChild(downloadLink);
			downloadLink.click();
			document.body.removeChild(downloadLink);

		}

		static save() {
			const list = Utils.cloneRecords(data.booklist.list);
			Utils.clearField(list, '$$hashKey');
			list.forEach(book => {
				if (!Booklist.statusTags.includes(book.status)) book.status = Booklist.statusTags[0];
			});
			localStorage.setItem('booklist', JSON.stringify(list));
		}

		static load() {
			const list = JSON.parse(localStorage.getItem('booklist'));
			Utils.clearField(list, '$$hashKey');
			data.booklist = new Booklist(list);
		}

		static clear() {
			data.booklist = new Booklist([]);
			Booklist.save()
		}

		static statuses = [
			{ tag: 'unread', label: 'Unread' },
			{ tag: 'reading', label: 'In Progress' },
			{ tag: 'read', label: 'Finished' },
		]

	};

	Booklist.statusTags = Utils.listValues(Booklist.statuses, 'tag');

	return Booklist;
}]);


