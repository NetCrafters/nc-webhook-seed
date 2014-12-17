module.exports = function(grunt) {

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    destination: '.build',
    source: '.',
    webhook: '..',

    less: {
      options: {
        paths: ['<%= source %>/vendor/bootstrap/less', '<%= source %>/less']
      },
      dist: {
        files: [{
          '<%= destination %>/assets/css/site.css': '<%= source %>/less/main.less'
        }, {
          '<%= destination %>/assets/css/print.css': '<%= source %>/less/main-print.less'
        }]
      }
    }, // end less

    sass: {
      options: {
        includePaths: [
          '<%= source %>/vendor/foundation/scss',
          '<%= source %>/vendor/font-awesome/scss'
        ]
      },
      dev: {
        options: {
          outputStyle: 'nested'
        },
        files: [{
          '<%= destination %>/assets/css/main.css': '<%= source %>/scss/site.scss'
        }, {
          '<%= destination %>/assets/css/print.css': '<%= source %>/scss/print.scss'
        }]
      },
      dist: {
        options: {
          outputStyle: 'compressed'
        },
        files: [{
          '<%= destination %>/assets/css/main.css': '<%= source %>/scss/site.scss'
        }, {
          '<%= destination %>/assets/css/print.css': '<%= source %>/scss/print.scss'
        }]
      }
    }, // end sass

    uglify: {
      build: {
        options: {
          mangle: false,
          compress: false,
          preserveComments: 'some',
          banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */\n\n'
        },
        files: {
          '<%= destination %>/assets/javascript/modernizr.js': [
            '<%= source %>/vendor/modernizr/modernizr.min.js',
          ],
          '<%= destination %>/assets/javascript/main.js': [
            '<%= source %>/vendor/jquery/dist/jquery.js',
            '<%= source %>/vendor/fastclick/lib/fastclick.js',
            '<%= source %>/vendor/foundation/js/*.js',
            '<%= source %>/javascript/app.js'
          ]
        }
      }
    }, // end uglify

    watch: {
      grunt: {
        files: 'Gruntfile.js',
        tasks: ['build']
      },
      copy: {
        files: [
          '<%= source %>/templates/**/*',
          '<%= source %>/pages/**/*',
          '<%= source %>/images/**/*',
          '<%= destination %>/assets/css/**/*'
        ],
        tasks: ['clean:webhookStatic','copy']
      },
      less: {
        files: '<%= source %>/less/**/*.less',
        tasks: ['less']
      },
      sass: {
        files: '<%= source %>/scss/**/*.scss',
        tasks: ['sass']
      },
      scripts: {
        files: [
          '<%= source %>/javascript/app.js'
        ],
        tasks: ['uglify']
      }
    }, // end watch

    clean: {
        build: {
          src: ['<%= destination %>/*']
        },
        webhookStatic: {
          options: {
            force: true
          },
          src: ['<%= webhook %>/static/*']
        }
    },
    copy: {
      fonts: {
        cwd: '<%= source %>/vendor/font-awesome/fonts',
        src: '**/*',
        dest: '<%= destination %>/assets/fonts',
        expand: true,
        nonull: true
      },
      images: {
        cwd: '<%= source %>/images',
        src: '**/*',
        dest: '<%= destination %>/assets/images',
        expand: true
      },
      webhook: {
        files: [
          // To build folder - templates
          {
            cwd: '<%= source %>/templates',
            src: '**/*',
            dest: '<%= destination %>/templates',
            expand: true
          },
          // To build folder - pages
          {
            cwd: '<%= source %>/pages',
            src: '**/*',
            dest: '<%= destination %>/pages',
            expand: true
          },

          // This could have be done in one sub-task, but to be consistent,
          // I copied to the build folder like the other items. Plus, it allows
          // us to pre-process before Webhook hears of the change in their watcher
          
          //TO WEBHOOK - templates
          {
            cwd: '<%= destination %>/templates',
            src: '**/*',
            dest: '<%= webhook %>/templates/',
            expand: true
          },
          // TO WEBHOOK - pages
          {
            cwd: '<%= destination %>/pages',
            src: '**/*',
            dest: '<%= webhook %>/pages/',
            expand: true
          },
          // To WEBOOK - assets
          {
            cwd: '<%= destination %>/assets',
            src: '**/*',
            dest: '<%= webhook %>/static/',
            expand: true
          }

        ]
      }
    } // end copy

  });

grunt.file.setBase(grunt.config.get('source'));
grunt.registerTask('prod', ['sass:dist', 'uglify', 'clean:webhookStatic', 'copy']);
grunt.registerTask('build', ['sass:dev', 'uglify', 'clean:webhookStatic', 'copy']);
grunt.registerTask('default', ['clean:build', 'build', 'watch']);

}


;
