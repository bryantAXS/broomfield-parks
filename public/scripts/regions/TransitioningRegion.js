/* global App:false */

define([
  "jquery",
  "underscore",
  "backbone",
  "marionette",
  "transit"
  ], function($, _, Backbone, Marionette, $transit) {

  var TransitioningRegion = Backbone.Marionette.Region.extend({


    /**
     * When we're opening a view
     * @param  {object} view the view itself
     * @return {void}
     */
    open:function(view){

      var self = this;

      // check to see if their is an existing view, if so, proceed
      if(this.hasClosed !== undefined){
        this.hasClosed.done(function(){
          self.appendViewAndShow(view);
        });
      }else{
        // if there is no view, we want to just show the new one
        self.appendViewAndShow(view);
      }

    },

    /**
     * Adding the new view to the dom and showing it
     * @param  {view} view the view object
     * @return {void}
     */
    appendViewAndShow: function(view){

      var self = this;

      if(view.el.id === "park-detail-layout-container" && ! App.isIe()){
        this.openSlideFromLeft(view);
      }else{
        this.openNoTransition(view);
      }

    },

    /**
     * We want to close the current view (if their is one), or else just return
     * @return {[type]} [description]
     */
    close: function(){

      var self = this;
      var view = this.currentView;

      // just return if there isn't a curent view or we're closed
      if (!view || view.isClosed){
        return;
      }

      if(view.el.id === "park-detail-layout-container"){
        this.closeSlideToLeft(view);
      }else if(! App.isIe()){
        this.closeSlideToRight(view);
      }else{
        this.closeNoTransition(view);
      }


      // we need to make sure this is deleted right away and
      // not after the callback
      delete this.currentView;

    },

    /**
     * A helper to actualy close and views and remove them from the dom.
     * @param  {[type]} view [description]
     * @return {[type]}      [description]
     */
    closeView: function(view){

      //call 'close' or 'remove', depending on which is found
      if(view.close){
        view.close();
      }else if(view.remove){
        view.remove();
      }

      Backbone.Marionette.triggerMethod.call(this, "close");

    },


    //
    // TRANSITIONS
    //

    openSlideFromLeft: function(view){

      var self = this;

      //create a callback used to determine when the new view is added to the screen
      this.hasOpened = $.Deferred();

      // if we're about to show the park detail page, let's transition that in
      this.$el.append(view.el);
      this.$el.css({
        translate: ["-100%", 0],
        opacity: 0
      });

      this.$el.transition({
        x: 0,
        opacity: 1
      }, function(){
        App.vent.trigger("page:opened");
        self.hasOpened.resolve();
      });

    },

    openNoTransition: function(view){
      this.$el.append(view.el);
      App.vent.trigger("page:opened");
    },

    closeSlideToRight: function(view){

      var self = this;

      //create a callback used to determine when the new view is added to the screen
      this.hasClosed = $.Deferred();

      // determining which direction we should move
      var xPos = "100%";

      // this is where the transition happens
      this.$el.transition({
        x: xPos,
        opacity: 0
      }, function(){

        self.$el.css({
          translate: [0,0],
          opacity:1
        });
        self.closeView(view);

        // this needs to be at the end, so we don't trigger an open animation before ouro final styles are set a few lines above.
        self.hasClosed.resolve();

      });

    },

    closeSlideToLeft: function(view){

      var self = this;

      //create a callback used to determine when the new view is added to the screen
      this.hasClosed = $.Deferred();

      // determining which direction we should move
      var xPos = "-100%";

      // this is where the transition happens
      this.$el.transition({
        x: xPos,
        opacity: 0
      }, function(){

        self.$el.css({
          translate: [0,0],
          opacity:1
        });
        self.closeView(view);

        // this needs to be at the end, so we don't trigger an open animation before ouro final styles are set a few lines above.
        self.hasClosed.resolve();

      });

    },

    closeNoTransition: function(view){

      this.closeView(view);

    }




  });

  return TransitioningRegion;

});