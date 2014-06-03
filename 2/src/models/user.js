define([], function () {

	var UserModel = Parse.Object.extend("users", {

		/**
		 * Syncs data from local storage with the server
		 */
		syncWithLocalStorage: function () {
			// sync points
			var points = localStorage.getItem("points" + userModel.get("id"));
			if (!points) {
				points = 0;
			}
			this.set("points", points);

			// sync last answered question
			var lastQuestionIndex = localStorage.getItem("lastQuestionIndex" + userModel.get("lastQuestionIndex"));
			if (!lastQuestionIndex) {
				lastQuestionIndex = 0;
			}
			this.set("lastQuestionIndex", lastQuestionIndex);

			this.save(null, {
				error: function () {
					console.log("error sync data with server");
				}
			})
		},

		addPoints: function (points) {
			var index = "points" + this.get("id"),
				result = this.get("points") + points;
			localStorage.setItem(index, result);
			this.set("points", result);
		},

		updateLastQuestionIndex: function () {
			var index = "lastQuestionIndex" + this.get("lastQuestionIndex"),
				result = this.get("lastQuestionIndex") + 1;
			localStorage.setItem(index, result);
			this.set("lastQuestionIndex", result);
		}
	});

	return UserModel;
})
