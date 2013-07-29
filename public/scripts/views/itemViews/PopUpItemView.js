/* global App: false */

define([
  "jquery",
  "underscore",
  "backbone",
  "marionette",
], function($, _, Backbone, Marionette){

  var PopUpItemView = Backbone.Marionette.ItemView.extend({

    template: "#popup-item-view-template",

    className: "map-popup",

    events: {
      "click .get-directions": "getDirections"
    },

    initialize: function(){

      this.map = this.options.map;

    },

  });

  return PopUpItemView;

});