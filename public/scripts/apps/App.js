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
  "spin",
  "purl"
], function($, _, Backbone, Marionette, Router, MapLayout, SearchBarLayout, TransitioningRegion, ResultsCollection, Spinner, Purl){

  var App = new Backbone.Marionette.Application();

  /**
   * Is the URI indicidive of a search
   * @return {boolean} are we searching?
   */
  App.areSearching = function(){

    var url = $.url();

    if(url.attr("path").indexOf("search") > -1){
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

    var url = $.url();
    return decodeURIComponent(url.attr("path").split("/")[2]);
  };


  /**
   * Activate the map and hide whatever content view that is currently in place
   * @return {void}
   */
  App.activateMap = function(params){

    // extending some options
    var options = {
      activateMapButton: false
    };
    $.extend(options, params);

    if(options.activateMapButton){
      App.searchBarLayout.activateMapButton();
    }

    App.closeContentLayout();
    App.mapLayout.activate();
  };


  /**
   * Deactivate the map view and show the content view we were previously looking at
   * @param  {view} showPreviousLayout previous view we were looking at
   * @return {void}
   */
  App.deactivateMap = function(params){

    // extending some options
    var options = {
      showPreviousLayout: false
    };
    $.extend(options, params);


    if(this.previousContentLayout !== undefined && options.showPreviousLayout){
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

    // when we were loading a cached view (this.previousContentLayout) our evenst
    // wre being unbound on the closing of the view initially, and we need to rebind them
    // when the view is re-populated.  we do that below the showing
    var isClosed = view.isClosed;

    App.contentRegion.show(view);

    // second part of the rebinding of the events mentioned above.
    if(isClosed === true){
      view.delegateEvents();
    }

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


  App.initSpinner = function(){

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
    App.spinner = new Spinner(opts).spin(target);

  };

  /**
   * Starting up our Router
   * @return {void}
   */
  App.on("start", function(){

    var self = this;

    App.initSpinner();

    this.allParksCollection = new ResultsCollection(allParksJSON);

    // On the intial load we want to create our Map and Searchbar Layouts
    self.mapLayout = new MapLayout();
    App.mapRegion.show(self.mapLayout);


    var arrayOfThingsToWaitForBeforeStartingRouting = [
      this.mapLayout.$mapLoaded
    ];

    // There are a few things we need to wait for, before we start routing
    $.when.apply($, arrayOfThingsToWaitForBeforeStartingRouting).done(function () {

      self.searchBarLayout = new SearchBarLayout();
      App.searchRegion.show(self.searchBarLayout);

      App.Router = new Router();
      App.vent.trigger("routing:started");

      App.spinner.stop();

    });

  });

  return App;

});

