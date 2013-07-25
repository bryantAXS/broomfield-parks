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
      if(this.has_closed !== undefined){
        this.has_closed.done(function(){
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

      if(view.el.id === "park-detail-layout-container"){

        // if we're about to show the park detail page, let's transition that in

        this.$el.append(view.el);
        this.$el.css({
          scale: 0,
          opacity: 0
        });
        this.$el.transition({
          scale: 1,
          opacity: 1
        }, function(){
          App.vent.trigger("page:opened");
        });

      }else{
        this.$el.append(view.el);
        App.vent.trigger("page:opened");
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

      //create a callback used to determine when the new view is added to the screen
      this.has_closed = $.Deferred();

      // determining which direction we should move
      var xPos = "100%";

      // this is where the transition happens
      this.$el.transition({
        x: xPos,
        opacity: 0
      }, function(){
        self.has_closed.resolve();
        self.closeView(view);
        self.$el.css({
          translate: [0,0],
          opacity:1
        });
      });

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

    }

  });

  return TransitioningRegion;

});