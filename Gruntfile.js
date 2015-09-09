/*
 * grunt-version-check
 * https://github.com/stevewillard/grunt-version-check
 *
 * Author Steve Willard (stevewillard@gmail.com)
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {
  grunt.initConfig({
    jshint: {
      all: ['Gruntfile.js', 'tasks/**/*.js'],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    versioncheck : {
      options : {
        skip : ['semver'],
        hideUpToDate : false,
        packageLocation : 'files/package.json',
        bowerLocation : 'files/bower.json'
      }
    }
  });

  // Load this plugin
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // By default, lint and run the task.
  grunt.registerTask('default', ['jshint', 'versioncheck']);
};