/* global define: false */
/* global require: false */
/* global log: false */


// Setting up require.js paths
require.config( {

  baseUrl: "/public/scripts",
  urlArgs: "bust=" +  (new Date()).getTime(),
  paths:{

    // Dependencies
    "jquery":                 'bower_modules/jquery/jquery.min.js',
    "underscore":             'bower_modules/underscore/underscore-min.js',
    "backbone":               'bower_modules/backbone/backbone-min.js',
    "json":                   'bower_modules/backbone.marionette/public/javascripts/json2.js',
    "backbone.babysitter":    'bower_modules/backbone.marionette/public/javascripts/backbone.babysitter.js',
    "backbone.wreqr":         'bower_modules/backbone.marionette/public/javascripts/backbone.wreqr.js',
    "marionette":             'bower_modules/backbone.marionette/lib/backbone.marionette.min.js',
    "moment":                 'bower_modules/moment/min/moment.min.js',

    "backstretch":                       "bower_modules/jquery-backstretch/jquery.backstretch.min.js"

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
  }

});




// $(window).load(function(){

//   console.log(AppRouter, AppController);
//   ParksApp.start();
//   console.log("test");

// });