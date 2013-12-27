define(['jquery', 'micro_template'], function($){

	/**
	 * Private options
	 */
	var defaults = {
			jsonFile : 'questions.json',
			questionBlockTempate: '<div><%=questionText%></div>',
			questionOptionTemplate: '<li><label><input type="radio" name="radio" value=<%=value%>><%=optionText%></label>',
	}
	/**
	 * 
	 */
	return function(options) {	
		this.lastAnsweredQuestionNumber = 0;
		this.score = 0;
		this.questions = [];
		this.currentOptions = {};
		this.currentOptions = $.extend({}, defaults, options);
		
		/**
		 * Load Json and call draw method.
		 */
		this.loadQuestions = function () {
			var self = this;
			
			$.getJSON(this.currentOptions.jsonFile, function(parsedQuestions){
				questions = parsedQuestions;
				self.draw();
			})
			.fail(function(){
				console.log('Error while getting json')
			});
		}
		
		/**
		 * Draw questions
		 */
		this.draw = function() {
			var self = this;
			
			if (this.lastAnsweredQuestionNumber >= questions.length - 1) {
				// all questions are done
				currentOptions.callBack(score);
				return;
			}
			else {
				console.log(this.currentOptions.$parentElement);
				this.currentOptions.$parentElement.html(
						this.generateQuestion(questions[this.lastAnsweredQuestionNumber])).find('li').click(function(){
							self.answer(this);
				});
			}
		}
		
		/**
		 * Answer event
		 */
		this.answer = function(optionElement) {
			this.score = this.score + $(optionElement).find('input').val();
			this.lastAnsweredQuestionNumber++;
			this.draw();
		}
		
		/**
		 * Generate whole question element
		 */
		this.generateQuestion = function(questionObject) {
			var questionElement = tmpl(defaults.questionBlockTempate, {questionText: questionObject.question});
			
			for (key in questionObject.answers) {
				var optionElement = tmpl(defaults.questionOptionTemplate, {
					name: this.lastAnsweredQuestionNumber + '[' + key + ']',
					value: questionObject.points[key],
					optionText: questionObject.answers[key]});
				
				questionElement += optionElement;
			}
			
			return questionElement;
		}
		
		return this;
	}
	
});