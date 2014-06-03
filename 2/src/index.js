require.config({
	paths: {
		jquery: 'libs/jquery',
		underscore: 'libs/underscore',
		backbone: 'libs/backbone'
	},
	shim: {
		underscore: {
			exports: '_'
		},
		backbone: {
			deps: ["underscore", "jquery"],
			exports: "Backbone"
		},
		waitSeconds: 15
	}
});

require([
	'jquery',
	'modules/app',
], function ($, APP) {
	Parse.initialize("qHgwVKFNx9lhJYFt3FyUT3lHxq9UKLjegLkgf08e", "OJ03Y7JZUqFdUAlFnaamBQzZsTyJRFoRCmixWCP7");

	APP.init({
		$questionsElement: $("#questions1")
	});
});
