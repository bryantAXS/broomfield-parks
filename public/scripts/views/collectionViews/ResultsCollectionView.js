/* global App: false */

define([
  "jquery",
  "underscore",
  "backbone",
  "marionette",
  "views/itemViews/ResultItemView"
], function($, _, Backbone, Marionette, ResultItemView){

  var ResultsCollectionView = Backbone.Marionette.CollectionView.extend({

    itemView: ResultItemView,

    initialize: function(){

      // binding a scroll event to the window
      _.bindAll(this, 'onScroll');
      $(window).scroll(this.onScroll);

    },

    onRender: function(){

      if(this.options.isGuideTrigger){
        this.addDirectToMapItem();
      }

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

      var DirectToMapItemView = ResultItemView.extend({
        'template': '#direct-to-map-item-view-template'
      });
      this.directToMapItemView = new DirectToMapItemView();
      this.$el.append(this.directToMapItemView.render().el);

    }

  });

  return ResultsCollectionView;

});