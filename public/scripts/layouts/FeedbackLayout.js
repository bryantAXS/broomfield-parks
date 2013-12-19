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
      "errorMessage": ".feedback-errors",
      "selectWrapper": ".select-wrapper",
      "select": ".select-wrapper select"
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

              if(data.success == 1){
                self.disableLoading();
                self.thanksAndClose();
              }else{
                self.disableLoading();
                self.showError("There was an error. Plase try again.");
              }

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

      this.initDropdown();

    },

    initDropdown: function(){

      var self = this;

      self.resetDropdown();

      this.ui.select.on({
        change: function(){
          var val = $(this).val();
          var text = $("option[value='"+val+"']").data("text");
          self.ui.selectWrapper.find(".select-text").html(text);
        }
      })

    },

    resetDropdown: function(){

      var defaultText = this.ui.selectWrapper.data('default-text');
      this.ui.selectWrapper.find(".select-text").html(defaultText);

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
      this.$el.find("input, textarea").val("");
      this.resetDropdown();

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
