"use strict";
/*
	#Intro:

	Let's build off of the Event System and create a base Model Class

	# Models

	A Model is just an object that contains data, usually used with a View (responsible for displaying data)
	- Has a way to get and set properties/data
	- Can be as simple as an object with properties

	In this example:
	- We are going to build a more useful Model than just an object with properties
	- It will get/set properties
	- It will Extend EventDispatcher so it will inherit the ability to trigger events
*/

var SKFramework = SKFramework || {};

//-- Model Class
(function(SKFW){
//-- Helper Functions
	// Make a nickname for the Extend function in our Utils (less to type)
	var extend = SKFW.Utils.extend;
//-- Model Constructor
	// Going to use an 'extend' utility in the utils.js
	var Model = extend(SKFW.EventDispatcher, {
		// Special function i added to the extend helper that gets called after the model is created
		constructor: function(){
			// Call Parent Constructor
			SKFW.EventDispatcher.apply(this, arguments);

			// Set internal property to hold public Model properties
			this._props = {};
		},
		get: function(_propName){
			return this._props[_propName] || undefined;
		},
		set: function(_propName, _val){
			// Set property value
			this._props[_propName] = _val;

			// Trigger a 'change' with some info
			this.emit('change', {target: this, prop: _propName, value: _val});
			return this;
		}
	});
	// Make a shortcut extend function
	Model.extend = function(_classPrototype){
		return extend(this, _classPrototype);
	};

	SKFW.Model = Model;
}(SKFramework));



	
