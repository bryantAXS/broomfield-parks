/* global App: false */

define([
  "jquery",
  "underscore",
  "backbone",
  "marionette",
  "models/ParkModel"
], function($, _, Backbone, Marionette, ParkModel){

  var ResultsCollection = Backbone.Collection.extend({

    model: ParkModel,

    search: function(searchTerm, searchType){

    },

    all: function(){

      var self = this;

      $.ajax("http://test.broomfield.org/arcgis/rest/services/Parks/FindAParkOrange/MapServer/0/query", {
        data: {
          f: 'json',
          outSR: 4326,
          outFields: "*",
          where: "1=1"
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

    guide: function(){

    },

    parseResults: function(data){

      var arrayOfModels = [];

      _.each(data.features, function(park){

        var obj = {};

        _.each(_.keys(park.attributes), function(attribute){
          obj[attribute.toLowerCase()] = park.attributes[attribute];
        });

        obj.geometry = park.geometry;

        arrayOfModels.push(obj);

      });

      return arrayOfModels;

    }

  });

  return ResultsCollection;

});