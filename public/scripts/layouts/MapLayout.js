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

    events: {
      "click .get-directions": "getDirections"
    },


    /**
     * After our view had been rendered
     * @return {void}
     */
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

      var self = this;

      L.Icon.Default.imagePath = '/images';

      this.map = L.map(this.el.id, {
        center: [39.920541,-105.06665],
        zoom: 14
      });

      // ArcGIS Online Basemaps - Streets, Topographic, Gray, GrayLabels, Oceans, NationalGeographic, Imagery, ImageryLabels
      L.esri.basemapLayer("Topographic").addTo(this.map);


      // Event when a popup is opened
      this.map.on("popupopen", function(e){

        // Tracking the popup currently open
        self.currentlyOpenPopup = e.popup;

      });

      // Event bindings for the "locate" event, fired when we detect the users location
      this.map.on('locationfound', function(location){ self.navigateWithLocation(location); });
      this.map.on('locationerror', function(e){ self.navigateWithoutLocation(e); });

    },


    /**
     * Starting the process of drawing markers and popups onto the map
     * @param  {collection} collection a collection of locations
     * @return {void}
     */
    initMarkers: function(collection){
      this.collection = collection;
      this.renderMarkers();
    },


    /**
     * Loops over each park model in the collection and creates a market and popup
     * then adds the market to the map
     * @return {void}
     */
    renderMarkers: function(){

      var self = this;

      _.each(this.collection.models, function(model){

        var latlng = new L.LatLng(model.get("geometry").y, model.get("geometry").x);
        var marker = L.marker(latlng, {
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
        });

        var popupItemView = self.getPopupItemView(model);
        var popup = self.getPopup(popupItemView);
        popup.itemView = popupItemView;

        marker.addTo(self.map).bindPopup(popup);
        model.set("marker", marker);
        model.set("popupItemView", popupItemView);

      });

    },


    /**
     * Creates an ItemView for our popup, which holds some popup specific logic.
     * @param  {model} model ParkModel
     * @return {itemview}       PopupItemView
     */
    getPopupItemView: function(model){
      return new PopUpItemView({
        model: model,
        map: this.map
      });
    },

    /**
     * Create a new popup object and return it
     * @param  {itemView} itemView the popupItemView we've already created
     * @return {popup}
     */
    getPopup: function(itemView){
      return new L.Popup({}).setContent(itemView.render().$el.html());
    },


    /**
     * Event handler when a get directions link is clicked on
     * @return {void}
     */
    getDirections: function(){

      this.map.locate({
        enableHighAccuracy: true,
        setView: false
      });

    },


    /**
     * Sending user to google maps with their location
     * @param  {location object} location geolocation of the users
     * @return {void}
     */
    navigateWithLocation: function(location){

      var startLatLng = {
        lat: location.latitude,
        lng: location.longitude
      };

      var endLatLng = {
        lat: this.currentlyOpenPopup._latlng.lat,
        lng: this.currentlyOpenPopup._latlng.lng
      };

      var link = this.buildDirectionsLink(startLatLng, endLatLng);
      window.location.href = link;

    },


    /**
     * Sending the user to Google maps without knowing their location
     * @param  {error} e Error returned from the this.maps.locate() method
     * @return {void}
     */
    navigateWithoutLocation: function(e){

      var endLatLng = {
        lat: this.currentlyOpenPopup._latlng.lat,
        lng: this.currentlyOpenPopup._latlng.lng
      };

      var link = this.buildMapLink(endLatLng);
      window.location.href = link;

    },


    /**
     * Building a google maps link to give us directions based on the users location
     * @param  {object} startLatLng starting lat lng coords
     * @param  {object} endLatLng   ending lat lng coords
     * @return {string}             link
     */
    buildDirectionsLink: function(startLatLng, endLatLng){

      var link = "http://maps.google.com/maps?";
      link += "f=d&";
      link += "saddr="+startLatLng.lat+","+startLatLng.lng+"&";
      link += "daddr="+endLatLng.lat+","+endLatLng.lng;
      return link;

    },


    /**
     * Create a google maps link (when user location cannot be calculated)
     * @param  {object} endLatLng object with lat and lng coords
     * @return {string}           link
     */
    buildMapLink: function(endLatLng){

      var link = "http://maps.google.com/maps?";
      link += "f=q&";
      link += "q="+endLatLng.lat+","+endLatLng.lng;
      return link;

    },


    /**
     * Activating the Map Layer
     * @return {void}
     */
    activate: function(){
      this.$el.addClass("is-active");
    },


    /**
     * Deactivating the map layer and loading in the previous view
     * @return {void}
     */
    deactivate: function(){
      this.$el.removeClass("is-active");

      if(this.map !== undefined){
        this.map.closePopup();
      }
    }

  });

  return MapLayout;

});