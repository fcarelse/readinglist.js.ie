app.controller('Main', ['$rootScope', 'Booklist', 'Book', function ($rootScope, Booklist, Book) {

	// Passing global objects into angular's base scope.
	$rootScope.data = data;
	$rootScope.sys = sys;

	var applyQueued;
	$rootScope.safeApply = sys.safeApply = function () {
		if (!$rootScope.$$phase) {
			$rootScope.$apply();
			applyQueued = false;
		}
		else {
			if (!applyQueued) setTimeout(sys.safeApply, 1000);
			applyQueued = true;
		}
	};

	Booklist.load();
	if (data.booklist.list.length == 0) data.booklist.add(new Book({
		status: 'unread',
		title: 'First Book',
		ISBN: '00001',
		author: 'Ann Noni-Mouse'
	}));

}]);