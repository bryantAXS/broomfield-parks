/* global App: false */

define([
  "jquery",
  "underscore",
  "backbone",
  "marionette",
  "transit"
], function($, _, Backbone, Marionette, Transit){

  var SearchBarLayout = Backbone.Marionette.Layout.extend({

    template: "#search-bar-layout-template",

    ui: {
      //container
      searchBarContainer: ".search-bar-container",
      searchBarLeftContainer: ".search-bar-left-container",
      searchBarRightContainer: ".search-bar-right-container",

      //search controls
      searchButtonContainer: "#search-button-container",
      searchButton: "#search-button",
      clearSearchButton: "#clear-search-button",

      //search options controls
      gotoMapButton: "#goto-map-button",
      mapOptionsButton: "#map-options-button",

      //search options container
      mapOptionsContainer: ".map-options-container"
    },

    events: {
      "click #map-options-button": "toggleMapOptions"
    },

    initialize: function(){

      this.animationSpeed = 350;

    },

    toggleMapOptions: function(){

      if(this.ui.searchBarContainer.hasClass("is-open")){
        this.closeMapOptions();
      }else{
        this.openMapOptions();
      }

    },

    closeMapOptions: function(){

      var self = this;

      this.ui.searchBarLeftContainer.transition({
        width: 1020
      }, this.animationSpeed);

      this.ui.searchBarRightContainer.transition({
        width:150
      }, this.animationSpeed);

      this.ui.mapOptionsContainer.transition({
        width: 0
      }, this.animationSpeed, function(){
        self.ui.searchBarContainer.removeClass("is-open");
      });

    },

    openMapOptions: function(){

      var self = this;

      this.ui.searchBarLeftContainer.transition({
        width: 595
      }, this.animationSpeed);

      this.ui.searchBarRightContainer.transition({
        width:575
      }, this.animationSpeed);

      this.ui.mapOptionsContainer.transition({
        width: 423
      }, this.animationSpeed, function(){
        self.ui.searchBarContainer.addClass("is-open");
      });

    }

  });

  return SearchBarLayout;

});