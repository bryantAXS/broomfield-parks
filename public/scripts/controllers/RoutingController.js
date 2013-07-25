/* global App: false */

define([
  "jquery",
  "underscore",
  "backbone",
  "marionette",
  "layouts/StartLayout",
  "layouts/ResultsLayout",
  "layouts/ParkDetailLayout"
], function($, _, Backbone, Marionette, StartLayout, ResultsLayout, ParkDetailLayout){

  var RoutingController = {

    /**
     * Our default "index" route
     * example: parksapp.com/
     * @return {void}
     */
    index: function(){
      this.showStart();
    },


    /**
     * Our /search route
     * @return {void} [description]
     */
    search: function(searchTerm){
      this.showResults(searchTerm);
    },


    /**
     * Our /park route
     * @return {void}
     */
    park: function(parkName){
      this.showPark(parkName);
    },


    /**
     * Showing the Start page
     * @return {[type]} [description]
     */
    showStart: function(){

      var startLayout = new StartLayout();
      App.contentRegion.show(startLayout);

    },


    /**
     * Showing the search results page
     * @return {void}
     */
    showResults: function(searchTerm){

      var resultsLayout = new ResultsLayout({
      });
      App.contentRegion.show(resultsLayout);

    },


    /**
     * Showing the actual park detail layout
     * @param  {string} parkName the name of the park
     * @return {void}
     */
    showPark: function(parkName){

      var parkDetailLayout = new ParkDetailLayout({
      });
      App.contentRegion.show(parkDetailLayout);

    }

  };

  return RoutingController;

});