define(
	[
		"solv/meta",
		"solv/class",
		"solv/event",
		"solv/array/from"
	],
	function (meta, createClass, event) {
		"use strict";

		var Emitter = createClass(
			meta({
				"name": "Emitter",
				"type": "class",
				"description": "Object oriented event API. Good for a base class or mixin."
			})
		);

		Emitter.method(
			meta({
				"name": "on",
				"description": "Adds a listener",
				"arguments": [{
					"name": "eventName",
					"type": "string"
				}, {
					"name": "handler",
					"type": "function"
				}],
				"returns": {
					"type": "object",
					"description": "Event listener key; can be passed to .off to remove listener"
				}
			}),
			on
		);

		Emitter.method(
			meta({
				"name": "once",
				"description": "Adds a listener to be fired once",
				"arguments": [{
					"name": "eventName",
					"type": "string"
				}, {
					"name": "handler",
					"type": "function"
				}],
				"returns": {
					"type": "object",
					"description": "Event listener key; can be passed to .off to remove listener"
				}
			}),
			once
		);

		Emitter.method(
			meta({
				"name": "off",
				"description": "Removes a listener from an object",
				"arguments": [{
					"name": "listenerKey",
					"type": "object",
					"description": "Returned from addListener or addListenerOnce"
				}]
			}),
			offByListener
		);

		Emitter.method(
			meta({
				"name": "off",
				"description": "Removes all listeners of an event name from an object",
				"arguments": [{
					"name": "eventName",
					"type": "string"
				}]
			}),
			offByEventName
		);

		Emitter.method(
			meta({
				"name": "off",
				"description": "Removes all listeners from an object",
				"arguments": []
			}),
			allOff
		);

		Emitter.method(
			meta({
				"name": "trigger",
				"description": "Executes all handler functions listening for an event",
				"arguments": [{
					"name": "eventName",
					"type": "string"
				}, {
					"name": "nArgs",
					"type": "any",
					"required": false,
					"repeating": true,
					"description": "Arguments to pass to handler functions"
				}]
			}),
			trigger
		);

		function on (eventName, handler) {
			return event.addListener(this, eventName, handler);
		}
		
		function once (eventName, handler) {
			return event.addListenerOnce(this, eventName, handler);
		}
		
		function offByListener (listenerKey) {
			event.removeListener(this, listenerKey);
		}
		
		function offByEventName (eventName) {
			event.removeListener(this, eventName);
		}
		
		function allOff () {
			event.removeAllListeners(this);
		}
		
		function trigger () {
			var args = Array.from(arguments);
			
			args.unshift(this);
			event.trigger.apply(event, args);
		}

		return Emitter;
	}
);