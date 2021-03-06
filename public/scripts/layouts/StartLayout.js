/* global App: false */

define([
  "jquery",
  "underscore",
  "backbone",
  "marionette"
], function($, _, Backbone, Marionette){

  var StartLayout = Backbone.Marionette.Layout.extend({

    template: "#start-layout-template",

    id: "start-layout-container",

    ui:{
      guideTrigger: "#guide-trigger",
      allTrigger: "#all-trigger"
    },

    events: {
      "click #guide-trigger": "triggerGuide",
      "click #all-trigger": "triggerAll"
    },

    initialize: function(){

      // Show all parks on the map
      setTimeout(function(){
        App.mapLayout.showAllParks();
      }, 1000);

    },

    triggerGuide: function(){
      App.vent.trigger("searchbar:search:guide");
    },

    triggerAll: function(){
      App.vent.trigger("searchbar:search:all");
    }

  });

  return StartLayout;

});