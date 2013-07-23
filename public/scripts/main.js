/* global define: false */
/* global require: false */
/* global log: false */


// Setting up require.js paths
require.config( {

  baseUrl: "/public/scripts",
  urlArgs: "bust=" +  (new Date()).getTime(),
  paths:{

    // Dependencies
    "jquery": "../../bower_modules/jquery/jquery",
    "underscore": "../../bower_modules/underscore/underscore",

    "backbone": "../../bower_modules/backbone",
    "backbone.wreqr": "../../bower_modules/backbone.wreqr/src/wreqr",
    "backbone.babysitter": "../../bower_modules/backbone.babysitter",
    "marionette": "../../bower_modules/marionette",

    // "add2home": "vendor/add2home",
    // "detectmobile": "vendor/detectmobile",
    // "date": "vendor/date",
    // "endlessscroll": "vendor/jquery-endlessscroll",
    // "fancybox": "vendor/fancybox",
    // "fastclick": "vendor/fastclick",
    // "jquery-dropdown": "vendor/jquery-dropdown",
    // 'jquery-transit': "vendor/jquery-transit",
    // 'jquery-jpanelmenu': "vendor/jquery-jpanelmenu",
    // "moment": "vendor/moment",
    // "transitions": "vendor/jquery-page-transitions",
    // "log": "vendor/log",
    // "backstretch": "vendor/backstretch",
    // "gauge": "vendor/gauge",

    // // FIXME: These should be removed and included in their respective View files
    // "exclusive-content-form": "libs/exclusive-content-form"

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
    // "backbone.wreqr":{
    //   "deps": ["backbone"]
    // },
    // "backbone.babysitter":{
    //   "deps": ["backbone"]
    // },
  }

});




// $(window).load(function(){

//   console.log(AppRouter, AppController);
//   ParksApp.start();
//   console.log("test");

// });