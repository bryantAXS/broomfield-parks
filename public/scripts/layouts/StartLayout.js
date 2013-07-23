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

    triggerGuide: function(){
      console.log("trigger guide");
      App.vent.trigger("search:guide");
    },

    triggerAll: function(){
      console.log("trigger all");
      App.vent.trigger("search:all");
    }

  });

  return StartLayout;

});