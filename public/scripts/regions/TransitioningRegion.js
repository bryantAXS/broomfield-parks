/* global App:false */

define([
  "jquery",
  "underscore",
  "backbone",
  "marionette",
  "transit"
  ], function($, _, Backbone, Marionette, $transit) {

  var TransitioningRegion = Backbone.Marionette.Region.extend({

    $pagesContainer: $(".pages-container"),

    open:function(view){

      var self = this;

      if(App.traits.isMobile){

        if(this.$closed !== undefined){

          this.$closed.done(function(){
            self._appendViewAndShow(view);
          });

        }else{

          self._appendViewAndShow(view);

        }
      }else{

       self._appendViewAndShow(view);

      }

    },

    _appendViewAndShow: function(view){

      var self = this;

      self.$el.append(view.el);
      App.vent.trigger("page:opened");

    },

    // Close the current view, if there is one. If there is no
    // current view, it does nothing and returns immediately.
    close: function(){

      var self = this;

      var view = this.currentView;
      if (!view || view.isClosed){ return; }

      if(App.traits.isMobile){

        //create a callback used to determine when the new view is added to the screen
        this.$closed = $.Deferred();

        // determining which direction we should move
        var xPos = view.$networkButton !== undefined ? "-100%" : "100%";

        self.$pagesContainer.transition({ x: xPos }, function(){
          self.$closed.resolve();
          self._closeView(view);
          self.$pagesContainer.css({translate: [0,0] });
        });


      }else{
        self._closeView(view);
      }

      //we need to make sure this is deleted right away and not after the callback
      delete this.currentView;

    },

    /**
     * A helper to actualy close and views and remove them from the dom.
     * @param  {[type]} view [description]
     * @return {[type]}      [description]
     */
    _closeView: function(view){

      //call 'close' or 'remove', depending on which is found
      if (view.close) { view.close(); }
      else if (view.remove) { view.remove(); }
      Marionette.triggerMethod.call(this, "close");

    }

  });

  return TransitioningRegion;

});