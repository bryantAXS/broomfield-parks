define([
  'jquery',
  'underscore',
  'backbone',
  "marionette",
  "routers/Router",
  "layouts/MapLayout",
  "layouts/SearchBarLayout",
  "layouts/FeedbackLayout",
  "regions/TransitioningRegion",
  "collections/ResultsCollection",
  "spin",
  "purl"
], function($, _, Backbone, Marionette, Router, MapLayout, SearchBarLayout, FeedbackLayout, TransitioningRegion, ResultsCollection, Spinner, Purl){

  var App = new Backbone.Marionette.Application();

  /**
   * Is the user using Internet Explorer?
   * @return {Boolean}
   */
  App.isIe = function(){
    return $("html").hasClass("ie");
  };

  /**
   * Does this browser support css filters?
   * @return {Boolean}
   */
  App.noCssFilters = function(){
    return this.isIe() || $("html").hasClass("no-cssfilters");
  };

  /**
   * Is the URI indicidive of a search
   * @return {boolean} are we searching?
   */
  App.areSearching = function(){

    var url = $.url();

    var path;

    // compensating for ie
    if($("html").hasClass("history")){
      path = url.attr("path");
    }else{
      path = url.attr("fragment");
    }

    if(path.indexOf("search") > -1){
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

    var path;

    // compensating for ie
    if($("html").hasClass("history")){
      path = url.attr("path").split("/")[2];
    }else{
      path = url.attr("fragment").split("/")[1];
    }

    return decodeURIComponent(path);

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
    mapRegion: "#map-region-container",
    feedbackRegion: "#feedback-region-container"
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
      lines: 7, // The number of lines to draw
      length: 0, // The length of each line
      width: 14, // The line thickness
      radius: 27, // The radius of the inner circle
      corners: 1.0, // Corner roundness (0..1)
      color: '#7ac474', // #rgb or #rrggbb
      trail: 80, // Afterglow percentage
      hwaccel: true, // Whether to use hardware acceleration
      speed: 1.0,
      direction: 1,
      className: "spinner",
    };

    var target = $("html").get(0);
    App.spinner = new Spinner(opts).spin(target);

  };

  App.initFeedbackIcon = function(){

    var self = this;

    var $a = $("<a id='feedback-button' href='javascript:;'><img src='/images/icon-feedback.png' /></a>");
    $("body").append($a);
    $a.on({
      click: function(){
        self.feedbackLayout.toggle();
      }
    })

  };


  App.preloadImages = function(arrayOfImages){

    var promises = [];

    for(var i = 0; i < arrayOfImages.length; i++){
      (function(url, promise) {

        var img = new Image();

        img.onload = function() {
          promise.resolve();
        };

        img.src = url;

      })(arrayOfImages[i], promises[i] = $.Deferred());
    }

    return $.when.apply($, promises);

  }

  /**
   * Starting up our Router
   * @return {void}
   */
  App.on("start", function(){

    var self = this;

    // A global thing that needs to happen for all ajax requests
    $.support.cors = true;

    App.initSpinner();

    this.allParksCollection = new ResultsCollection(allParksJSON);

    // On the intial load we want to create our Map and Searchbar Layouts
    self.mapLayout = new MapLayout();
    App.mapRegion.show(self.mapLayout);

    self.feedbackLayout = new FeedbackLayout();
    App.feedbackRegion.show(self.feedbackLayout);

    var arrayOfThingsToWaitForBeforeStartingRouting = [
      this.mapLayout.$mapLoaded
    ];

    // There are a few things we need to wait for, before we start routing
    $.when.apply($, arrayOfThingsToWaitForBeforeStartingRouting).done(function () {

      self.searchBarLayout = new SearchBarLayout();
      App.searchRegion.show(self.searchBarLayout);

      App.Router = new Router();
      App.vent.trigger("routing:started");

      App.initFeedbackIcon();

      App.spinner.stop();

    });

  });

  return App;

});

