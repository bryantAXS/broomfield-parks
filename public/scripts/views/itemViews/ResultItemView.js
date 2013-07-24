/* global App: false */

define([
  "jquery",
  "underscore",
  "backbone",
  "marionette"
], function($, _, Backbone, Marionette){

  var ResultItemView = Backbone.Marionette.ItemView.extend({

    template: "#result-item-view-template",

    className: "columns large-4",

    onRender: function(){
      var $lazy = this.$el.find(".lazy");
      $lazy.lazyload({
        effect: "fadeIn",
        event: "show"
      });
      $lazy.delay(500).trigger("show");
    }

  });

  return ResultItemView;

});