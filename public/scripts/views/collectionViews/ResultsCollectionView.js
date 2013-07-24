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

    onScroll: function(){

      console.log("scrolling");

      // fade in our itemViews
      this.children.each(function(itemView){
        itemView.fadeIn();
      });

    }

  });

  return ResultsCollectionView;

});