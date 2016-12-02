"use strict";
/*
	#Intro:
	Start a library of some useful util/helper functions
*/
var SKFramework = SKFramework || {};
(function(SKFW){

//-- Utils
	// Extend Class/Function
	function extend(_classToExtend, _prototype){

		// Copy existing prototype to new class's prototype (this also replaces the _newClass constructor with the _classToExtend's constructor. Will replace at end)
		var _newProto = Object.create(_classToExtend.prototype);

		// Copy new classes property and methods here
		for(var key in _prototype){
			_newProto[key] = _prototype[key];
		}
		
		// Create new base class
		var _newClass = _prototype.hasOwnProperty('constructor') ? _prototype.constructor : function(){
				var _rVal = _classToExtend.apply(this, arguments);
				
				// If this special function exists then call it also
				if(_newClass.prototype.initialize) {
					_newClass.prototype.initialize.apply(this, arguments);
				}
				return _rVal;
			};
		_newClass.prototype = _newProto;

		// Check if new class doesn't have a constructor
		
		_newClass.prototype.constructor =_newClass;
		return _newClass;
	}
	SKFW.Utils = SKFW.Utils || {};
	SKFW.Utils.extend = extend;
}(SKFramework));
