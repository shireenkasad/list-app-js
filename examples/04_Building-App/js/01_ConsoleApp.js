(function($, Backbone){
//-- Create Main App View Class
var AppView = Backbone.View.extend({
	initialize: function(){
		console.log('%cWelcome to our Console Todo List App', 'font-size:18px; font-weight:bold;');
		this.todoList = [];
	},
	addTodo: function(_label, _status){
		// Create a new model for a todo
		var newTodo = new Backbone.Model();

		// Set a label and status for it
		newTodo.set({'label': _label, 'status': _status});

		// Add to our list of Todos
		this.todoList.push(newTodo);

		// Output our result
		this.render();
	},
	deleteTodoByIndex: function(_index){
		this.todoList.splice(_index, 1);

		// Output our result
		this.render();
	},
	getTodoByIndex: function(_index){
		return this.todoList[_index];
	},
	render: function(){
		// Display our list of todo items
		var returnStr = '%cHere is our list:\n%c';
		for(var i=0; i<this.todoList.length; i++){
			var curTodo = this.todoList[i];
			returnStr += '  ' + ((i) + '. ' + curTodo.get('label') + ' - ' + curTodo.get('status')) + '\n';
		}
		// If there are no todos
		if(this.todoList.length === 0){
			returnStr += ('  No Todos!');
		}
		console.log(returnStr, 'font-size:14px; color:#000; font-weight:bold;', 'font-size:12px; color:#999');
		return;
	}
});

// Initialze Instance of App View. 
	// (note: didnt assign the new instance to a variable for this simple example)
window.app = new AppView();

}(jQuery, Backbone));