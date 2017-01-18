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
			//var todoItem = new components.TodoItem();
			//this.$el.find('#main').append(todoItem.el);
		},
		events:{
			'click #add': 'addTodo'
		},
		addTodo: function(){
			// get the value of input, create a new model and set the label
			var inputText = $('#todoInput').val();
			var todo = new App.model.MyModel();
			todo.set("label", inputText);
			$('#todoInput').val('');

			// DO: add the model to the collection

			// create a new todo view passing in the model
			this.todoView = new components.TodoItem({model: todo});

			// (temp) append the todo view to the DOM
			this.$el.find('#main').append(this.todoView.render().el);
		},
		render: function(){

			// DO: loop through all and add to DOM

		}
	});
}(Backbone, jQuery))