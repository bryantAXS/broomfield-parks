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
      general_directions: "",
      facilities: "",
      gallery_images: null,
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

      this.bind("change:gallery_images", this.setGalleryImages);
      this.trigger("change:gallery_images");
    },

    setSafeParkName: function(){
      this.set("safe_place_name", App.getFriendlyString(this.get("place_name")));
    },

    setGalleryImages: function(){

      if(this.get("gallery_images") === null || typeof this.get("gallery_images") === "object"){ return; }

      var imagesArray = [];
      var images = this.get("gallery_images").split("|");
      _.each(images, function(image){
        imagesArray.push(image.trim());
      });

      this.set("gallery_images", imagesArray);

    },

    fetch: function(){

      var self = this;

      return $.ajax("http://test.broomfield.org/arcgis/rest/services/Parks/FindAPark/MapServer/0/query", {
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