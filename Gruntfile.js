/*
 * grunt-webicons
 * https://github.com/fischerromain/grunt-webicons
 *
 * Copyright (c) 20143 Romain Fischer
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Configuration to be run (and then tested).
    webicons: {
      options: {
        apple: true,
        microsoft: true,      
        favicon: true,      
      },
      dist: { src: 'img-src/logo.png', dst:'img' }    
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  grunt.registerTask('logo', ['webicons']);

};
