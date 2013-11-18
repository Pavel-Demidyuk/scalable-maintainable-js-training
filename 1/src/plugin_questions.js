;(function ( $, window, document, undefined ) {
	 
	var pluginName = "questions",
		defaults = {
			sumResults: function() {
				alert('hey ho, you answered all questions, man!');
			}
		};
 
	function Plugin( element, options, data) {
		this.element = element;
		
		this.options = $.extend( {}, defaults, options) ;
		
		this._defaults = defaults;
		this._name = pluginName;
		
		this.init(element, data);
	}
 
	Plugin.prototype.init = function (element) {
		var self = this;
		
		$.getJSON('questions.json', function(questions){
			var questionNumber = 0;
			$.map(questions, function(question){
				var questionBlock = $('<div data-name="question">' + question.question + '</div>');
				
				var answerNumber = 0;
				$.map(question.answers, function(answer){
					var input = '<input type=radio name=question[' + questionNumber + '] value="' + questions[questionNumber].points[answerNumber] + '">';
					
					
					var answerOption = '<li>' + input + answer + '</li>';
					questionBlock.append(answerOption);
					answerNumber++;
				});
				questionBlock.hide();
				
				element.append(questionBlock);
				
				questionNumber++;
			});
			
			self.action();
		})
		.fail(function(){
			alert('can not get json');
		});
	};
	
	Plugin.prototype.action = function() {
		
		var self = this;
		var allQuestions = true;
		$("div[data-name='question']").each(function(num, questionElement){
			
			var checked = false;
			$(questionElement).find('input').each(function(num, input) {
				
				if ($(input).is(':checked')) {
					checked = true;
					return false;
				}
				
				// bind change event on input
				$(input).change(function(){
					$(questionElement).hide();
					self.action();
				});
			});
			
			if (!checked){
				$(questionElement).fadeIn();
				allQuestions = false;
				return false;
			}
			
		});
		
		if (allQuestions) {
			this.options.sumResults();
		}
		
		
		//here we will call summ plugin.
	}
 
	$.fn[pluginName] = function ( options ) {
		new Plugin( this, options);
		return this;
	}
})( jQuery, window, document );