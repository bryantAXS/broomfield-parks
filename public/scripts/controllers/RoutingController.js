/* global App: false */

define([
  "jquery",
  "underscore",
  "backbone",
  "marionette",
  "layouts/StartLayout",
  "layouts/ResultsLayout"
], function($, _, Backbone, Marionette, StartLayout, ResultsLayout){

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
    search: function(){
      this.showResults();
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

    }

  };

  return RoutingController;

});