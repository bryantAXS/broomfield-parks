/* global App: false */

define([
  "jquery",
  "underscore",
  "backbone",
  "marionette"
], function($, _, Backbone, Marionette){

  var StartLayout = Backbone.Marionette.Layout.extend({
    template: "#start-layout-template"
  });

  return StartLayout;

});