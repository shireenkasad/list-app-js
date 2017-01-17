(function(Backbone, $){

	// See if App namespace exists if not create it
	var App = window.App = window.App || {};

	// Make namespace for model
	var model = App.model = App.model || {};

	//Start todoItem
	model.MyModel = Backbone.Model.extend({
		initialize: function(){
			console.log('model initialized');
		},
		defaults: {
      		label: '',
      		status: 0
    	}
		
	});

}(Backbone, jQuery))