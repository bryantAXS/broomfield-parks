/* global App: false */

define([
  "jquery",
  "underscore",
  "backbone",
  "marionette",
  "controllers/RoutingController"
], function($, _, Backbone, Marionette, RoutingController){

  var Router = Backbone.Marionette.AppRouter.extend({

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