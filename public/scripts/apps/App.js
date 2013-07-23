define([
  'jquery',
  'underscore',
  'backbone',
  "marionette",
  "routers/Router",
  "layouts/MapLayout",
  "layouts/SearchBarLayout"
], function($, _, Backbone, Marionette, Router, MapLayout, SearchBarLayout){

  var App = new Backbone.Marionette.Application();


  /**
   * Adding regions to the app
   */
  App.addRegions({
    searchRegion: "#search-region-container",
    contentRegion: "#content-region-container",
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
    var searchBarLayout = new SearchBarLayout();
    App.searchRegion.show(searchBarLayout);

    var mapLayout = new MapLayout();
    App.mapRegion.show(mapLayout);
  });

  return App;

});

