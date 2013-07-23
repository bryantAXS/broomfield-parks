/* global define: false */
/* global require: false */
/* global log: false */


// Setting up require.js paths
require.config( {

  baseUrl: "/scripts",
  urlArgs: "bust=" +  (new Date()).getTime(),
  paths:{

    // Dependencies
    "jquery":                 'bower_modules/jquery/jquery',
    "underscore":             'bower_modules/underscore/underscore',
    "backbone":               'bower_modules/backbone/backbone',
    "json":                   'bower_modules/backbone.marionette/public/javascripts/json2',
    "backbone.babysitter":    'bower_modules/backbone.marionette/public/javascripts/backbone.babysitter',
    "backbone.wreqr":         'bower_modules/backbone.marionette/public/javascripts/backbone.wreqr',
    "marionette":             'bower_modules/backbone.marionette/lib/backbone.marionette.min',
    "moment":                 'bower_modules/moment/min/moment',

    "backstretch":            'bower_modules/jquery-backstretch/jquery.backstretch',
    "transit":                'bower_modules/jquery.transit/jquery.transit'

  },
  shim: {

    "backbone": {
      "deps": [ "underscore", "jquery" ],
      "exports": "Backbone"  //attaches "Backbone" to the window object
    },
    "underscore": {
      "exports": "_"
    },
    "marionette":{
      "deps": ["backbone", "backbone.wreqr", "backbone.babysitter"]
    },
    "backbone.wreqr":{
      "deps": ["backbone"]
    },
    "backbone.babysitter":{
      "deps": ["backbone"]
    },
    "backstretch":{
      "deps": ["jquery"]
    },
    "transit":{
      "deps": ["jquery"]
    }
  }

});

require(["apps/App"], function(App){

  window.App = App;
  App.start();

});