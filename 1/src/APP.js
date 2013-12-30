define(['jquery', 'questionModule'], function($, questionModule){
	var defaults = {
	}
	
    return {
    	bind : function (ev, callback, context) {
    	    var calls = this._callbacks || (this._callbacks = {});
    	    var list = calls[ev] || (calls[ev] = []);
    	    list.push([callback, context]);
    	    return this;
    	},
    	
    	unbind : function (ev, callback) {
    	    var calls;
    	    if (!ev) {
    	        this._callbacks = {};
    	    } else if (calls = this._callbacks) {
    	        if (!callback) {
    	            calls[ev] = [];
    	        } else {
    	            var list = calls[ev];
    	            if (!list) return this;
    	            for (var i = 0, l = list.length; i < l; i++) {
    	                if (list[i] && callback === list[i][0]) {
    	                    list[i] = null;
    	                    break;
    	                }
    	            }
    	        }
    	    }
    	    return this;
    	},
    	
    	trigger : function (eventName) {
    		alert('trigger');
    	    var list, calls, ev, callback, args;
    	    var both = 2;
    	    if (!(calls = this._callbacks)) return this;
    	    while (both--) {
    	        ev = both ? 'all' : eventName;
    	        if (list = calls[ev]) {
    	            for (var i = 0, l = list.length; i < l; i++) {
    	                if (!(callback = list[i])) {
    	                    list.splice(i, 1);
    	                    i--;
    	                    l--;
    	                } else {
    	                    args = both ? arguments : Array.prototype.slice.call(arguments, 1);
    	                    callback[0].apply(callback[1] || this, args);
    	                }
    	            }
    	        }
    	    }
    	    return this;
    	},
    	/*
    	 * 
    	 */
    	onQuestionsFinished: function(score, $parentElement) {
    		define(['resultsModule'], function(resultsModule){
	    		resultsModule({
	    			'$parentElement' : $parentElement,
	    			'score' : score
	    		}).loadResults();
    		})
    	},
    	/*
    	 * 
    	 */
        init: function (options) {
        	this.options = $.extend({}, defaults, options);
        	
        	this.bind('questionsFinished', this.onQuestionsFinished);
        	
        	for (elementKey in this.options.questionElements){
        		new questionModule({
        			'$parentElement' : this.options.questionElements[elementKey]
        		}).loadQuestions();
        	}
        	
        },
    
    };
 
});