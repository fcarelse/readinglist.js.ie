export const isString = (str) => str instanceof String || typeof (str) == 'string';

export const setDefault = (obj, field, value) => {
	if (!(obj instanceof Object)) {
		return { [field]: value };
	}
	obj[field] = isString(obj[field]) ? obj[field] : value;
}

// Technically does nothing, but triggers lit-html plugin for vscode to provide syntax highlighting for html code.
export const html = (strArr, ...args) => strArr.reduce((str, next, i) => str + args[i - 1] + next);