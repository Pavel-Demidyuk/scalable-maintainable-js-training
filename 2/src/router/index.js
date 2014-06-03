define(['backbone'], function (Backbone) {

	var defaultsPaths = {
		questions: "questions/(:id)",
		results: "results/"
	}

	var defaultsHandlers = {
		questions: function() {console.log("router handler not specified for questions")},
		results: function() {console.log("router handler not specified for results")}
	}

	var IndexRouter = Backbone.Router.extend({
		initialize: function (paths, handlers) {
			$.extend(defaultsPaths, paths);
			$.extend(defaultsHandlers, handlers);

			var self = this;
			$.each(defaultsPaths, function(routeName, path) {
				if (!defaultsHandlers[routeName]) {
					console.log("no handler provided for route " + routeName);
					return true;
				}

				self.route(path, defaultsHandlers[routeName]);
			})
		}
	})

	return IndexRouter;
})