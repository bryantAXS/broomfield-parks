/* global App: false */

define([
  "jquery",
  "underscore",
  "backbone",
  "marionette",
  "viewport-selectors",
  "transit",
], function($, _, Backbone, Marionette, InViewport, Transit){

  var ResultItemView = Backbone.Marionette.ItemView.extend({

    template: "#result-item-view-template",

    className: "columns large-4",

    events: {
      "click .result-show-details": "showDetails",
      "click .result-show-pin": "showPin"
    },

    /**
     * Before we render we need to turn them off so we can fade them in
     * @return {void}
     */
    onBeforeRender: function(){
      this.$el.css("opacity", "0");
    },


    /**
     * After they are rendered, run some code.
     * @return {void}
     */
    onRender: function(){

      var self = this;

      // var $lazy = this.$el.find(".lazy");
      // $lazy.lazyload({
      //   effect: "fadeIn",
      //   event: "show"
      // });
      // $lazy.trigger("show");

      // I'm not sure why, but we need to have a callback here
      var cb = function(){
        self.fadeIn();
      };
      setTimeout(cb, 500);

    },


    /**
     * Check to see if they have been faded in already, if not -- fade'em in
     * @return {void}
     */
    fadeIn: function(){

      if(!this.$el.hasClass("faded-in")){
        if(this.isInViewport()){
          this.$el.addClass("faded-in");
          this.$el.transition({
            opacity: 1
          }, 350);
        }
      }

    },


    /**
     * Is the el inside the viewport?
     * @return {boolean} if we are or not
     */
    isInViewport: function(){
      return this.$el.is(":in-viewport(-100)");
    },


    /**
     * Whent he user has clicked the details icon
     * @return {void}
     */
    showDetails: function(){
      App.vent.trigger("searchBar:reset");
    },


    showPin: function(){

      App.mapLayout.showSinglePark(this.model);
      App.activateMap();

    }

  });

  return ResultItemView;

});