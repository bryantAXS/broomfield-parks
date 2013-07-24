/* global App: false */

define([
  "jquery",
  "underscore",
  "backbone",
  "marionette",
  "viewport-selectors",
  "transit",
], function($, _, Backbone, Marionette, InViewport, Transit){

  var ParkDetailItemView = Backbone.Marionette.ItemView.extend({

    template: "#park-detail-item-view-template",

    className: "park-detail-container columns large-12"

  });

  return ParkDetailItemView;

});