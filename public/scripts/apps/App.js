define([
  'jquery',
  'underscore',
  'backbone',
  "marionette",
  "routers/Router",
  "layouts/MapLayout",
  "layouts/SearchBarLayout",
  "regions/TransitioningRegion",
  "collections/ResultsCollection"
], function($, _, Backbone, Marionette, Router, MapLayout, SearchBarLayout, TransitioningRegion, ResultsCollection){

  var App = new Backbone.Marionette.Application();

  App.areSearching = function(){
    if(Backbone.history.fragment.indexOf("search") > -1){
      return true;
    }else{
      return false;
    }
  };

  App.getSearchTerm = function(){
    return decodeURIComponent(Backbone.history.fragment.split("/")[1]);
  };

  App.activateMap = function(){
    App.closeContentLayout();
    App.mapLayout.activate();
  };

  App.deactivateMap = function(showPreviousLayout){

    showPreviousLayout = showPreviousLayout === true ? true : false;

    if(this.previousContentLayout !== undefined && showPreviousLayout){
      App.showContentLayout(this.previousContentLayout);
    }

    App.mapLayout.deactivate();
    App.searchBarLayout.ui.gotoMapButton.removeClass("is-active");

  };

  App.showContentLayout = function(view){
    this.currentContentLayout = view;
    App.contentRegion.show(view);
  };

  App.closeContentLayout = function(){
    this.previousContentLayout = this.currentContentLayout;
    App.contentRegion.close();
  };

  App.allParksCollection = (function(){
    var allParksCollection = new ResultsCollection();
    allParksCollection.all();
    return allParksCollection;
  })();

  App.getFriendlyString = function(string){
    var cleanString = (string + "").replace(/[^a-zA-Z0-9]+/g, "-");
    return cleanString.slice(0, cleanString.length).toLowerCase();
  };

  /**
   * Adding regions to the app
   */
  App.addRegions({
    searchRegion: "#search-region-container",
    contentRegion: {
      selector: "#content-region-container",
      regionType: TransitioningRegion
    },
    mapRegion: "#map-region-container"
  });

  // We need to know when our Map and SearchBar layouts have been rendered
  App.layoutsRendered = $.Deferred();

  /**
   * Starting our routing
   * @return {void}
   */
  App.vent.on("routing:started", function(){

    var self = this;

    try{
      Backbone.history.start({pushState: true});
    }catch(e){
      Backbone.history.stop();
      Backbone.history.start({pushState: true});
    }

    $(document).unbind("click.hijack");
    $(document).on("click.hijack", "a[href^='/']", function(event){

      var href = $(event.currentTarget).attr('href');
      var passThrough = href.indexOf('sign_out') >= 0;

      if(!passThrough && !event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey){

        event.preventDefault();
        var url = href.replace(/^\//,'').replace('\#\!\/','');
        App.Router.navigate(url, { trigger: true });

        return false;

      }

    });

  });

  /**
   * Starting up our Router
   * @return {void}
   */
  App.on("start", function(){
    App.Router = new Router();
    return App.vent.trigger("routing:started");
  });

  /**
   * Adding our Search Bar and Map layouts to the page
   * @return {void}
   */
  App.on("start", function(){

    this.searchBarLayout = new SearchBarLayout();
    App.searchRegion.show(this.searchBarLayout);

    this.mapLayout = new MapLayout();
    App.mapRegion.show(this.mapLayout);

    // when have officially started routing
    App.layoutsRendered.resolve();
  });

  return App;

});

