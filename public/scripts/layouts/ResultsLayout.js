/* global App: false */

define([
  "jquery",
  "underscore",
  "backbone",
  "marionette",
  "lazyload",
  "collections/ResultsCollection",
  "views/collectionViews/ResultsCollectionView"
], function($, _, Backbone, Marionette, Lazy, ResultsCollection, ResultsCollectionView){

  var ResultsLayout = Backbone.Marionette.Layout.extend({

    template: "#results-layout-template",

    id: "results-layout-container",

    regions: {
      resultsContainer: "#results-container"
    },

    initialize: function(){

      this.resultsCollection = new ResultsCollection([{},{},{},{},{},{},{},{}]);

      this.resultsCollectionView = new ResultsCollectionView({
        collection: this.resultsCollection
      });

    },

    onRender: function(){

      var self = this;
      this.resultsContainer.show(this.resultsCollectionView);

    }

  });

  return ResultsLayout;

});