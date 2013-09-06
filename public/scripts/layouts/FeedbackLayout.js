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

    initialize: function(options){
      this.isOpen = false;
    },

    onShow: function(){

      $("#feedback-form").validate({

        debug: true,

        showErrors: function(errorMap, errorList) {

          if(errorList.length == 1){
            $(".feedback-errors").html(errorList[0].message);
          }else if(errorList.length > 1){
            $(".feedback-errors").html("All fields are required.");
          }else{
            $(".feedback-errors").html("");
          }

        },

        submitHandler: function(form){

          var formData = $(form).serializeArray();
          formData["honey"] = 918272635437;

          $.ajax({

            data: formData,
            dataType: "json",
            type: "POST",
            url: "/feedback",
            success: function(data){
              console.log("success", data);
            },
            error: function(){
              console.log("There was an error submitting feedback");
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

      console.log("toggle");

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

    }

  });

  return FeedbackLayout;

});
