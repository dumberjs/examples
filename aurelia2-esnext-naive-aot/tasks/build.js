const gulp = require('gulp');
const babel = require('gulp-babel');
const gulpCache = require('gulp-cache');
const preprocess = require('gulp-preprocess');
const plumber = require('gulp-plumber');
const merge2 = require('merge2');
const postcss = require('gulp-postcss');
const terser = require('gulp-terser');
const gulpif = require('gulp-if');
const autoprefixer = require('autoprefixer');
const postcssUrl = require('postcss-url');
const projectName = require('../package.json').name;

const {isProduction, isTest, outputDir} = require('./_env');
const dr = require('./_dumber');
const aot = require('./_naive-aot');


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
  .pipe(aot())
  .pipe(transpile);
}

function buildCss(src) {
  return gulp.src(src, {sourcemaps: !isProduction})
  .pipe(postcss([
    autoprefixer(),
    // use postcss-url to inline any image/font/svg.
    // postcss-url by default use base64 for images, but
    // encodeURIComponent for svg which does NOT work on
    // some browsers.
    // Here we enforce base64 encoding for all assets to
    // improve compatibility on svg.
    postcssUrl({url: 'inline', encodeType: 'base64'})
  ]));
}

function build() {
  // Merge all js/css/html file streams to feed greedy dumber.
  // Note scss was transpiled to css file by gulp-sass.
  // dumber knows nothing about .ts/.less/.scss/.md files,
  // gulp-* plugins transpiled them into js/css/html before
  // sending to dumber.
  return merge2(
    gulp.src('src/**/*.json', {since: gulp.lastRun(build)}),
    gulp.src('src/**/*.html', {since: gulp.lastRun(build)}),
    buildJs('src/**/*.js'),
    buildCss('src/**/*.css')
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
  .pipe(gulp.dest(outputDir, {sourcemaps: isProduction ? false : '.'}));
}

module.exports = build;
