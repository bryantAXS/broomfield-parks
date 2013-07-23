/* global define: false */
/* global require: false */
/* global log: false */


// Setting up require.js paths
require.config( {

  baseUrl: "/assets/scripts",
  urlArgs: "bust=" +  (new Date()).getTime(),
  paths:{

    // Dependencies
    "jquery": "vendor/jquery",
    "underscore": "vendor/underscore",

    "backbone": "vendor/backbone",
    "backbone.wreqr": "vendor/backbone.wreqr",
    "backbone.babysitter": "vendor/backbone.babysitter",
    "backbone-fetch-cache": "vendor/backbone-fetch-cache",
    "marionette": "vendor/marionette",

    "add2home": "vendor/add2home",
    "detectmobile": "vendor/detectmobile",
    "date": "vendor/date",
    "endlessscroll": "vendor/jquery-endlessscroll",
    "fancybox": "vendor/fancybox",
    "fastclick": "vendor/fastclick",
    "jquery-dropdown": "vendor/jquery-dropdown",
    'jquery-transit': "vendor/jquery-transit",
    'jquery-jpanelmenu': "vendor/jquery-jpanelmenu",
    "moment": "vendor/moment",
    "transitions": "vendor/jquery-page-transitions",
    "log": "vendor/log",
    "backstretch": "vendor/backstretch",
    "gauge": "vendor/gauge",

    // FIXME: These should be removed and included in their respective View files
    "exclusive-content-form": "libs/exclusive-content-form"

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
    "jquery-dropdown":{
      "deps": ["jquery"]
    },
    "jquery-transit":{
      "deps": ["jquery"]
    },
    "jquery-jpanelmenu":{
      "deps": ["jquery"]
    },
    "detectmobile":{
      "deps": ["jquery"]
    },
    "gauge":{
      "exports": "Gauge"
    }
  }

});


// Hiding the scroll bar
window.addEventListener("load",function() {
  // Set a timeout...
  setTimeout(function(){
    // Hide the address bar!
    window.scrollTo(0, 1);
  }, 0);
});


require(["apps/CrowdnoizeApp"], function(CrowdnoizeApp){

  // Fixes a click delay on the iphone
  window.addEventListener('load', function() {
    new FastClick(document.body);
  }, false);

  window.App = CrowdnoizeApp;
  App.start();

});


$(window).load(function(){

  console.log(AppRouter, AppController);
  ParksApp.start();
  console.log("test");

});