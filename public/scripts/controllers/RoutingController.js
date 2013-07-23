/* global App: false */

define([
  "jquery",
  "underscore",
  "backbone",
  "marionette",
  "layouts/StartLayout"
], function($, _, Backbone, Marionette, StartLayout){

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
     * Showing the Start page
     * @return {[type]} [description]
     */
    showStart: function(){

      var startLayout = new StartLayout();
      App.contentRegion.show(startLayout);

    }

  };

  return RoutingController;

});