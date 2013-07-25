/* global App: false */

define([
  "jquery",
  "underscore",
  "backbone",
  "marionette",
  "viewport-selectors",
  "transit",
], function($, _, Backbone, Marionette, InViewport, Transit){

  var DirectToMapItemView = Backbone.Marionette.ItemView.extend({

    template: "#direct-to-map-item-view-template",

    className: "columns large-4",

    events: {
    },

  });

  return DirectToMapItemView;

});