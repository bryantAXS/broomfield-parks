/* global App: false */

define([
  "jquery",
  "underscore",
  "backbone",
  "marionette",
], function($, _, Backbone, Marionette){

  var ParkModel = Backbone.Model.extend({

    defaults: {
      name: "Park Name",
      amenities: [
        { name: "amenity 1" },
        { name: "amenity 2" },
        { name: "amenity 3" },
        { name: "amenity 4" }
      ]
    }

  });

  return ParkModel;

});