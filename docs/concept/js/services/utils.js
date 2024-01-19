app.factory('Utils', ['$rootScope', function ($rootScope) {
	const Utils = sys.Utils = {};

	Utils.isString = (str) => str instanceof String || typeof (str) == 'string';

	Utils.setDefault = (obj, field, value) => {
		if (!(obj instanceof Object)) {
			return { [field]: value };
		}
		obj[field] = Utils.isString(obj[field]) ? obj[field] : value;
	};

	Utils.listValues = function (arr, key) {
		var list = [];
		if (arr === undefined && !(ea.global.user && ea.global.user.id == 2550)) {
			console.error('Array Undefined');
			return [];
		}
		for (var i = 0; i < arr.length; i++)
			list.push(arr[i][key]);
		return list;
	};

	Utils.cloneRecords = function (arr) {
		if (!(arr instanceof Array)) return [];
		var clone = [];
		for (var i = 0; i < arr.length; i++)
			clone.push($.extend({}, arr[i]));
		return clone;
	};

	Utils.clearField = function (arr, field) {
		if (!field) return arr;
		if (!(arr instanceof Array)) return [];
		for (var i = 0; i < arr.length; i++)
			if (arr[i][field] !== undefined) delete arr[i][field];
		return arr;
	};

	Utils.jsonToArray = function (jsonArray) {
		var s = [];
		try {
			s = JSON.parse(jsonArray);
		} catch (e) {
			s = [];
		}
		return s;
	};

	Utils.arrayToJson = function (array, clearHashKey) {
		var s = '[]';
		if (!(array instanceof Array)) return s;
		if (clearHashKey)
			Util.clearField(array, '$$hashKey');
		try {
			s = JSON.stringify(array);
		} catch (e) {
			s = '[]';
		}
		return s;
	};

	var applyQueued;
	$rootScope.safeApply = Utils.safeApply = function () {
		if (!$rootScope.$$phase) {
			$rootScope.$apply();
			applyQueued = false;
		}
		else {
			if (!applyQueued) setTimeout(Utils.safeApply, 1000);
			applyQueued = true;
		}
	};

	// Technically does nothing, but triggers lit-html plugin for vscode to provide syntax highlighting for html code.
	Utils.html = (strArr, ...args) => strArr.reduce((str, next, i) => str + args[i - 1] + next);

	return Utils;
}]);
