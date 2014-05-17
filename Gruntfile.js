/*global module:false*/

/*Generated initially from grunt-init, heavily inspired by yo webapp*/

module.exports = function(grunt) {
  'use strict';

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Load grunt config
  require('load-grunt-config')(grunt, {
    init: true,
    data: {
      config: {
        // Configurable paths
        app: 'app',
        dist: 'dist'
      },
      connect: {
        options: {
            port: grunt.option('port') || 5555,
            livereload: 35729,
            // Change this to '0.0.0.0' to access the server from outside
            // hostname: '0.0.0.0'
            hostname: '127.0.0.1'
        },
        livereload: {
            options: {
                open: true,
                base: [
                    '.tmp',
                    '<%= config.app %>'
                ]
            }
        },
        dist: {
            options: {
                open: true,
                base: '<%= config.dist %>',
                livereload: false
            }
        }
      }
    }
  });
};
