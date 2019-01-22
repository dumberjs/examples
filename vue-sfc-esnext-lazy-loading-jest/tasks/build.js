var gulp = require('gulp');
var babel = require('gulp-babel');
var plumber = require('gulp-plumber');
var terser = require('gulp-terser');
var gulpCache = require('gulp-cache');
var gulpif = require('gulp-if');
var autoprefixer = require('autoprefixer');
var postcssUrl = require('postcss-url');
var vue = require('gulp-vue-file');
var projectName = require('../package.json').name;

var {isProduction} = require('./_env');
var dr = require('./_dumber');

function build() {
  // see https://github.com/dumberjs/gulp-vue-file
  // for how to use gulp-vue-file plugin
  let compileVue = vue({
    style: {
      postcssPlugins: [
        autoprefixer(),
        // use postcss-url to inline any image/font/svg.
        // postcss-url by default use base64 for images, but
        // encodeURIComponent for svg which does NOT work on
        // some browsers.
        // Here we enforce base64 encoding for all assets to
        // improve compatibility on svg.
        postcssUrl({url: 'inline', encodeType: 'base64'})
      ]
    }
  });
  // Use gulp-cache if not in production mode
  if (!isProduction) {
    // disable gulp-cache due to jgable/gulp-cache#75 // compileVue = gulpCache(compileVue, {name: projectName});
  }

  // Merge all js/css/html file streams to feed greedy dumber.
  // Note scss was transpiled to css file by gulp-sass.
  // dumber knows nothing about .ts/.less/.scss/.md files,
  // gulp-* plugins transpiled them into js/css/html before
  // sending to dumber.
  return gulp.src('src/**/*.{js,vue}', {sourcemaps: !isProduction, since: gulp.lastRun(build)})
  // plumber does continue on failure for dev mode
  .pipe(gulpif(!isProduction, plumber()))
  .pipe(compileVue)
  // send all files through babel
  .pipe(babel())

  // Note we did extra call `dr()` here, this is designed to cater watch mode.
  // dumber here consumes (swallows) all incoming Vinyl files,
  // Then generates new Vinyl files for all output bundle files.
  .pipe(dr())

  // Want minify? Sure, gulp can do it, dumber is too dumb to do it.
  // Terser fast minify mode
  // https://github.com/terser-js/terser#terser-fast-minify-mode
  // It's a good balance on size and speed to turn off compress.
  .pipe(gulpif(isProduction, terser({compress: false})))

  // Want to write bundle files? Sure, gulp can do it, dumber is too dumb to do it.
  .pipe(gulp.dest('dist', {sourcemaps: !isProduction}));
}

module.exports = build;
