(function($, Backbone){

//-- Create Main App View Class
var AppView = Backbone.View.extend({
	initialize: function(){
		console.info('AppView Initialized');
		console.log('this.el - ', this.el, this.$el);
		this.$list = this.$el.find('.todo-list');
		this.todoLabelList = [];
	},
	events: {
		'click .todo-btn-add': 'onAddBtnClick'
	},
	onAddBtnClick: function(e){
		var _val = this.$el.find('input').val();

		// Check if input has value
		if(_val.trim() == ''){
			alert('Please Enter Item');
			return;
		}

		// Add label to our list
		this.todoLabelList.push(_val);
		this.$el.find('input').val('');

		// Render new list
		this.render();
	},
	render: function(){
		this.$list.empty();
		for(var i=0; i<this.todoLabelList.length; i++){
			this.$list.append('<li>' + this.todoLabelList[i] + '</li>');
		}
		
	}
});

// Initialze Instance of App View. 
	// (note: didnt assign the new instance to a variable for this simple example)
new AppView({el: $('html')[0] });

}(jQuery, Backbone));