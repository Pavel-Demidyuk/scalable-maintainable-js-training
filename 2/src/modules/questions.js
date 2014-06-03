define(["collections/questions", "views/questions"],
	function (QuestionsCollection, QuestionsView) {
		var defaults = {
				$element: $("body"),
				startIndex: 0
			};

		/**
		 * module constructor
		 * @param options
		 */
		function QuestionModule(options) {
			this.options = $.extend({}, defaults, options);
			this.init();
		}

		QuestionModule.prototype.init = function() {
			this.initView();
			this.initCollection();
			this.bindCollectionEvents();

			var self = this;
			this.questionsColletcion.fetch({
				success: function () {
					self.renderByIndex(defaults.startIndex);
				},
				error: function () {
					console.log("error retrieve collection");
				}
			})
		}

		QuestionModule.prototype.initView = function () {
			this.questionsView = new QuestionsView(defaults.$element);
		}

		QuestionModule.prototype.initCollection = function () {
			this.questionsColletcion = new QuestionsCollection();
		}

		QuestionModule.prototype.renderByIndex = function (index) {
			if (!this.questionsColletcion.at(index)) {
				return false;
			}

			this.questionsView.render(this.questionsColletcion.at(index));
			return true;
		}

		QuestionModule.prototype.bindCollectionEvents = function () {
			var self = this;

			this.questionsColletcion.bind("change", function (model) {
				self.options.startIndex++;

				if (self.renderByIndex(self.options.startIndex)) {
					Backbone.trigger("questions:switch", model.get("points"));
				}
				else {
					Backbone.trigger("questions:over");
				}
			})
		}

		return QuestionModule;
	})