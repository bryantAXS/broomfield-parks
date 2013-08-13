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
      previousButton: "#park-detail-gallery-left"
    },

    events: {
      "click #park-detail-gallery-right": "showNextImage",
      "click #park-detail-gallery-left": "showPreviousImage",
      "click .close": "closeView",
      "click .map-it-button": "showOnMap"
    },

    initialize: function(){

      var self = this;

      this.model.bind("change", this.render);

      // sometimes our model data isn't quite loaded fast enough
      setTimeout(function(){
        self.initMarker();
      }, 100);

    },

    initMarker: function(){

      var self = this;
      App.mapLayout.showSinglePark(self.model);

    },

    onRender: function(){

      var self = this;
      self.initGallery();

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

      var cb1 = function(){
        self.ui.galleryContainer.backstretch(self.getGalleryImages(), {
          duration: 20000,
          fade: 750
        });
      };
      setTimeout(cb1, 50);



      // hacky implementation for a loading issue
      var cb2 = function(){
        self.ui.galleryContainer.backstretch("show", 0);
      };
      setTimeout(cb2, 500);

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