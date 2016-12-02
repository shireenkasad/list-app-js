"use strict";
/*
	#Intro:

	Let's create a small framework called 'SKFramework' that we will use through all the examples

	# Event Systems

	An event system is just a way to listen and send messages to different parts of your app
	- Normally consist of an 'on' and 'off' function or 'addEventListener' and 'removeEventListener' to listen or stop listening
	- Also consists of an 'emit', 'trigger' or 'dispatchEvent' function to send a message

	In this example:
	- Shows something comparable what happens when a dom element is clicked and dispatches an event
*/
var SKFramework = SKFramework || {};
(function(SKFW){

//-- Event Constructor
	var EventDispatcher = function(){
		var _this = this;
		// Queue of events to listen for
		_this._queue = {};
	};

//-- Class Methods
	EventDispatcher.prototype = {

		// Same as 'addEventListener' Adds an event and its callback to the queue
		on: function(_eventName, _callback){
			var _queue = this._queue,
				_eventList = _queue[_eventName] || [];

			_eventList.push(_callback);

			_queue[_eventName] = _eventList;

			return this;
		},

		// Same as 'removeEventListener' Removes an event and its callback (optional) to the queue
		off: function(_eventName, _callback){
			var _queue = this._queue,
				_eventList = _queue[_eventName] || null;
			if(_eventList){

				// remove just the callback from the event list
				if(_callback){
					for(var i=0; i<_eventList.length; i++){
						var _curCallback = _eventList[i];
						if(_curCallback == _callback){
							_eventList.splice(i, 1);
							break;
						}
					}
				}

				// remove the entire list of callbacks
				else{
					delete _queue[_eventName];
				}
			}
			return this;
		},
		// Loop through queue and call the callback functions with any data
		emit: function(_eventName, _eventData){
			var _queue = this._queue,
				_eventList = _queue[_eventName] || null;
			if(_eventList){

				_eventData = _eventData || {};

				for(var i=0; i<_eventList.length; i++){
					var _curCallback = _eventList[i];

					// Add default target if none was set
					_eventData.target = _eventData.target || this;

					// call function with 'this' as its context or scope
					_curCallback.apply(this, [_eventData]);
				}
			}
			return this;
		}
	};
//-- Add Event to our 
	SKFW.EventDispatcher = EventDispatcher;
}(SKFramework));


//-- Test it
/*
	var myEventObj = new SKFramework.EventDispatcher();
	var onObjClick = function(event){
			console.log('I WAS CLICKED!');
			console.log('THIS WAS MY EVENT RETURNED', event);
		};

	// Add Event Listener
	myEventObj.on('click', onObjClick);

	// Trigger Event
	myEventObj.emit('click');
	myEventObj.emit('click', {extraData:'hello world!'});
*/