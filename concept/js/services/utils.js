app.factory('Utils', [function () {
	const Utils = sys.Utils = {};

	Utils.isString = (str) => str instanceof String || typeof (str) == 'string';

	Utils.setDefault = (obj, field, value) => {
		if (!(obj instanceof Object)) {
			return { [field]: value };
		}
		obj[field] = Utils.isString(obj[field]) ? obj[field] : value;
	}

	// Technically does nothing, but triggers lit-html plugin for vscode to provide syntax highlighting for html code.
	Utils.html = (strArr, ...args) => strArr.reduce((str, next, i) => str + args[i - 1] + next);

	return Utils;
}]);
