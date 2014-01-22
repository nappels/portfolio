
/*jshint globalstrict: true*/

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // The clean task ensures all files are removed from the dist/code/ directory so
    // that no files linger from previous builds.
    clean: {
      build: ["dist/*"],
      code: ["dist/code/*"]
    },
    
    concat: {
      css: {
        src: [
          "assets/css/reset.css",
          "assets/css/base.css"
        ],
        dest: "assets/css/index.css"
      }
    },

    // The stylus task is used to compile Stylus stylesheets into a single
    // CSS file for debug and release deployments.  
    stylus: {
      compile: {
        options: { 
          paths: ["assets/css"],
          import: [ 'nib' ]
        },
        files: {
          "assets/css/base.css": ["assets/css/base.styl"]
        }
      }
    },

    // Minify the functions.js file in the dist directory.
    uglify: {
      "dist/code/assets/js/functions.js": [
        "dist/code/assets/js/functions.js"
      ]
    },
    
    // Minify the index.css file in the dist directory.
    cssmin: {
      "dist/code/assets/css/index.css": [
        "dist/code/assets/css/index.css"
      ]
    },

    jshint: {
      files: ['Gruntfile.js', 'assets/js/*.js'],
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        strict: false,
        globals: {
          jquery: true,
          document: true,
          window: true,
          module:true
        }
      }
    },
    copy: {
      html: {
        files: {
          "dist/code/": "index.html"
        }
      },
      images: {
        files: [
          {expand: true, src: ['assets/images/**'], dest: 'dist/code/'}
        ]
      },
      css: {
        files: [
          {expand: true, src: ['assets/css/index.css'], dest: 'dist/code/'}
        ]
      },
      js: {
        files: [
          {expand: true, src: ['assets/js/**'], dest: 'dist/code/'}
        ]
      },
      libs: {
        files: [
          {expand: true, src: ['assets/libs/**'], dest: 'dist/code/'}
        ]
      }
      // fonts: {
      //   files: [
      //     {expand: true, src: ['assets/fonts/**'], dest: 'dist/code/'}
      //   ]
      // }

    },
    connect: {
      server: {
        options: {
          index: './index.html',
          port: 5000
        }
      }
    },
    watch: {
      stylus: {
        files: './assets/css/base.styl',
        tasks: ['stylus', 'concat']
      },
      resetCss: {
        files: './assets/css/reset.css',
        tasks: ['concat']
      },
      options: {
        nospawn: true
      }
    }
  });


  
  // load grunt-contrib tasks
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task.
  grunt.registerTask('default', ['jshint']);

  grunt.registerTask('server', ['stylus', 'concat', 'connect:server', 'watch']);

  grunt.registerTask('build', ['jshint', 'concat', 'clean', 'copy', 'uglify', 'cssmin']);

};