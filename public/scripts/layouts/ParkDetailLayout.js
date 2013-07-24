/* global App: false */

define([
  "jquery",
  "underscore",
  "backbone",
  "marionette",
  "models/ParkModel",
  "views/itemViews/ParkDetailItemView"
], function($, _, Backbone, Marionette, ParkModel, ParkDetailItemView){

  var ParkDetailLayout = Backbone.Marionette.Layout.extend({

    template: "#park-detail-layout-template",

    id: "park-detail-layout-container",

    regions: {
      detailContainer: "#park-detail-item-container"
    },

    onRender: function(){

      this.model = new ParkModel({});
      this.parkDetailItemView = new ParkDetailItemView({
        model: this.model
      });

      this.detailContainer.show(this.parkDetailItemView);

    }

  });

  return ParkDetailLayout;

});