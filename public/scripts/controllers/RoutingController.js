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
      App.showContentLayout(startLayout);

    },


    /**
     * Showing the search results page
     * @return {void}
     */
    showResults: function(searchTerm){

      var resultsLayout = new ResultsLayout({
        searchTerm: searchTerm
      });
      App.showContentLayout(resultsLayout);

    },


    /**
     * Showing the actual park detail layout
     * @param  {string} safeParkName the name of the park (encoded for the url)
     * @return {void}
     */
    showPark: function(safeParkName){

      var parkDetailLayout = new ParkDetailLayout({
        safeParkName: safeParkName
      });
      App.showContentLayout(parkDetailLayout);

    }

  };

  return RoutingController;

});