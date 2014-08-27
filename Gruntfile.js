/*
 * grunt-version-check
 * https://github.com/stevewillard/grunt-version-check
 *
 * Copyright (c) 2014 Steve Willard
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {

    grunt.initConfig({
        jshint: {
            all: ["Gruntfile.js", "tasks/**/*.js"],
            options: {
                jshintrc: ".jshintrc"
            }
        },

        versioncheck : {
            options : {
                skip : ["semver"],
                hideUpToDate : false
            }
        }
    });

    // Load this plugin
    grunt.loadTasks("tasks");

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks("grunt-contrib-jshint");

    // By default, lint and run the task.
    grunt.registerTask("default", ["jshint", "versioncheck"]);
};
