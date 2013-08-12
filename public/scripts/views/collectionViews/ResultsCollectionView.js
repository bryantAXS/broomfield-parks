/* global App: false */

define([
  "jquery",
  "underscore",
  "backbone",
  "marionette",
  "views/itemViews/ResultItemView",
  "views/itemViews/DirectToMapItemView"
], function($, _, Backbone, Marionette, ResultItemView, DirectToMapItemView){

  var ResultsCollectionView = Backbone.Marionette.CollectionView.extend({

    itemView: ResultItemView,

    initialize: function(){

      // binding a scroll event to the window
      _.bindAll(this, 'onScroll');
      $(window).scroll(this.onScroll);

    },

    onClose: function(){
      this.$el.find(".direct-to-map").parent().remove();
    },

    onRender: function(){

      var self = this;

      if(this.options.isGuideTrigger){
        if(!self.directToMapRendered()){
          this.addDirectToMapItem();
        }
      }

    },

    directToMapRendered: function(){
      return this.$el.find(".direct-to-map").length;
    },

    onScroll: function(){

      // fade in our itemViews
      this.children.each(function(itemView){
        itemView.fadeIn();
      });

      if(this.options.isGuideTrigger){
        this.directToMapItemView.fadeIn();
      }

    },

    addDirectToMapItem: function(){

      this.directToMapItemView = new DirectToMapItemView();
      this.$el.append(this.directToMapItemView.render().el);

    }

  });

  return ResultsCollectionView;

});