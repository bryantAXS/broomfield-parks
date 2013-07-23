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

    toggleMapOptions: function(){

      if(this.ui.searchBarContainer.hasClass("is-open")){
        this.closeMapOptions();
      }else{
        this.openMapOptions();
      }

    },

    closeMapOptions: function(){

      var self = this;

      this.ui.searchBarRightContainer.transition({
        width:150
      }, 350);

      this.ui.mapOptionsContainer.transition({
        width: 0
      }, 350, function(){
        self.ui.searchBarContainer.removeClass("is-open");
      });

    },

    openMapOptions: function(){

      var self = this;

      this.ui.searchBarRightContainer.transition({
        width:575
      }, 350);

      this.ui.mapOptionsContainer.transition({
        width: 423
      }, 350, function(){
        self.ui.searchBarContainer.addClass("is-open");
      });

    }

  });

  return SearchBarLayout;

});