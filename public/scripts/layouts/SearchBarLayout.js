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

    id: "search-bar-layout-container",

    ui: {
      //container
      searchBarContainer: ".search-bar-container",
      searchBarLeftContainer: ".search-bar-left-container",
      searchBarRightContainer: ".search-bar-right-container",

      //search controls
      searchButtonContainer: ".search-button-container",
      searchButton: "#search-button",
      clearSearchButton: "#clear-search-button",
      searchField: ".search-text",

      //search options controls
      gotoMapButton: "#goto-map-button",
      mapOptionsButton: "#map-options-button",

      //search options container
      mapOptionsContainer: ".map-options-container"
    },

    events: {
      "click #map-options-button": "toggleMapOptions",
      "submit #search-form": "submitSearch",
      "click #clear-search-button": "clearSearch",
      "focus .search-text": "searchFocused",
      "blur .search-text": "searchBlured"
    },

    initialize: function(){

      var self = this;

      this.animationSpeed = 350;

      App.vent.on("searchbar:search:guide", function(){
        self.searchGuide();
      });

      App.vent.on("searchbar:search:all", function(){
        self.searchAll();
      });

    },

    onRender: function(){

      if(this.areSearching()){
        this.setSearchFieldsSilently(this.getSearchTermFromURL());
      }

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

    },

    submitSearch: function(){
      this.showClearButton();
      return false;
    },

    clearSearch: function(){
      this.ui.searchField.val("");
      this.showSearchButton();
      App.Router.navigate("/", {
        trigger: true
      });
    },

    showClearButton: function(){
      this.ui.searchButtonContainer.addClass("is-searching");
    },

    showSearchButton: function(){
      this.ui.searchButtonContainer.removeClass("is-searching");
    },

    searchFocused: function(){
      this.ui.searchBarContainer.addClass("has-focus");
    },

    searchBlured: function(){
      this.ui.searchBarContainer.removeClass("has-focus");
    },

    searchGuide: function(){
      this.startAutoSearch("guide");
    },

    searchAll: function(){
      this.startAutoSearch("all");
    },

    startAutoSearch: function(searchText){

      var self = this;
      var i = 0;
      var intervalLength = 400;
      var $done = $.Deferred();

      $done.done(function(){
        self.submitSearch();
      });

      this.searchFocused();
      this.ui.searchField.val("");

      for(i = 0; i < searchText.length; i++){
        var letter = searchText.charAt(i);
          setTimeout(
            (function(i, letter, searchText){
              return function(){
                self.setAutoSearchLetter(i, letter, searchText);
                if(i === searchText.length - 1){
                  $done.resolve();
                }
              };
            })(i, letter, searchText)
          , intervalLength * (i + 1));
      }

    },

    setAutoSearchLetter: function(i, letter, searchText){
      var currentValue = this.ui.searchField.val();
      this.ui.searchField.val(currentValue + letter);
    },

    submitSearch: function(){

      var encodedSearchTerm = encodeURIComponent(this.ui.searchField.val());

      App.Router.navigate("search/"+encodedSearchTerm, {
        trigger: true
      });

      this.showClearButton();

      // IMPORTANT -- leave this here so form doesn't submit
      return false;
    },

    setSearchFieldsSilently: function(term){
      this.ui.searchField.val(term);
      this.showClearButton();
    },

    areSearching: function(){
      if(Backbone.history.fragment.indexOf("search") > -1){
        return true;
      }else{
        return false;
      }
    },

    getSearchTermFromURL: function(){
      return decodeURIComponent(Backbone.history.fragment.split("/")[1]);
    }

  });

  return SearchBarLayout;

});