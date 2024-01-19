if (!window.sys) window.sys = {};
if (!window.data) window.data = {};

// Defining the docs app.
var app = angular.module('docs', ['ngResource', 'ngRoute', 'xeditable']);

/**
 * When the app is fully loaded
 */
angular.element(document).ready(function () {
	//Fixing facebook bug with redirect
	if (window.location.hash === '#_=_') window.location.hash = '#';

	// Booting up the Angular Web App docs to the scope of the entire document
	angular.bootstrap(document, ['docs']);
});

