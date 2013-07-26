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

    initialize: function(options){

      this.initParkModel();

    },

    onRender: function(){

      this.parkDetailItemView = new ParkDetailItemView({
        model: this.parkModel
      });

      this.detailContainer.show(this.parkDetailItemView);

    },

    initParkModel: function(){

      this.parkModel = App.allParksCollection.findWhere({
        "safe_place_name": this.options.safeParkName
      });

      if(this.parkModel === undefined){
        this.parkModel = new ParkModel({
          "safe_place_name": this.options.safeParkName
        });
        this.parkModel.fetch();
      }

    }

  });

  return ParkDetailLayout;

});