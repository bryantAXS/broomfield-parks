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
      Backbone.history.on('route', function() { this.routesHit++; }, this);
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