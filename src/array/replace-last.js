/* istanbul ignore if */
if (typeof define !== "function") {
	var define = require("amdefine")(module);
}

define(function(require) {
	"use strict";

	/*meta({
		"name": "Array",
		"type": "class",
		"global": true
	})*/

	require("../class/method");
	require("../array/shim");
	require("../array/from");

	var meta = require("../meta");

	Array.method(
		meta({
			"name": "replaceLast",
			"description": "Replaces the last occurence of an item",
			"arguments": [{
				"name": "item",
				"type": "any"
			}, {
				"name": "replacement",
				"type": "any",
				"repeating": true
			}]
		}),
		replaceLast
	);

	function replaceLast (item) {
		var index = this.lastIndexOf(item),
			replacements = Array.from(arguments).slice(1),
			args;

		if (isFound(index)) {
			args = [index, 1].concat(replacements);
			this.splice.apply(this, args);
		}
	}

	function isFound (index) {
		return index > -1;
	}
});