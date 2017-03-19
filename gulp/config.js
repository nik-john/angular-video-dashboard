export default {

  browserPort: 3000,
  UIPort: 3001,
  testPort: 3002,

  sourceDir: './client/app/',
  buildDir: './client/build/',

  styles: {
    src: './client/app/styles/**/*.scss',
    dest: './client/build/css',
    prodSourcemap: false,
    sassIncludePaths: [
      './node_modules/bootstrap-sass/assets/stylesheets',
      './node_modules/videogular-themes-default',
      './node_modules/angular-jk-rating-stars/dist'
    ]
  },

  scripts: {
    src: './client/app/js/**/*.js',
    dest: './client/build/js',
    test: './client/test/**/*.js',
    gulp: 'gulp/**/*.js'
  },

  images: {
    src: './client/app/images/**/*',
    dest: './client/build/images'
  },

  fonts: {
    src: ['./client/app/fonts/**/*', './node_modules/bootstrap-sass/assets/fonts/**/*'],
    dest: './client/build/fonts'
  },

  assetExtensions: [
    'js',
    'css',
    'png',
    'jpe?g',
    'gif',
    'svg',
    'eot',
    'otf',
    'ttc',
    'ttf',
    'woff2?'
  ],

  views: {
    index: './client/app/index.html',
    src: './client/app/views/**/*.html',
    dest: './client/app/js'
  },

  gzip: {
    src: './client/build/**/*.{html,xml,json,css,js,js.map,css.map}',
    dest: './client/build/',
    options: {}
  },

  browserify: {
    bundleName: 'main.js',
    prodSourcemap: false
  },

  test: {
    karma: './client/test/karma.conf.js',
    protractor: './client/test/protractor.conf.js'
  },

  init: function() {
    this.views.watch = [
      this.views.index,
      this.views.src
    ];

    return this;
  }

}.init();
