define(["collections/results", "views/results"],
	function (ResultsCollection, ResultsView) {
		var defaults = {
			$element: $("body"),
			points: 0
		};

		/**
		 * results module constructor
		 * @param options
		 */
		function ResultModule(options) {
			this.options = $.extend({}, defaults, options);
			this.init();
		}

		ResultModule.prototype.init = function () {
			this.resultsCollection = new ResultsCollection();

			var self = this;
			this.resultsCollection.fetch({
				success: function () {
					self.run();
				}
			})
		}

		ResultModule.prototype.run = function () {
			this.resultsView = new ResultsView(defaults.$element);
			this.resultsView.render(this.findModel());
		}

		/**
		 * looking for model based on score
		 * @returns {*}
		 */
		ResultModule.prototype.findModel = function () {
			var modelIndex = 0;
			var self = this;
			$.each(this.resultsCollection.models, function (index, model) {
				modelIndex = index;
				// First model
				if (!self.resultsCollection.models[index - 1]) {
					if (defaults.points <= model.get("to")) {
						return false;
					}
				}

				// Last model
				else if (!self.resultsCollection.models[index + 1]) {
					if (defaults.points >= model.get("to")) {
						return false;
					}
				}

				// something in between
				else if (defaults.points >= model.get("to") && defaults.points <= self.resultsCollection.models[index + 1].get("to")) {
					return false;
				}
			})
			return this.resultsCollection.at(modelIndex);
		}


		return ResultModule;
	})