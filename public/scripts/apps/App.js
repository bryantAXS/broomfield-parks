define([
  'jquery',
  'underscore',
  'backbone',
  "marionette",
  "routers/Router",
  "layouts/MapLayout",
  "layouts/SearchBarLayout",
  "regions/TransitioningRegion",
  "collections/ResultsCollection",
  "spin"
], function($, _, Backbone, Marionette, Router, MapLayout, SearchBarLayout, TransitioningRegion, ResultsCollection, Spinner){

  var App = new Backbone.Marionette.Application();

  /**
   * Is the URI indicidive of a search
   * @return {boolean} are we searching?
   */
  App.areSearching = function(){
    if(Backbone.history.fragment.indexOf("search") > -1){
      return true;
    }else{
      return false;
    }
  };


  /**
   * Getting the search param from the URI
   * @return {string} search term
   */
  App.getSearchTerm = function(){
    return decodeURIComponent(Backbone.history.fragment.split("/")[1]);
  };


  /**
   * Activate the map and hide whatever content view that is currently in place
   * @return {void}
   */
  App.activateMap = function(){
    App.closeContentLayout();
    App.mapLayout.activate();
  };


  /**
   * Deactivate the map view and show the content view we were previously looking at
   * @param  {view} showPreviousLayout previous view we were looking at
   * @return {void}
   */
  App.deactivateMap = function(showPreviousLayout){

    showPreviousLayout = showPreviousLayout === true ? true : false;

    if(this.previousContentLayout !== undefined && showPreviousLayout){
      App.showContentLayout(this.previousContentLayout);
    }

    App.mapLayout.deactivate();
    App.searchBarLayout.ui.gotoMapButton.removeClass("is-active");

  };


  /**
   * Adding a view to the content region
   * @param  {view} view the view to show
   * @return {void}
   */
  App.showContentLayout = function(view){
    this.currentContentLayout = view;
    App.contentRegion.show(view);
  };


  /**
   * Closing a content view
   * @return {void}
   */
  App.closeContentLayout = function(){
    this.previousContentLayout = this.currentContentLayout;
    App.contentRegion.close();
  };


  /**
   * On App start, we create a collection containing all parks used for a few things in the app.
   * 1. As a cache for the park detail views
   * 2. To display map points on the map layout
   * - We also are creating a deferred variable that tells the map layer it's ok to display our points
   *   on the map.  Note: we use an anonymous function to return the actual collection, and not just a function.
   * @return {void}
   */
  App.allParksCollection = (function(){
    var allParksCollection = new ResultsCollection();
    App.allParksCollectionLoaded = allParksCollection.all();
    return allParksCollection;
  })();


  /**
   * Getting a seo and uri friendly title.  Used primarily for the park name on the park detail view
   * ie: park/park-name-goes-here
   * @param  {string} string title to encode
   * @return {string}        friendlied string
   */
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

  App.on("start", function(){

    var opts = {
      lines: 13, // The number of lines to draw
      length: 10, // The length of each line
      width: 4, // The line thickness
      radius: 10, // The radius of the inner circle
      corners: .8, // Corner roundness (0..1)
      color: '#000', // #rgb or #rrggbb
      trail: 60, // Afterglow percentage
      hwaccel: true, // Whether to use hardware acceleration
      className: "spinner",
    };
    var target = $("html").get(0);
    //var spinner = new Spinner(opts).spin(target);

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

