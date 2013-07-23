
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),


    // Copy task
    copy: {
      foundation: {
        files: [
         {expand: true, flatten: false, cwd: "bower_modules/foundation/js", src: '**', dest: 'public/scripts/vendor'},
         {expand: true, flatten: false, cwd:"bower_modules/foundation/scss", src: '**', dest: 'public/styles/sass'}
        ]
      },
      requirejs: {
        files: [
          {expand: true, flatten: false, cwd: "bower_modules/requirejs", src: 'require.js', dest: 'public/scripts/vendor'}
        ]
      },
      dist: {
        files: [
          {src: ['public/.htaccess'], dest: 'dist/', filter: 'isFile'},
          {src: ['public/**'], dest: 'dist/'},
          {src: ['app/**'], dest: 'dist/'},
          {src: ['composer_modules/**'], dest: 'dist/'}
        ]
      }
    },


    // Bower task
    bower: {
      install: {
        options: {
          copy: false
        }
      }
    },


    // Compass task
    compass: {
        dist: {
            options: {
                config: "config/compass.rb"
            }
        }
    },

    // Clean task
    clean: {
      dist: ["dist/app/src"],
      development: ["tmp"],
      production: ["tmp"]
    },


    // Mkdir task
    mkdir: {
      options: {
        // Task-specific options go here.
      },
      clean: {
        options: {
          create: ['tmp','tmp/logs','tmp/cache']
        }
      },
      dist: {
        options: {
          create: ['dist/tmp','dist/tmp/logs','dist/tmp/cache']
        }
      }
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


    // Watch Task
    watch: {
      options: {
        nospawn: false,
        livereload: true
      },
      compass:{
        files:['**/*.{scss,sass}'],
        tasks:'compass'
      }
      // js:{
      //   files: ['app/src/js/**/*.js'],
      //   tasks: "concat"
      // }
    },


    // Parallel  Task
    parallel: {
      server: {
        options: {
          grunt: true,
          stream: true
        },
        tasks: ['watch','browser']
      }
    }
    // jasmine: {
    //   app: {
    //     src: 'public/js/*.js',
    //     options: {
    //       vendor: vendorjs,
    //       specs: 'test/jasmine/*.js'
    //     }
    //   }
    // }

  });

  //require js
  grunt.loadNpmTasks('grunt-contrib-requirejs');

  // Basic tasks
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-mkdir');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-open');

  // Compile tools
  grunt.loadNpmTasks('grunt-contrib-compass');

  // Clean tools
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Testing tools
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  // Modules for server and watcher
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-parallel');
  grunt.loadNpmTasks('assemble');

  // Basic tasks.
  grunt.registerTask('default', ['development']);
  // grunt.registerTask('build', ['concat:vendor_js','concat:app_js','uglify','compass']);
  // grunt.registerTask('fetch', ['exec','bower']);
  // grunt.registerTask('dist', ['production','copy:dist','clean:dist','mkdir:dist']);

  // Testing tasks
  // grunt.registerTask('test', ['jasmine']);

  // Setup foundation
  // grunt.registerTask("init", ['copy:foundation']);

  // Setup environment for development
  // grunt.registerTask('development', ['build','assemble:development_html','assemble:development_php','clean:development','mkdir:clean']);
  grunt.registerTask('development', ["bower"]);

  // Setup environment for production
  // grunt.registerTask('production', ['build','assemble:production_html','assemble:production_php','clean:production','mkdir:clean']);

};