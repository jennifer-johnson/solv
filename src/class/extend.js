define(
	[
		"../meta"
	],
	function (meta) {
		"use strict";

		meta({
			"entity": "module",
			"export": "Function",
			"description": "Allows one class to easily inherit from another"
		});

		meta({
			"name": "extend",
			"description": "To be called as a method of a class constructor. Wires up a class to inherit from a parent class. Assigns the Parent's prototype to an \"_super\" property of the child's prototype.",
			"arguments": [{
				"name": "Parent",
				"type": "function",
				"description": "Parent class constructor"
			}],
			"returns": {
				"type": "function",
				"description": "Child's constructor (the method's owner). This allows chaining."
			}
		});

		if (!Function.prototype.extend) {
			Function.prototype.extend = function (Parent) {
				var Surrogate = createSurrogate(Parent);
				inherit(this, Surrogate);
				this.Super = Parent;
				return this;
			};
		}

		function createSurrogate (Parent) {
			function Surrogate () {}
			Surrogate.prototype = Parent.prototype;
			return Surrogate;
		}

		function inherit (Child, Surrogate) {
			Child.prototype = new Surrogate();
			Child.prototype.constructor = Child;
		}
	}
);
