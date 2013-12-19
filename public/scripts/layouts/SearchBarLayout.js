/* global App: false */

define([
  "jquery",
  "underscore",
  "backbone",
  "marionette",
  "transit",
  "typeahead"
], function($, _, Backbone, Marionette, Transit, Typeahead){

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

      gotoMapButton: "#goto-map-button"
    },

    events: {
      "submit #search-form": "submitSearch",
      "click #clear-search-button": "clearSearchGoHome",
      "focus .search-text": "searchFocused",
      "blur .search-text": "searchBlured",
      "click #goto-map-button": "gotoMap"
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

      App.vent.on("searchBar:reset", function(){
        self.clearSearch();
      });

      App.vent.on("searchBar:populateFromURL", function(){
        self.setSearchFieldsSilently(App.getSearchTerm());
      });

    },

    onRender: function(){

      if(App.areSearching()){
        this.setSearchFieldsSilently(App.getSearchTerm());
      }

      this.initTypeAhead();

    },

    clearSearch: function(){
      this.ui.searchField.val("");
      this.ui.searchField.typeahead('setQuery', "");
      this.showSearchButton();
    },

    clearSearchGoHome: function(){
      this.clearSearch();
      App.Router.navigate("/", {
        trigger: true
      });
      this.ui.searchField.focus();
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

    gotoMap: function(){

      if(this.ui.gotoMapButton.hasClass("is-active")){
        this.deactivateMapButton();
        App.deactivateMap({
          showPreviousLayout: true
        });
      }else{
        this.activateMapButton();
        App.activateMap();
      }

    },

    activateMapButton: function(){
      this.ui.gotoMapButton.addClass("is-active");
    },

    deactivateMapButton: function(){
      this.ui.gotoMapButton.removeClass("is-active");
    },

    initTypeAhead: function(){

      this.ui.searchField.typeahead([
        {
          name: 'amenities',
          local: App.allParksCollection.getAmenities()
        },
        {
          name: 'parks',
          local: App.allParksCollection.getParkNames()
        }
      ]);

    }

  });

  return SearchBarLayout;

});