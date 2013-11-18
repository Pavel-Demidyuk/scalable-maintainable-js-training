;(function ( $, window, document, undefined ) {
	 
	var pluginName = "results",
		defaults = {
			foo: 'bar'
		};
	
	function Plugin( element, options) {
		this.element = element;
		
		this.options = $.extend( {}, defaults, options) ;
		
		this._defaults = defaults;
		this._name = pluginName;
		
		this.init(element);
	}
 
	Plugin.prototype.init = function (element) {
		var self = this;
		
		var sum = fetchAnswersSum();
		var status = '';
		$.getJSON('results.json', function(results){
			var lastResult = 999;
			
			$.map(results, function(result){

				if (sum <= result.to && lastResult > result.to){
					lastResult = result.to;
					status = result.status;
				}
			});
			
			if (!status) {
				element.html('WTF? Status is undefined, you scored ' + sum);
			}
			else {
				element.html('You scored ' + sum + ' points, here is your ' + status);
			}
			
		})
		.fail(function(){
			alert('can not get json');
		});
	};
	
	fetchAnswersSum = function() {
		
		var sum = 0;
		
		$("div[data-name='question']").each(function(num, questionElement){
			$(questionElement).find('input:checked').each(function(num, element){
				sum += parseInt($(element).val());
			})
		});
		
		return sum;
	}
	
	Plugin.prototype.action = function() {
	}
 
	$.fn[pluginName] = function ( options ) {
		new Plugin( this, options);
		return this;
	}
})( jQuery, window, document );