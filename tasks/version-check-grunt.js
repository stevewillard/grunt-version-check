/*
 * grunt-version-check
 * https://github.com/stevewillard/grunt-version-check
 *
 * Author Steve Willard (stevewillard@gmail.com)
 * Licensed under the MIT license.
 */

var bower = require('bower'),
npm = require('npm'),
_ = require('lodash'),
semver = require('semver'),
async = require('async');

require('colors');

/*
  Takes either a bower.json or package.json and returns some metadata about each object

  Input: (bower.json)
  { name: "my-bower-component", dependencies: {"foo" : "1.2.3"}, devDependencies: {"bar" : "4.5.6"} }

  Output:
  [{
      "name": "foo",
      "type": "bower",
      "version": "1.2.3"
  },{
      "name": "bar",
      "type": "bower",
      "version": "4.5.6"
  }]
*/
function componentFileToMetadatas(type, json) {
  var results = [],
  allDeps = _.merge(json.dependencies || {}, json.devDependencies || {}, json.optionalDependencies || {});

  _.each(Object.keys(allDeps), function(dependency) {
    results.push({
      name: dependency,
      type: type,
      version: allDeps[dependency]
    });
  });

  return results;
}

function readFile(grunt, file) {
  return grunt.file.exists(file) ? grunt.file.readJSON(file) : {};
}

function bowerCallback(dependency, showPrerelease) {
  return function(callback) {
    bower.commands
    .info(dependency.name, '')
    .on('end', function(results) {
      var latest = results.latest.version;
      if (showPrerelease) {
          latest = results.versions[0];
      }

      callback(null, _.merge({
        latest : latest,
        upToDate : semver.satisfies(latest, dependency.version)
      }, dependency));
    });
  };
}

function npmCallback(dependency) {
  return function(callback) {
    npm.commands.view([dependency.name, 'version'], true, function(err, data) {
      if (!data || !Object.keys(data).length) {
        return callback(null, _.merge({
          latest : 'unknown',
          upToDate : true
        }, dependency));
      }
      // Data is structured as: { '1.2.1': { version: '1.2.1' } } so get the first key of the object
      var latest = data[Object.keys(data)[0]].version;

      callback(null, _.merge({
        latest : latest,
        upToDate : semver.satisfies(latest, dependency.version)
      }, dependency));
    });
  };
}

function sortFunc(dep) {
  return dep.name.toLowerCase();
}

module.exports = function(grunt) {
  grunt.registerMultiTask('versioncheck', 'Checks if your NPM or Bower dependencies are out of date.', function() {
    var done = this.async(),
    dependencyCalls = [];

    var options = this.options({
      skip : [],
      hideUpToDate: false,
      packageLocation: 'package.json',
      bowerLocation: 'bower.json',
      showPrerelease: false
    });

    // Check if multi task options are defined
    if (this.data.skip) {
      options.skip = this.data.skip;
    }

    if (this.data.hideUpToDate) {
      options.hideUpToDate = this.data.hideUpToDate;
    }

    if (this.data.packageLocation) {
      options.packageLocation = this.data.packageLocation;
    }

    if (this.data.bowerLocation) {
      options.bowerLocation = this.data.bowerLocation;
    }

    if (this.data.showPrerelease) {
      options.showPrerelease = this.data.showPrerelease;
    }

    var allDependencies = componentFileToMetadatas('bower', readFile(grunt, options.bowerLocation))
      .concat(componentFileToMetadatas('npm', readFile(grunt, options.packageLocation)));

    // Skip dependencies
    allDependencies = _.reject(allDependencies, function(dependency) {
      return _.contains(options.skip, dependency.name);
    });

    _.each(allDependencies, function(dependency) {
      var version = dependency.version;

      // Make sure the version string is readable by semver
      if (semver.validRange(version)) {
        switch (dependency.type) {
          case 'bower':
            dependencyCalls.push(bowerCallback(dependency, options.showPrerelease));
            break;
          case 'npm':
            dependencyCalls.push(npmCallback(dependency));
            break;
        }
      }
    });

    npm.load({}, function() {
      async.parallel(dependencyCalls, function(err, results) {
        var allValid = true;

        _.each(_.sortBy(results, sortFunc), function(result) {
          if (!result.upToDate) {
            allValid = false;

            grunt.log.warn(result.name +
              (' (' + result.type + ')' + ' is out of date. Your version: ' + result.version + ' latest: ' + result.latest).yellow);
          } else {
            if (!options.hideUpToDate) {
              grunt.log.ok(result.name + (' (' + result.type + ')' + ' is up to date.').green);
            }
          }
        });

        done(allValid);
      });
    });

  });
};
