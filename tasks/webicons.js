/*
* webicons
* https://github.com/fischerromain/grunt-webicons
*
* Copyright (c) 2014 Romain Fischer
* Licensed under the MIT license.
*/
'use strict';

var gm    = require('gm').subClass({ imageMagick: true });
var sys   = require('sys');
var fs   = require('fs');
var exec  = require('child_process').exec;
var async = require('async');
var path  = require('path');
var os    = require('os');

module.exports = function(grunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('webicons', 'create web icons', function() {

    var self = this;
    var done = this.async();
    var originalOptions = this.options();
    var options = this.options({
      apple: true,
      microsoft: true,
      concurrency: os.cpus().length,
      favicon: true,
    });

    var apples = [
      { height: 57,
        width:57,
        name:'apple-touch-icon.png'
      },
      { height: 60,
        width:60,
        name:'apple-touch-icon-60x60.png'
      },
      { height: 72,
        width:72,
        name:'apple-touch-icon-72x72.png'
      },
      { height: 76,
        width:76,
        name:'apple-touch-icon-76x76.png'
      },
      { height: 114,
        width:114,
        name:'apple-touch-icon-114x114.png'
      },
      { height: 120,
        width:120,
        name:'apple-touch-icon-120x120.png'
      },
      { height: 144,
        width:144,
        name:'apple-touch-icon-144x144.png'
      },
      { height: 152,
        width:152,
        name:'apple-touch-icon-152x152.png'
      }
    ];
    
    var microsoft = [
      { 
        height: 512,
        width:512,
        name:'msapplication-large.png'
      },
      { 
        height: 512,
        width:512,
        name:'msapplication-wide.png'
      },
      { 
        height: 270,
        width:270,
        name:'msapplication-square.png'
      },
      { 
        height: 128,
        width:128,
        name:'msapplication-tiny.png'
      },
    ];

    var favicons = [
      { 
        height: 16,
        width:16,
        name:'favicon-16.png'
      },
      { 
        height: 32,
        width:32,
        name:'favicon-32.png'
      },
      { 
        height: 64,
        width:64,
        name:'favicon-64.png'
      },
      { 
        height: 128,
        width:128,
        name:'favicon-128.png'
      },
      { 
        height: 256,
        width:256,
        name:'favicon-256.png'
      },
    ];

    var createFavicon = function() { 

      if(options.favicon) {
        self.files.forEach(function(logo) {
          var faviconsLst = [];
          for(var index in favicons) {
            var tmpPath = path.join(logo.dst, favicons[index].name);
            faviconsLst.push(tmpPath);
          }

          var filename = path.join(logo.dst, 'favicon.ico');
          
          var child = exec("convert " + faviconsLst.join(' ') + " " + filename,
                function (error, stdout, stderr) {

                  if (error !== null) {
                    grunt.fail.warn(error);
                  }

                  favicons.forEach(function(icon) {
                    var tmpPath = path.join(logo.dst, icon.name);
                    fs.unlink(tmpPath);
                  });

                    grunt.log.ok('Favicon for '+ logo.src + ' created');
                  
                    done();
                  }
                                  
                );
          
        });
      }
    };

    var icons = [];
    if(options.microsoft) {
      icons = icons.concat(microsoft);
    }

    if(options.apple) {
      icons = icons.concat(apples);
    }

    if(options.favicon) {
      icons = icons.concat(favicons);
    }
    var series = [];

    // Files
    this.files.forEach(function(logo) {

      var dirname = logo.dst;
      var filepath = logo.src; 

      // Prevent failing if destination directory does not exist.
      if (!grunt.file.isDir(dirname)) {
        grunt.file.mkdir(dirname);
      }

      /* Icons */
      icons.forEach(function(f) {

        var imOptions = {
          srcPath:  filepath,
          dstPath: path.join(dirname,f.name),
          width:    f.width,
          height:   f.height,
          quality:  1
        };

        /* Series */
        series.push(function(callback) {
            // Fail when image would be upscaled unless explicitly allowed
            gm(filepath).size(function(err, size) {
              var resizer = gm(filepath)
              .resize(imOptions.width, imOptions.height)
              .quality(Math.floor(imOptions.quality * 100))
              .write(imOptions.dstPath, function(err) {
                if (err) {
                  grunt.fail.warn(err.message);
                } else {
                  grunt.log.ok('Image '+filepath+' resized to '+ imOptions.dstPath);
                }
                return callback();
              });
            });
          }); /* /Series */

        });/* /Icons */

    });/* /Files */

      async.parallelLimit(series, options.concurrency, createFavicon);
  }); /* /webicons */
}; /* export */
