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

      var self = this;

      self.comparator = function(model){
        return model.get("score");
      };

      return $.ajax("http://test.broomfield.org/arcgis/rest/services/Parks/ParkSearch/GeocodeServer/findAddressCandidates", {
        data: {
          PlaceName: searchTerm,
          outFields: "*",
          outSR: 4326,
          f: "json"
        },
        type:"POST",
        dataType: "json",
        success: function(data){

          self.reset();
          $.each(data.candidates, function(i, result){
            self.add(self.matchResultToModel(result));
          });

        },
        error: function(){
          console.log("There was an error performing a search for: " + searchTerm);
        }
      });


    },

    all: function(){

      var self = this;

      self.comparator = function(model){
        return model.get("place_name");
      };

      return $.ajax("http://test.broomfield.org/arcgis/rest/services/Parks/FindAPark/MapServer/0/query", {
        data: {
          f: 'json',
          outSR: 4326,
          outFields: "*",
          where: "1=1"
        },
        type:"POST",
        dataType: "json",
        success: function(data){
          self.set(self.parseAllResults(data));
        },
        error: function(){
          console.log("There was an error fetching all parks.");
        }
      });

    },

    guide: function(){

      return new $.Deferred();

    },

    matchResultToModel: function(result){

      var gisID = Number(result.attributes.City);
      var model = App.allParksCollection.where({
        gis_id: gisID
      })[0];

      model.set({
        "score": result.attributes.Score
      });

      return model;

    },

    parseAllResults: function(data){

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