define(["jquery", "backbone", "models/user"], function($, Backbone, UserModel){
	var UserView = Backbone.View.extend({
		initialize: function($el) {
			this.el = $el;
			this.model = UserModel;
			this.listenTo(this.model, "change", this.userModelChange);
		},

		render: function() {
			$(this.el).html(this.getTemplate())
		},

		userModelChange: function() {
			alert("userModel Change");
		},

		getTemplate: function() {
			return '<div>User Name: <input id="userName" name="userName" type="text"><a href="/#/signin">Sign In</a></div>';
		}
	})

	return UserView;
});

