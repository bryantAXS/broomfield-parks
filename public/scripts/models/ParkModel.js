/* global App: false */

define([
  "jquery",
  "underscore",
  "backbone",
  "marionette",
], function($, _, Backbone, Marionette){

  var ParkModel = Backbone.Model.extend({

    defaults: {
      address: "",
      description: "",
      directions: "DIRECTION PLACEHOLDER",
      facilities: "",
      geometry: null,
      gis_id: null,
      objectid: null,
      operational_hours: "",
      parking_spaces: null,
      place_name: "",
      size: null,
      thumbnail_image: "",
      city: "Broomfield",
      state: "CO",
      safe_place_name: ""
    },

    initialize: function(){
      this.bind("change:place_name", this.setSafeParkName);
      this.trigger("change:place_name");
    },

    setSafeParkName: function(){
      this.set("safe_place_name", App.getFriendlyString(this.get("place_name")));
    },

    fetch: function(){

      var self = this;

      return $.ajax("http://test.broomfield.org/arcgis/rest/services/Parks/FindAParkOrange/MapServer/0/query", {
        data: {
          f: 'json',
          outSR: 4326,
          outFields: "*",
          text: "BRANDYWINE WEST PARK"
        },
        type:"POST",
        dataType: "json",
        success: function(data){
          self.set(self.parseResults(data));
        },
        error: function(){
          console.log("There was an error fetching all parks.");
        }
      });

    },

    parseResults: function(data){

      var park = data.features[0];
      var obj = {};

      _.each(_.keys(park.attributes), function(attribute){
        obj[attribute.toLowerCase()] = park.attributes[attribute];
      });

      obj.geometry = park.geometry;

      return obj;

    }

  });

  return ParkModel;

});