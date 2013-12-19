/* global App: false */

define([
  "jquery",
  "underscore",
  "backbone",
  "marionette",
  "controllers/RoutingController"
], function($, _, Backbone, Marionette, RoutingController){

  var Router = Backbone.Marionette.AppRouter.extend({

    initialize: function() {
      this.routesHit = 0;

      // Fires each time a route is site
      Backbone.history.on('route', function(){

        // This counter helps us keep track of our history -- used in various hide/close/open behavior patterns
        this.routesHit++;

        // we only want this to fire after our initial Map and SearchBar layouts have been rendered
        App.deactivateMap();

      }, this);
    },

    back: function() {
      if(this.routesHit > 1) {
        window.history.back();
      } else {
        this.navigate('/', {trigger:true, replace:true});
      }
    },

    appRoutes: {

      // Going back to the Events Listing page
      "": "index",
      "search/:searchTerm": "search",
      "park/:parkName": "park"

    },

    controller: RoutingController

  });

  return Router;

});