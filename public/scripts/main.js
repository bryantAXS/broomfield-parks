/* global define: false */
/* global require: false */
/* global log: false */


// Setting up require.js paths
require.config( {

  baseUrl: "/scripts",
  urlArgs: "bust=" +  (new Date()).getTime(),
  paths:{

    // Dependencies
    "jquery":                           'vendor/jquery',
    "underscore":                       'vendor/underscore',
    "backbone":                         'vendor/backbone',
    "json":                             'vendor/json2',
    "backbone.babysitter":              'vendor/backbone.babysitter',
    "backbone.wreqr":                   'vendor/backbone.wreqr',
    "marionette":                       'vendor/backbone.marionette',
    "moment":                           'vendor/moment',

    "backstretch":                      'vendor/jquery.backstretch',
    "transit":                          'vendor/jquery.transit',
    "lazyload":                         'vendor/jquery.lazyload',
    "viewport-selectors":               'vendor/viewport',
    "spin":                             'vendor/spin',
    "purl":                             'vendor/purl',
    "typeahead":                        'vendor/typeahead',

    'esri-leaflet':                     'vendor/esri-leaflet',
    'leaflet':                          'vendor/leaflet'

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
    },
    "lazyload":{
      "deps": ["jquery"]
    },
    "viewport-selectors":{
      "deps": ["jquery"]
    },
    "friendurl":{
      "deps": ["jquery"]
    },
    "purl":{
      "deps": ["jquery"]
    },
    "typeahead":{
      "deps": ["jquery"]
    },
    "esri-leaflet":{
      "deps": [
        "leaflet"
      ]
    }
  }

});

require(["apps/App"], function(App){

  window.App = App;
  App.start();

});
