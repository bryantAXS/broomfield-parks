var AppRouter = (function(Backbone, Marionette){
  "use strict";

  var Router = new Marionette.AppRouter.extend({

    routes: {
      "/": "index"
    }

  });

  return Router;

})(Backbone, Marionette);