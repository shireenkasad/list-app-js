(function(Backbone, $){

	// See if App namespace exists if not create it
	var App = window.App = window.App || {};

	// Make namespace for components
	var components = App.components = App.components || {};

	//Start todoItem
	components.TodoItem = Backbone.View.extend({
		initialize: function(_opts){
			console.log('TodoItem initialized');

			// If DOM Element not passed then find template
			if(!_opts || !_opts.el){
				var $newEl = $(	$('#app-templates [data-template="todo-item"] > *:first-child').prop('outerHTML'));
				this.setElement($newEl);

				// (temp) render the div
				//$newEl.html(this.model.get("label"));
			}
			this.listenTo(this.model, 'change', this.render);
		},
		events:{

		},
		render: function(){
			this.$el.html(this.model.get("label"));
			return this;
		}
	});
}(Backbone, jQuery))