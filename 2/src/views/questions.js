define(["jquery", "backbone"],
	function ($, Backbone) {
	var QuestionsView = Backbone.View.extend({

		template: "<div><%=question%></div>" +
			"<% _.each(answers, function(answer, index){ %>" +
			"<li><label><input type='radio' name='radio' value=<%=points[index]%>><%=answers[index]%></label></li>" +
			"<%})%>",

		events: {
			"click li" : "clickLi"
		},

		initialize: function($element){
			this.el = $element;
			_.bindAll(this, 'render');
		},

		render: function(questionModel) {
			$(this.el).html(_.template(this.template, questionModel.toJSON()));

			// TODO
			// Ilya, why I can't bind it backbone-style?
			$(this.el).find("li").click(function(event){
				questionModel.set("points", $(event.target).find("input").val());
			})
		}
	});
	return QuestionsView;
})