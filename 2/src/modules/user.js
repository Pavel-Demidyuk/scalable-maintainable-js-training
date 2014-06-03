define(["models/user"],
	function (UserModel) {
		var defaults = {};

		function UserModule(options) {
			this.options = $.extend({}, defaults, options);
			this.init();
		}

		UserModule.prototype.init = function () {
			userModel = new UserModel();
			this.initUser();
		}

		UserModule.prototype.registerUser = function () {
			userModel.save(null, {
				success: function () {
					Backbone.trigger("user:loaded");
				},
				error: function () {
					console.log("Error creating user");
				}
			});
		}

		/**
		 * Sync data from local storage with user data and send it to server.
		 * This is for cases when user lost connection during the script run.
		 */
		UserModule.prototype.syncUser = function () {
			userModel.syncWithLocalStorage();
		}

		UserModule.prototype.initUser = function () {
			if (localStorage.getItem("id")) {
				var id = localStorage.getItem("id");
				this.loadUserById(id);
			}
			else {
				this.registerUser();
			}
		}

		UserModule.prototype.loadUserById = function (id) {
			var query = new Parse.Query(GameScore);
			query.get(id, {
				success: function (model) {
					userModel = model;
					syncUser();
					Backbone.trigger("user:loaded");
				},
				error: function () {
					console.log("Error retrieving user model by id " + id);
				}
			})
		}

		UserModule.prototype.getLastQuestionIndex = function () {
			return userModel.get("lastQuestionIndex");
		}

		UserModule.prototype.updateLastQuestionIndex = function () {
			userModel.updateLastQuestionIndex();
		};

		UserModule.prototype.getPoints = function () {
			return userModel.get("points");
		}

		UserModule.prototype.addPoints = function (points) {
			userModel.addPoints(parseInt(points));
		}

		return UserModule;
	})