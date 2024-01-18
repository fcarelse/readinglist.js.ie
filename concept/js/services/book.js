app.factory('Book', ['Utils', function (Utils) {

	let nextID = 1;

	class Book {
		constructor(template) {
			if (!(template instanceof Object)) template = {
				// if argument supplied is a string then use as the title of the new book.
				title: template instanceof String ? template : '',
			}
			Utils.setDefault(template, 'status', 'unread');
			Utils.setDefault(template, 'title', '');
			Utils.setDefault(template, 'ISBN', '');
			Utils.setDefault(template, 'author', '');

			Object.assign(this, {
				id: nextID++,
				status: template.status,
				title: template.title,
				ISBN: template.ISBN,
				author: template.author,
			});
		}
	}

	sys.Book = Book;

	return Book;
}]);
