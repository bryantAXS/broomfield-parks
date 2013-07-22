console.log(Backbone, Marionette, AppRouter, AppController);
var ParksApp = (function(Backbone, Marionette, AppRouter, AppController){
  "use strict";

  var App = new Marionette.Application();

  App.addRegions({
    searchRegion: "#search-region-container",
    contentRegion: "#content-region-container",
    mapRegion: "#map-region-container"
  });

  App.on("initialize:after", function(){

    console.log(AppRouter);

    App.AppRouter = new AppRouter();

    if (Backbone.history){
      Backbone.history.start();
    }

  });

  return App;

})(Backbone, Marionette, AppRouter, AppController);

