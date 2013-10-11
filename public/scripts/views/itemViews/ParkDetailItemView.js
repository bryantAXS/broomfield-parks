/* global App: false */

define([
  "jquery",
  "underscore",
  "backbone",
  "marionette",
  "backstretch",
], function($, _, Backbone, Marionette, Backstretch){

  var ParkDetailItemView = Backbone.Marionette.ItemView.extend({

    template: "#park-detail-item-view-template",

    className: "park-detail-container columns large-12",

    ui: {
      galleryContainer: "#park-detail-gallery-container",
      nextButton: "#park-detail-gallery-right",
      previousButton: "#park-detail-gallery-left",
      loader: ".gallery-loader"
    },

    events: {
      "click #park-detail-gallery-right": "showNextImage",
      "click #park-detail-gallery-left": "showPreviousImage",
      "click .close": "closeView",
      "click .map-it-button": "showOnMap"
    },

    initialize: function(){

      var self = this;

      // Before we init the gallery, we're preloading the images, so we don't have
      // weird delays when backstretch inits.
      //
      // We also have a "pseudoLoad" that mandates at least a 2 second
      // "loading" time, where the loading icon is displayed.  This makes the overall
      // loading process appear a little smoother.

      var loadingPromises = [];
      loadingPromises.push(this.preloadImages());
      loadingPromises.push(this.pseudoLoad());

      // waiting for both promises to be resolved
      $.when.apply($, loadingPromises).done(function(){

        self.initGallery();

        // we're waiting 1 second after the gallery has loaded to
        // reposition the map. Again, something to make the experience
        // a little smoother
        setTimeout(function(){
          App.mapLayout.showSinglePark(self.model);
        }, 1000);

      });

    },

    initMarker: function(){

      var self = this;

    },

    onRender: function(){

      var self = this;
      self.ui.loader.css("display", "block");

    },

    preloadImages: function(){

      var galleryImages = this.getGalleryImages();
      return App.preloadImages(galleryImages);

    },

    pseudoLoad: function(){

      var promise = $.Deferred();

      setTimeout(function(){
        promise.resolve();
      }, 2000);

      return promise;

    },

    onClose: function(){

      this.ui.galleryContainer.backstretch("destroy");

    },

    getGalleryImages: function(){

      var galleryImages = [];

      this.$el.find("img.placeholder").each(function(i, el){
        galleryImages.push($(el).attr("src"));
      });

      return galleryImages;

    },

    initGallery: function(){

      var self = this;

      var galleryImages = this.getGalleryImages();

      if(!galleryImages.length){ return ; }

      self.ui.loader.fadeOut(100);
      self.ui.galleryContainer.backstretch(self.getGalleryImages(), {
        duration: 20000,
        fade: 750
      });

      // hacky implementation for a loading issue
      // var cb2 = function(){
      //   self.ui.galleryContainer.backstretch("show", 0);
      // };
      // setTimeout(cb2, 2500);

    },

    showNextImage: function(){
      this.ui.galleryContainer.backstretch("next");
    },

    showPreviousImage: function(){
      this.ui.galleryContainer.backstretch("prev");
    },

    showOnMap: function(){
      App.activateMap({
        activateMapButton: true
      });
    },

    closeView: function(){
      App.Router.back();
    }

  });

  return ParkDetailItemView;

});