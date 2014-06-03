define(["models/results"], function(ResultsModel){

	var ResultsCollection = Parse.Collection.extend({
		model: ResultsModel
	});

	return ResultsCollection;
})