var AppController = (function(Backbone, Marionette){
  "use strict";

  var Controller = new Marionette.Controller.extend({

    index: function(){

      console.log("index method");

    }

  });

  return Controller;

})(Backbone, Marionette);