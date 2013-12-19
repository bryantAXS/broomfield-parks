
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),


    // Copy task
    copy: {

      init: {
        files: [

          // Foundation
          // {cwd: "bower_modules/foundation/js", src: '**', dest: 'public/scripts/vendor', expand: true, flatten: false},
          // {cwd: "bower_modules/foundation/scss", src: 'foundation', dest: 'public/styles/sass', expand: true, flatten: false},
          // {isFile: true, rename: function(dest, src){ return dest + "_" + src; }, cwd: "bower_modules/foundation/scss", src: 'foundation.scss', dest: 'public/styles/sass/', expand: true, flatten: false},
          // {isFile: true, rename: function(dest, src){ return dest + "_" + src; }, cwd: "bower_modules/foundation/scss", src: 'normalize.scss', dest: 'public/styles/sass/', expand: true, flatten: false},


          {isFile: true, cwd: "bower_modules/jquery", src: 'jquery.js', dest: 'public/scripts/vendor', expand: true, flatten: false},
          {isFile: true, cwd: "bower_modules/underscore", src: 'underscore.js', dest: 'public/scripts/vendor', expand: true, flatten: false},
          {isFile: true, cwd: "bower_modules/backbone", src: 'backbone.js', dest: 'public/scripts/vendor', expand: true, flatten: false},
          {isFile: true, cwd: "bower_modules/backbone.marionette/public/javascripts", src: 'json2.js', dest: 'public/scripts/vendor', expand: true, flatten: false},
          {isFile: true, cwd: "bower_modules/backbone.marionette/public/javascripts", src: 'backbone.babysitter.js', dest: 'public/scripts/vendor', expand: true, flatten: false},
          {isFile: true, cwd: "bower_modules/backbone.marionette/public/javascripts", src: 'backbone.wreqr.js', dest: 'public/scripts/vendor', expand: true, flatten: false},
          {isFile: true, cwd: "bower_modules/backbone.marionette/lib", src: 'backbone.marionette.js', dest: 'public/scripts/vendor', expand: true, flatten: false},
          {isFile: true, cwd: "bower_modules/moment", src: 'moment.js', dest: 'public/scripts/vendor', expand: true, flatten: false},
          {isFile: true, cwd: "bower_modules/jquery-backstretch", src: 'jquery.backstretch.js', dest: 'public/scripts/vendor', expand: true, flatten: false},
          {isFile: true, cwd: "bower_modules/jquery.transit", src: 'jquery.transit.js', dest: 'public/scripts/vendor', expand: true, flatten: false},
          {isFile: true, cwd: "bower_modules/jquery.lazyload", src: 'jquery.lazyload.js', dest: 'public/scripts/vendor', expand: true, flatten: false},
          {isFile: true, cwd: "bower_modules/spin.js", src: 'spin.js', dest: 'public/scripts/vendor', expand: true, flatten: false},
          {isFile: true, cwd: "bower_modules/url-parser", src: 'purl.js', dest: 'public/scripts/vendor', expand: true, flatten: false},
          {isFile: true, cwd: "bower_modules/typeahead.js/dist", src: 'typeahead.js', dest: 'public/scripts/vendor', expand: true, flatten: false},
          {isFile: true, cwd: "bower_modules/jquery.validation", src: 'jquery.validate.js', dest: 'public/scripts/vendor', expand: true, flatten: false},

          {isFile: true, cwd: "bower_modules/requirejs", src: 'require.js', dest: 'public/scripts/vendor', expand: true, flatten: false}

        ]
      },

    },

    // Assemble task
    assemble: {
      development_html: {
        options: {
          dev: true,
          prod: false,
          ext: '.html'
        },
        files: {
          "app/views/partials/header_styles.html": ["app/src/hbs/header_styles.hbs"],
          "app/views/partials/footer_scripts.html": ["app/src/hbs/footer_scripts.hbs"]
        }
      },
      production_html: {
        options: {
          dev: false,
          prod: true,
          ext: '.html'
        },
        files: {
          "app/views/partials/header_styles.html": ["app/src/hbs/header_styles.hbs"],
          "app/views/partials/footer_scripts.html": ["app/src/hbs/footer_scripts.hbs"]
        }
      }
    },

    // Requirejs task
    requirejs: {
      compile: {
        options: {
          name: "main",
          baseUrl: "public/scripts",
          mainConfigFile: "public/scripts/main.js",
          out: "public/scripts/main-built.js"
        }
      }
    }

  });


  // Basic tasks
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('assemble');

  // Setup foundation
  grunt.registerTask("init", ['copy:init']);

  // Setup environment for development
  grunt.registerTask('development', ['assemble:development_html']);

  // Setup environment for production
  grunt.registerTask('compile', ['requirejs']);

};