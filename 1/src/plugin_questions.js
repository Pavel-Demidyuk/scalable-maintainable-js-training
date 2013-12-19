var QUESTIONS_PLUGIN = QUESTIONS_PLUGIN || {};

QUESTIONS_PLUGIN  = (function(plugin, $){
	
	/**
	 * Private options
	 */
	var defaults = {
			callBack : function(sum) {
				alert('sum');
			},
			
			jsonFile : 'questions.json',
			
			questionBlockTempate: '<div><%=questionText%></div>',
			
			questionOptionTemplate: '<li><label><input type="radio" name="radio" value=<%=value%>><%=optionText%></label>',
			
			$parentElement: undefined
	}
	
	var lastAnsweredQuestionNumber = 0;
	
	var score = 0;
	
	var questions = [];
	
	/**
	 * Load Json and call draw method.
	 */
	var loadQuestions = function () {
		$.getJSON(defaults.jsonFile, function(parsedQuestions){
			questions = parsedQuestions;
			draw();
		})
		.fail(function(){
			console.log('Error while getting json')
		});
	}
	
	/**
	 * Draw questions
	 */
	var draw = function() {
		if (lastAnsweredQuestionNumber >= questions.length - 1) {
			defaults.callBack(score);
			return;
		}
		else {
			defaults.$parentElement.html(
					generateQuestion(questions[lastAnsweredQuestionNumber])).find('li').click(function(){
						answer(this);
			});
		}
	}
	
	/**
	 * Answer event
	 */
	var answer = function(optionElement) {
		score = score + $(optionElement).find('input').val();
		lastAnsweredQuestionNumber++;
		draw();
	}
	
	/**
	 * Generate whole question element
	 */
	var generateQuestion = function(questionObject) {
		var questionElement = tmpl(defaults.questionBlockTempate, {questionText: questionObject.question});
		
		for (key in questionObject.answers) {
			var optionElement = tmpl(defaults.questionOptionTemplate, {
				name: lastAnsweredQuestionNumber + '[' + key + ']',
				value: questionObject.points[key],
				optionText: questionObject.answers[key]});
			
			questionElement += optionElement;
		}
		
		return questionElement;
	}
	
	/**
	 * Main call
	 */
	plugin.generate = function(options){
		defaults = $.extend({}, defaults, options);
		loadQuestions();
	}
	
	return plugin;
	
}(QUESTIONS_PLUGIN, jQuery))