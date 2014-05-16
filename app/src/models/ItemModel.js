define(['backbone'], function(require, exports, module) {
	var ItemModel = Backbone.Model.extend({
	    defaults: {
	        'id': '',
	        'content': ''
	    }
	});

   	return ItemModel;
});