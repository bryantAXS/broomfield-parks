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
      "click .close": "closeView"
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

      galleryImages = [
        "/images/placeholder-detail-gallery-1.png",
        "/images/placeholder-detail-gallery-2.png"
      ];

      return galleryImages;

    },

    initGallery: function(){

      var self = this;

      this.ui.galleryContainer.backstretch(this.getGalleryImages(), {
        duration: 20000,
        fade: 750
      });

      // hacky implementation for a loading issue
      var cb = function(){
        self.ui.galleryContainer.backstretch("show", 0);
      };
      setTimeout(cb, 500);

    },

    showNextImage: function(){
      this.ui.galleryContainer.backstretch("next");
    },

    showPreviousImage: function(){
      this.ui.galleryContainer.backstretch("prev");
    },

    closeView: function(){
      App.Router.back();
    }

  });

  return ParkDetailItemView;

});