define(["modules/user", "modules/questions", "modules/results", "router/index"],
	function (UserModule, QuestionsModule, ResultsModule, IndexRouter) {

		var defaults = {
			// nothing to do here so far
		}

		var APP = {
			init: function (options) {
				this.options = $.extend({}, defaults, options);
				this.bindEvents();
				this.initRouter();
			},

			bindEvents: function () {
				Backbone.on("user:loaded", function () {
					new QuestionsModule({
						$element: defaults.$questionsElement,
						startIndex: APP.userModule.getLastQuestionIndex()
					});
				});

				Backbone.on("questions:switch", function (points) {
					APP.userModule.addPoints(parseInt(points));
					APP.userModule.updateLastQuestionIndex();
				});

				Backbone.on("questions:over", function () {
					new ResultsModule({
						$element: defaults.$questionsElement,
						points: APP.userModule.getPoints()});
				});
			},

			initRouter: function () {
				this.router = new IndexRouter({}, {
					questions: this.handleQuestions,
					results: this.handleResults
				});

				if (!Backbone.History.started) {
					Backbone.history.start();
				}
			},

			handleQuestions: function (number) {

				if (!APP.userModule) {
					APP.initiateUserModule();
				}
				if (!number) { // probably first page load

				}
			},

			handleResults: function () {
				console.log("handling results", object);
			},

			initiateUserModule: function () {
				APP.userModule = new UserModule();
			}
		}

		return APP;
	})