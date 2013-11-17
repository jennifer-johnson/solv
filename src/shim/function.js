define(
	[
		"../meta",
		"../array/from",
		"../class/extend",
		"../class/shim"
	],
	function (meta) {
		"use strict";

		meta({
			"type": "module",
			"description": "Augments Function prototype"
		});

		meta({
			"type": "class",
			"name": "Function",
			"global": true
		});

		meta({
			"type": "method",
			"name": "bind",
			"description": "Creates a new function that, when called, has its this keyword set to the provided value, with a given sequence of arguments preceding any provided when the new function is called.",
			"arguments": [{
				"name": "context",
				"type": "object",
				"description": "The value to be passed as the this parameter to the target function when the bound function is called. The value is ignored if the bound function is constructed using the new operator."
			}, {
				"name": "argN",
				"type": "any",
				"description": "Arguments to prepend to arguments provided to the bound function when invoking the target function.",
				"required": false,
				"repeating": true
			}],
			"returns": "function"
		});

		var functionShims = {};

		functionShims.bind = function (context) {
			var fn = this,
				args = Array.from(arguments).slice(1);

			function bound () {
				var newArgs = Array.from(arguments),
					combinedArgs = args.concat(newArgs);
				if (this instanceof bound) {
					context = this;
				}
				return fn.apply(context, combinedArgs);
			}

			bound.extend(fn);
			return bound;
		};

		Function.shim("bind", functionShims.bind);

		return functionShims;
	}
);