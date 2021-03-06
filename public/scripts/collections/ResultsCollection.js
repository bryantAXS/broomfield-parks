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

    /**
     * Method used to get search results
     * @param  {string} searchTerm The terms we are searching
     * @param  {string} searchType The type of search we want to perform (currently inoperable)
     * @return {Deferred}
     */
    search: function(searchTerm, searchType){

      var self = this;

      self.comparator = function(model){
        return model.get("score");
      };

      // older test api
      // http://test.broomfield.org/arcgis/rest/services/Parks/ParkSearch/GeocodeServer/findAddressCandidates

      return $.ajax("http://gis1.broomfield.org/arcgis/rest/services/Parks/ParkSearch/GeocodeServer/findAddressCandidates", {
        data: {
          PlaceName: searchTerm,
          outFields: "*",
          outSR: 4326,
          f: "json"
        },
        type:"POST",
        dataType: "jsonp",
        success: function(data){

          self.reset();

          if(!data.hasOwnProperty("candidates")){
            self.trigger("noresults");
            return;
          }else if(data.candidates.length === 0){
            self.trigger("noresults");
            return;
          }

          $.each(data.candidates, function(i, result){

            var id = Number(result.attributes.City);
            var model = self.matchResultToModel(id);
            model.set("score", result.attributes.Score);
            self.add(model);

          });

        },
        error: function(jqXHR, textStatus, errorThrown){
          console.log("There was an error performing a search for: " + searchTerm);
        }
      });


    },

    /**
     * Gets all parks from the api
     * @return {Deferred}
     */
    all: function(){

      var self = this;

      self.comparator = function(model){
        return model.get("place_name");
      };

      // older test api
      // http://test.broomfield.org/arcgis/rest/services/Parks/FindAPark/MapServer/0/query

      // an example request mostly for testing
      // http://gis1.broomfield.org/arcgis/rest/services/Parks/FindAPark/MapServer/0/query?f=json&outSR=4326&outFields='*'&where='1=1'

      return $.ajax("http://gis1.broomfield.org/arcgis/rest/services/Parks/FindAPark/MapServer/0/query", {
        data: {
          f: 'json',
          outSR: 4326,
          outFields: "*",
          where: "1=1"
        },
        type:"POST",
        dataType: "jsonp",
        success: function(data){
          self.set(self.parseAllResults(data));
        },
        error: function(jqXHR, textStatus, errorThrown){
          console.log("There was an error fetching all parks.");
        }
      });

    },

    /**
     * Gets all parks hard coded in the results array, which should be
     * shown in the guide
     * @return {Deferred}
     */
    guide: function(){

      var self = this;
      var done = new $.Deferred();

      self.comparator = function(model){
        return model.get("place_name");
      };

      var results = [
        235681, // broomfield country commons
        235685, //community park
        235690, // industrial park
        235682, // northmoor park
        235675, // anthem park
        235688, // east interlocken park
      ];

      $.each(results, function(i, id){

        var model = self.matchResultToModel(id);
        self.add(model);

        if(i === results.length - 1){
          done.resolve();
        }

      });

      return done;

    },

    /**
     * Given a park id, it returns the associated model from the
     * All Parks Collection
     * @param  {int} id   park id
     * @return {model}    Park model
     */
    matchResultToModel: function(id){

      var model = App.allParksCollection.where({
        gis_id: id
      })[0];

      return model;

    },

    /**
     * Parses the results from a .all() call, and turns them into an array of models
     * @param  {object} data data returned from the .all() ajax call
     * @return {array}  an array of Park Models
     */
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

    },

    /**
     * returns an array of amenities from all parks in the collection
     * @return {array} an array of amenities
     */
    getAmenities: function(){

      var amenities = [];

      $.each(this.pluck("facilities"), function(i, facString){

        if(facString === null){
          return;
        }

        var facArr = facString.split(",");

        $.each(facArr, function(j, fac){

          fac = $.trim(fac);

          if(fac.indexOf("and") === 0){
            fac = fac.replace("and ", "");
          }

          facArr[j] = fac;

        });

        amenities = $.merge(amenities, facArr);

      });

      return _.uniq(amenities);

    },

    /**
     * Getting an array of park names
     * @return {array} an array of park names
     */
    getParkNames: function(){

      return this.pluck("place_name");
    }

  });

  return ResultsCollection;

});