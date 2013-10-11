/* global App: false */

define([
  "jquery",
  "underscore",
  "backbone",
  "marionette",
  "lazyload",
  "collections/ResultsCollection",
  "views/collectionViews/ResultsCollectionView"
], function($, _, Backbone, Marionette, Lazy, ResultsCollection, ResultsCollectionView){

  var ResultsLayout = Backbone.Marionette.Layout.extend({

    template: "#results-layout-template",

    id: "results-layout-container",

    regions: {
      resultsContainer: "#results-container"
    },

    ui: {
      title: ".results-title"
    },

    noResultsText: "Sorry, we couldn't find any parks matching your search.",

    initialize: function(){

      var self = this;

      //creating our collection and setting a few events
      this.initCollection();

      var callback;

      if(this.options.searchTerm === "guide"){
        callback = this.initGuide();
      }else if(this.options.searchTerm === "all"){
        callback = this.initAll();
      }else{
        callback = this.initSearch();
      }

      // adjusting our map -- waiting a few seconds to help performance
      // and experience
      callback.done(function(){
        setTimeout(function(){
          App.mapLayout.showResults(self.resultsCollection);
        }, 2000);
      });

      // showing the actual results view
      this.resultsCollectionView = new ResultsCollectionView({
        isGuideTrigger: App.getSearchTerm() === "guide" || App.getSearchTerm() === "all" ? true : false,
        collection: this.resultsCollection
      });

    },

    initCollection: function(){

      var self = this;
      this.resultsCollection = new ResultsCollection();

      this.resultsCollection.on("noresults", function(){
        self.setTitle(self.noResultsText);
      });

      this.resultsCollection.on("change", function(){
        if(self.resultsCollection.length == 0){
          self.setTitle(self.noResultsText);
        }
      });

    },

    onRender: function(){

      var self = this;

      this.setTitle();
      this.resultsContainer.show(this.resultsCollectionView);
      App.vent.trigger("searchBar:populateFromURL");

    },

    initGuide: function(){
      return this.resultsCollection.guide();
    },

    initAll: function(){
      return this.resultsCollection.all();
    },

    initSearch: function(){
      return this.resultsCollection.search(this.options.searchTerm);
    },

    setTitle: function(title){

      var term = App.getSearchTerm();

      if(term === "guide"){
        this.ui.title.html("You're getting started! Here are a few recomendations.");
      }else if(term === "all"){
        this.ui.title.html("Here's a list of all our parks.");
      }else if(title !== undefined){
        this.ui.title.html(title);
      }else{
        this.ui.title.html("The following results best matched your search.");
      }

    }

  });

  return ResultsLayout;

});