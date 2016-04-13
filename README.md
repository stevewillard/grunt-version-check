# grunt-version-check

> Checks if your Bower or NPM dependencies are out of date.

## Getting Started
This plugin requires Grunt `>=0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-version-check --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-version-check');
```

## The "versioncheck" task

### Overview
In your project's Gruntfile, add a section named `versioncheck` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  versioncheck: {
    target: {
      options: {
        skip : ["semver", "npm", "lodash"],
        hideUpToDate : false
      }
    }
  },
});
```

### Options

#### options.skip
Type: `Array`
Default value: `[]`

A list of dependencies to skip.

#### options.hideUpToDate
Type: `Boolean`
Default value: `false`

If true, only dependencies that are out of date will be listed.

#### options.bowerLocation
Type: `String`
Default value: `bower.json`

Specify a relative path to a bower.json file.

#### options.packageLocation
Type: `String`
Default value: `package.json`

Specify a relative path to a package.json file.

#### options.showPrerelease
Type: `Boolean`
Default value: `false`

If true, versions of bower dependencies are compared to prereleased versions and not the last stable version.

### Example output
```
Running "versioncheck" task
>> async (bower) is up to date.
>> backbone (bower) is up to date.
>> backbone-pageable (bower) is up to date.
>> backbone-relational (bower) is out of date. Your version: 0.8.7 latest: 0.8.8
>> backgrid (bower) is up to date.
>> backgrid-moment-cell (bower) is up to date.
>> bootstrap (bower) is up to date.
>> bootstrap-paginator (bower) is up to date.
>> d3 (bower) is up to date.
>> font-awesome (bower) is out of date. Your version: 4.1.0 latest: 4.2.0
>> highstock-release (bower) is up to date.
>> i18next (bower) is out of date. Your version: 1.7.3 latest: 1.7.4
>> jquery (bower) is up to date.
>> jquery-cookie (bower) is up to date.
>> jquery.tablesorter (bower) is up to date.
>> leaflet (bower) is up to date.
>> leaflet.markercluster (bower) is up to date.
>> lodash (bower) is up to date.
>> marionette (bower) is out of date. Your version: 2.0.3 latest: 2.1.0
>> Marionette.SubRouter (bower) is up to date.
>> moment (bower) is out of date. Your version: 2.7.0 latest: 2.8.2
>> require-handlebars-plugin (bower) is up to date.
>> stringjs (bower) is out of date. Your version: 1.8.1 latest: 1.9.1
>> typeahead.js (bower) is out of date. Your version: 0.10.2 latest: 0.10.5
>> colors (npm) is up to date.
>> bower (npm) is up to date.
>> npm (npm) is up to date.
>> async (npm) is up to date.
>> lodash (npm) is up to date.
>> grunt-contrib-jshint (npm) is out of date. Your version: ^0.9.2 latest: 0.10.0
>> grunt (npm) is up to date.
```
