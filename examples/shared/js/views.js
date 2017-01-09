"use strict";
/*
	#Intro:

	Let's build off of the Event System and create a base View Class

	# Views or View-Controller

	A View is responsiple for what you see based on the Model or State
	- Can render or output HTML based on its Model data or State Data
	- Takes DOM events (clicks, changes, keypress, etc..) and maps it to functions to perform
	- Updates model's directly or triggers some event to pass to the app that updates models and states

*/

var SKFramework = SKFramework || {};

//-- View Class
(function(SKFW){
//-- Helper Functions
	// Make a nickname for the Extend function in our Utils (less to type)
	var extend = SKFW.Utils.extend;
//-- View Constructor
	// Going to use an 'extend' utility in the utils.js
	var View = extend(SKFW.EventDispatcher, {
		// Special function i added to the extend helper that gets called after the View is created
		constructor: function(el){
			// Call Parent Constructor
			SKFW.EventDispatcher.apply(this, arguments);

			// Set the DOM element the View will use
			this.el = el || document.createElement('div');

			//-- TODO: Automatically bind events to element
			// ... your code here
		},
		setElement: function(el){
			// TODO: Remove current events from previous element
			// ... your code here

			// TODO: Bind events to el
			// ... your code here
			
			// set View's new DOM element 
			this.el = el;

		},
		events:{

		},
		render: function(){

		}
	});
	// Make a shortcut extend function
	View.extend = function(_classPrototype){
		return extend(this, _classPrototype);
	};

	SKFW.View = View;
}(SKFramework));



	
