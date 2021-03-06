var gulp = require('gulp');
var typescript = require('gulp-typescript');
var plumber = require('gulp-plumber');
var merge2 = require('merge2');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var preprocess = require('gulp-preprocess');
var terser = require('gulp-terser');
var gulpif = require('gulp-if');
var autoprefixer = require('autoprefixer');

var {isProduction, isTest, outputDir} = require('./_env');
var dr = require('./_dumber');

const transpile = typescript.createProject('tsconfig.json');
function buildJs(src) {
  // Note with gulp v4, gulp.src and gulp.dest supports sourcemaps directly
  // we don't need gulp-sourcemaps any more.
  return gulp.src(src, {sourcemaps: !isProduction, since: gulp.lastRun(build)})
  // use plumber to not stop build on error in dev mode
  .pipe(gulpif(!isProduction && !isTest, plumber()))
  // Read src/main.ts
  // We use gulp-preprocess to preprocess main.ts. So we don't need any
  // conditional plugin loading which creates extra trouble for tracer/bundler.
  // With this preprocessed static plugin loading, aurelia-testing is
  // auto-traced in test mode, but not in any other env.
  .pipe(preprocess({context: {isProduction, isTest}}))
  .pipe(transpile());
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
    buildJs(isTest ? ['src/**/*.ts', 'test/**/*.ts'] : 'src/**/*.ts'),
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
