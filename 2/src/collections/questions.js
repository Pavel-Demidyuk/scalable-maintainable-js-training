define(["models/questions"], function(QuestionsModel){

	var QuestionsCollection = Parse.Collection.extend({
		model: QuestionsModel
	});

	return QuestionsCollection;
})