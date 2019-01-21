var gulp = require('gulp');
var babel = require('gulp-babel');
var plumber = require('gulp-plumber');
var merge2 = require('merge2');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var preprocess = require('gulp-preprocess');
var terser = require('gulp-terser');
var gulpCache = require('gulp-cache');
var gulpif = require('gulp-if');
var autoprefixer = require('autoprefixer');
var projectName = require('../package.json').name;

var {isProduction, isTest, outputDir} = require('./_env');
var dr = require('./_dumber');

function buildJs(src) {
  let transpile = babel();
  // Use gulp-cache if not in production mode
  if (!isProduction) {
    transpile = gulpCache(transpile, {name: projectName});
  }

  // Note with gulp v4, gulp.src and gulp.dest supports sourcemaps directly
  // we don't need gulp-sourcemaps any more.
  return gulp.src(src, {sourcemaps: !isProduction, since: gulp.lastRun(build)})
  .pipe(gulpif(!isProduction, plumber()))
  // Read src/main.js
  // We use gulp-preprocess to preprocess main.js. So we don't need any
  // conditional plugin loading which creates extra trouble for tracer/bundler.
  // With this preprocessed static plugin loading, aurelia-testing is
  // auto-traced in test mode, but not in any other env.
  .pipe(preprocess({context: {isProduction, isTest}}))
  .pipe(transpile);
}

function buildCss(src) {
  // scss is not one-to-one transform, cannot use {since: lastRun} to check changed file
  // scss is many-to-one transform (muliple _partial.scss files)
  return gulp.src(src, {sourcemaps: !isProduction})
  .pipe(sass().on('error', sass.logError))
  .pipe(postcss([autoprefixer()]));
}

function build() {
  // Merge all js/css/html file streams to feed greedy dumber.
  // Note scss was transpiled to css file by gulp-sass.
  // dumber knows nothing about .ts/.less/.scss/.md files,
  // gulp-* plugins transpiled them into js/css/html before
  // sending to dumber.
  return merge2(
    buildJs(isTest ? ['src/**/*.js', 'test/**/*.js'] : 'src/**/*.js'),
    buildCss('src/**/*.scss'),
    gulp.src('src/**/*.html', {since: gulp.lastRun(build)})
  )

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
  .pipe(gulp.dest(outputDir, {sourcemaps: !isProduction}));
}

module.exports = build;
module.exports.buildJs = buildJs;
module.exports.buildCss = buildCss;
