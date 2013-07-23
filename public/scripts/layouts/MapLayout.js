/* global App: false */

define([
  "jquery",
  "underscore",
  "backbone",
  "marionette"
], function($, _, Backbone, Marionette){

  var MapLayout = Backbone.Marionette.Layout.extend({
    template: "#map-layout-template"
  });

  return MapLayout;

});