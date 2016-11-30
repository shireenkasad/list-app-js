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
	- Create a namespace for Utils and add an 'copyObject' function
*/

var SKFramework = SKFramework || {};

//-- Model Class
(function(SKFW){

//-- Event Constructor
	var Model = function(){
		this._props = {};
	};
	Model.prototype = {
		get: function(_propName){
			return this._props[_propName] || undefined;
		},
		set: function(_propName){
			return this._props[_propName] || undefined;
		}
	};

	SKFW.Model = Model;
}(SKFramework));


//-- Utils copyObject
(function(SKFW){
	
	function copyObject(_object, _objectExtend) {
		for(var _key in _objectExtend){
			_object[_key] = _objectExtend[key];
		}
	}
	SKFW.Utils = SKFW.Utils || {};
	SKFW.Utils.copyObject = copyObject;

}(SKFramework));	

//-- Test it

	
