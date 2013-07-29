/* global App: false */

define([
  "jquery",
  "underscore",
  "backbone",
  "marionette",
  "backstretch",
  "esri-leaflet",
  "views/itemViews/PopUpItemView",
], function($, _, Backbone, Marionette, Backstretch, Leaflet, PopUpItemView){

  var MapLayout = Backbone.Marionette.Layout.extend({

    template: "#map-layout-template",

    id: "map-layout-container",

    onRender: function(){

      var self = this;

      // displaying our map -- we're using a timeout becuase of some weird
      // backbone stuff, where the el isn't quite rendered yet and we
      // need to create a short buffer.
      setTimeout(function(){

        self.initMap();
        App.allParksCollectionLoaded.done(function(){
          self.initMarkers(App.allParksCollection);
        });

      }, 50);

    },

    /**
     * Initing our ESRI map
     * @return {void}
     */
    initMap: function(){

      L.Icon.Default.imagePath = '/images';

      this.map = L.map(this.el.id, {
        center: [39.920541,-105.06665],
        zoom: 14
      });

      // ArcGIS Online Basemaps - Streets, Topographic, Gray, GrayLabels, Oceans, NationalGeographic, Imagery, ImageryLabels
      L.esri.basemapLayer("Topographic").addTo(this.map);

      // Adding Dynamic map layers (options are in master.twig)
      // _.each(window.mapoptions.mapConfig.operationalLayers, function(layer){

      //   L.esri.dynamicMapLayer(layer.url, {
      //     opacity: layer.opacity,
      //     visible: layer.visible
      //   }).addTo(map);

      // });

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

    initMarkers: function(collection){
      this.collection = collection;
      this.renderMarkers();
    },

    renderMarkers: function(){

      var self = this;

      _.each(this.collection.models, function(model){

        var latlng = new L.LatLng(model.get("geometry").y, model.get("geometry").x);
        L.marker(latlng, {
          icon: L.icon({
            iconUrl: '/images/icon-pin.png',
            iconRetinaUrl: '/images/icon-pin-2x@2x.png',
            iconSize: [20, 25],
            iconAnchor: [20, 25],
            popupAnchor: [-10, -25],
            // shadowUrl: 'my-icon-shadow.png',
            // shadowRetinaUrl: 'my-icon-shadow@2x.png',
            // shadowSize: [68, 95],
            // shadowAnchor: [22, 94]
          })
        }).addTo(self.map).bindPopup(self.getPopup(model));

      });

    },

    getPopup: function(model){

      var popupItemView = new PopUpItemView({
        model: model
      });

      var popup = new L.Popup({}).setContent(popupItemView.render().$el.html());

      return popup;

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