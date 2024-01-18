app.factory('Booklist', ['Book', function (Book) {

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
		}

		remove(id) {
			this.list = this.list.filter(book => book.id != id);
		}

		change(id, field, value) {
			const book = this.list.filter(book => book.id == id)[0] || {};
			book[field] = value;
		}

		import() {
			// TBD
		}

		export() {
			// TBD
		}

		statuses = [
			{ tag: 'unread', label: 'Unread' },
			{ tag: 'reading', label: 'In Progress' },
			{ tag: 'read', label: 'Finished' },
		]

	};

	sys.Booklist = Booklist;

	return Booklist;
}]);


