/* global App: false */

define([
  "jquery",
  "underscore",
  "backbone",
  "marionette",
  "models/ParkModel"
], function($, _, Backbone, Marionette, ParkModel){

  var ResultsCollection = Backbone.Collection.extend({

    model: ParkModel

  });

  return ResultsCollection;

});