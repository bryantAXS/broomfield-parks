/* global App: false */

define([
  "jquery",
  "underscore",
  "backbone",
  "marionette",
  "views/itemViews/ResultItemView"
], function($, _, Backbone, Marionette, ResultItemView){

  var ResultsCollectionView = Backbone.Marionette.CollectionView.extend({

    itemView: ResultItemView

  });

  return ResultsCollectionView;

});