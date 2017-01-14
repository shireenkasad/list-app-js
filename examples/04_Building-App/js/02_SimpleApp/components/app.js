(function(Backbone, $){

	// See if App namespace exists if not create it
	var App = window.App = window.App || {};

	// Make namespace for components
	var components = App.components = App.components || {};

	//Start AppComonent
	components.App = Backbone.View.extend({
		initialize: function(){
			console.log('App initialized');

			//quick add a todo
			var todoItem = new components.TodoItem();
			this.$el.find('#main').append(todoItem.el);
		},
		events:{

		},
		render: function(){

		}
	});
}(Backbone, jQuery))