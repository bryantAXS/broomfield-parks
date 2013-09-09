/* global App: false */

define([
  "jquery",
  "underscore",
  "backbone",
  "marionette",
  "validate"
], function($, _, Backbone, Marionette, Validate){

  var FeedbackLayout = Backbone.Marionette.Layout.extend({

    template: "#feedback-layout-template",

    id: "feedback-layout-container",

    events: {
      "click .close": "toggle"
    },

    ui: {
      "submitButton": ".button",
      "errorMessage": ".feedback-errors"
    },

    initialize: function(options){
      this.isOpen = false;
      this.isLoading = false;
    },

    onShow: function(){

      var self = this;

      $("#feedback-form").validate({

        debug: true,

        showErrors: function(errorMap, errorList) {

          if(errorList.length == 1){
            self.ui.errorMessage.html(errorList[0].message);
          }else if(errorList.length > 1){
            self.ui.errorMessage.html("All fields are required.");
          }else{
            self.ui.errorMessage.html("");
          }

        },

        submitHandler: function(form){

          if(self.isLoading){
            return false;
          }

          var formData = $(form).serializeArray();
          formData.push({"name": "honey", "value": 918272635437});

          self.enableLoading();

          $.ajax({

            data: formData,
            dataType: "json",
            type: "POST",
            url: "/feedback",
            success: function(data){
              self.disableLoading();
              self.thanksAndClose();
            },
            error: function(){
              self.disableLoading();
              self.showError("There was an error. Plase try again.");
            }

          });

          return false;

        },

        rules: {
          "name": {
            required: true
          },
          "email": {
            required: true,
            email: true
          },
          "purpose": {
            required: true
          },
          "comments": {
            required: true
          }
        },

        messages: {
          "name": "Please specify your name",
          "email": "Please use a valid email",
          "purpose": "Please select a purpose",
          "comments": "Please add a comment or question"
        }


      });

    },

    toggle: function(){

      if(this.isOpen){
        this.hide();
      }else{
        this.show();
      }

    },

    show: function(){

      var $regionContainer = this.$el.parent();

      $regionContainer.css({
        "z-index": 100
      });
      $regionContainer.fadeIn(300);

      this.isOpen = true;

    },

    hide: function(){

      var $regionContainer = this.$el.parent();

      $regionContainer.fadeOut(300, function(){
        $regionContainer.css({
          "zIndex": -1
        });
      });

      this.isOpen = false;

    },

    enableLoading: function(){

      this.ui.submitButton.addClass("is-loading");
      this.isLoading = true;

    },

    disableLoading: function(){

      this.ui.submitButton.removeClass("is-loading");
      this.isLoading = false;

    },

    showError: function(message){

      this.ui.errorMessage.html(message);

    },

    thanksAndClose: function(){

      var self = this;

      this.ui.errorMessage.addClass("is-success").html("Thanks!");

      var cb = function(){
        self.ui.errorMessage.html("");
        self.ui.errorMessage.removeClass("is-success");
        self.hide();
      }

      setTimeout(cb, 1500);

    }

  });

  return FeedbackLayout;

});
