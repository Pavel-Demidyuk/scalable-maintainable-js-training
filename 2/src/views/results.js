define(["jquery", "backbone"], function($, Backbone){
	var ResultsView = Backbone.View.extend({
		el: $('body'),
		template: "<div>You getting fucking <%=status%></div>",

		initialize: function($element) {
			this.el = $element;
		},

		render: function(model) {
			if (!model) {
				return;
			}
			$(this.el).html(_.template(this.template, model.toJSON()));
		}
	})

	return ResultsView;
})