/*jshint node:true*/
"use strict";

module.exports = function (grunt) {
	registerTasks(grunt);
	configureTasks(grunt);
	loadTasks(grunt);
};

function registerTasks (grunt) {
	grunt.registerTask("default", [
		"lint",
		"complexity",
		"test"
	]);
	
	grunt.registerTask("lint", [
		"jshint"
	]);
	
	grunt.registerTask("test", [
		"karma:local"
	]);
	
	grunt.registerTask("coverage", [
		"karma:coverage"
	]);
	
	grunt.registerTask("start-watch", [
		"karma:watch:start",
		"watch"
	]);

	grunt.registerTask("build", [
		"lint",
		"complexity",
		"karma:phantom",
		"karma:sauce"
	]);

	grunt.registerTask("document", [
		"clean:docs",
		"api_meta"
	]);
}

function configureTasks (grunt) {
	var pkg = grunt.file.readJSON("package.json");

	pkg.versionMajorMinor = pkg.version.replace(/^(\d+\.\d+).*$/, "$1");

	grunt.initConfig({
		pkg: pkg,
		watch: {
			all: {
				files: [
					"src/**/*.js",
					"tests/spec/**/*.js"
				],
				tasks: [
					"lint",
					"karma:watch:run"
				]
			}
		},
		connect: {
			server: {
				options: {
					base: "",
					port: 9999
				}
			}
		},
		jshint: {
			options: {
				jshintrc: ".jshintrc"
			},
			lib: {
				src: [
					"src/**/*.js"
				]
			},
			tests: {
				src: [
					"tests/runner.js",
					"tests/karma/runner.js",
					"tests/spec/**/*.js",
					"Gruntfile.js",
					"karma.conf.js"
				]
			}
		},
		complexity: {
			options: {
				breakOnErrors: true,
				errorsOnly: false,
				cyclomatic: 5,
				halstead: 10,
				maintainability: 95,
				hideComplexFunctions: true
			},
			lib: {
				src: [
					"src/**/*.js"
				]
			},
			tests: {
				src: [
					"tests/runner.js",
					"tests/karma/runner.js",
					"tests/spec/**/*.js"
				]
			}
		},
		karma: {
			options: {
				configFile: "karma.conf.js"
			},
			local: {},
			watch: {
				singleRun: false,
				background: true
			},
			phantom: {
				browsers: [
					"PhantomJS"
				],
				preprocessors: {
					"src/**/*js": [
						"coverage"
					]
				},
				reporters: [
					"dots",
					"coverage"
				],
				coverageReporter: {
					type: "lcovonly",
					dir: "coverage"
				}
			},
			coverage: {
				preprocessors: {
					"src/**/*.js": [
						"coverage"
					]
				},
				reporters: [
					"dots",
					"coverage"
				],
				coverageReporter: {
					type: "html",
					dir: "coverage"
				}
			},
			sauce: {
				reporters: [
					"dots",
					"saucelabs"
				],
				browsers: [
					"sauce_chrome",
					"sauce_firefox",
					"sauce_safari",
					"sauce_ie_9",
					"sauce_ie_10",
					"sauce_ie_11",
					"sauce_edge"
				],
				captureTimeout: 120000
			}
		},
		coveralls: {
			options: {
				coverageDir: "coverage",
				recursive: true
			}
		},
		version: {
			bump: {
				src: [
					"package.json",
					"bower.json"
				]
			}
		},
		api_meta: {
			docs: {
				src: ["./src"],
				dest: "./docs/v<%= pkg.versionMajorMinor %>/",
				usage: "./tests/spec/**/*-test.js"
			}
		},
		clean: {
			docs: ["<%= api_meta.docs.dest %>"]
		}
	});
}

function loadTasks (grunt) {
	var devDepends = grunt.config("pkg.devDependencies");

	Object.keys(devDepends).forEach(function loadIfGruntPlugin (name) {
		if (hasGruntPrefix(name)) {
			grunt.loadNpmTasks(name);
		}
	});
}

function hasGruntPrefix (name) {
	return name.indexOf("grunt-") === 0;
}