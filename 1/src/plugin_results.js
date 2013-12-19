var ANSWERS_PLUGIN = ANSWERS_PLUGIN || {};

ANSWERS_PLUGIN  = (function(plugin, $){
	
	plugin.generate = function(score) {
		alert ('score in results');
		console.log(score);
	}
	
	return plugin
}(ANSWERS_PLUGIN, jQuery));

/*

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
		
		this.init(element, options);
	}
 
	Plugin.prototype.init = function (element, sum) {
		var self = this;
		
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
		
		
	}
	
	Plugin.prototype.action = function() {
	}
 
	$.fn[pluginName] = function ( options ) {
		new Plugin( this, options);
		return this;
	}
})( jQuery, window, document );*/