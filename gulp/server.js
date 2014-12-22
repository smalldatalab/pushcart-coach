'use strict';

var gulp = require('gulp');

var util = require('util');

var browserSync = require('browser-sync');

var historyApiFallback = require('connect-history-api-fallback');

function browserSyncInit(baseDir, files, browser) {
  browser = browser === undefined ? 'default' : browser;

  var routes = null;
  if(baseDir === 'src' || (util.isArray(baseDir) && baseDir.indexOf('src') !== -1)) {
    routes = {
      // Should be '/bower_components': '../bower_components'
      // Waiting for https://github.com/shakyShane/browser-sync/issues/308
      '/bower_components': 'bower_components',

    };
  }

  browserSync.instance = browserSync.init(files, {
    startPath: '/',
    server: {
      baseDir: baseDir,
      middleware: [ historyApiFallback ],
      routes: routes
    },
    browser: browser,
    port: 3000
  });

}

gulp.task('serve', ['watch'], function () {
  browserSyncInit([
    'src',
    '.tmp'
  ], [
    '.tmp/app/**/*.css',
    'src/assets/**/*.scss',
    'src/assets/images/**/*',
    'src/*.html',
    'src/app/**/*.html',
    'src/app/**/*.js'
  ]);
});

gulp.task('serve:dist', ['build'], function () {
  browserSyncInit('dist');
});

gulp.task('serve:e2e', ['wiredep', 'injector:js', 'injector:css'], function () {
  browserSyncInit(['src', '.tmp'], null, []);
});

gulp.task('serve:e2e-dist', ['build'], function () {
  browserSyncInit('dist', null, []);
});
