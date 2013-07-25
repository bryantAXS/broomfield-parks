/* global App: false */

define([
  "jquery",
  "underscore",
  "backbone",
  "marionette",
  "backstretch",
], function($, _, Backbone, Marionette, Backstretch){

  var MapLayout = Backbone.Marionette.Layout.extend({

    template: "#map-layout-template",

    id: "map-layout-container",

    onRender: function(){
      // ESRI Stuff will eventually go here
      //this.$el.backstretch("/images/placeholder-map.jpg");
    }

  });

  return MapLayout;

});