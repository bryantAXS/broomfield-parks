/* global App: false */

define([
  "jquery",
  "underscore",
  "backbone",
  "marionette",
  "backstretch",
  "esri-leaflet"
], function($, _, Backbone, Marionette, Backstretch, Leaflet){

  var MapLayout = Backbone.Marionette.Layout.extend({

    template: "#map-layout-template",

    id: "map-layout-container",

    onRender: function(){

      // ESRI Stuff will eventually go here
      //this.$el.backstretch("/images/placeholder-map.jpg");
      var self = this;
      setTimeout(function(){ self.initMap(); }, 50);

    },

    initMap: function(){

      L.Icon.Default.imagePath = '/images';

      var map = L.map(this.el.id, {
        center: [39.920541,-105.08665],
        zoom: 12
      });

      // ArcGIS Online Basemaps - Streets, Topographic, Gray, GrayLabels, Oceans, NationalGeographic, Imagery, ImageryLabels
      L.esri.basemapLayer("Streets").addTo(map);

      function onLocationFound(e) {
        var radius = e.accuracy / 2;
        L.marker(e.latlng).addTo(map).bindPopup("You are within " + radius + " meters from this point").openPopup();
        L.circle(e.latlng, radius).addTo(map);
      }

      function onLocationError(e) {
        alert(e.message);
      }

      // map.on('locationfound', onLocationFound);
      // map.on('locationerror', onLocationError);
      // map.locate({setView: true, maxZoom: 16});

    },

    activate: function(){
      this.$el.addClass("is-active");
    },

    deactivate: function(){
      this.$el.removeClass("is-active");
    }

  });

  return MapLayout;

});