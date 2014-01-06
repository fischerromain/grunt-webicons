# grunt-webicons

> Create web icons - thanks to imagemagick.

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

This plugin requires [ImageMagick](http://www.imagemagick.org/script/index.php)

```shell
npm install grunt-webicons --save-dev
```

One the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-webicons');
```

## The "webicons" task

### Overview
In your project's Gruntfile, add a section named `webicons` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  webicons: {
      options: {
        apple: true,
        microsoft: true,      
        favicon: true,      
      },
      your_target: {
        // Target-specific file lists and/or options go here.
      },
  },
})
```

### Options

#### options.apple
Type: `Boolean`
Default value: `true`

Generate Ipad, Iphone icons

#### options.microsoft
Type: `Boolean`
Default value: `true`

Generate microsoft tiles icons

#### options.favicon
Type: `Boolean`
Default value: `true`

Generate favicon with 16x16 32x32 64x64 128x128 256x256 in .ico file

### Usage Examples

#### Default Options
Always use a minimal 512px x 512px png file from src

```js
grunt.initConfig({
    webicons: {
      options: {
        apple: true,
        microsoft: true,      
        favicon: true,      
      },
      dist: { src: 'img-src/logo.png', dst:'img' }    
    },

  });
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).
