var gulp = require('gulp');
var babel = require('gulp-babel');
var plumber = require('gulp-plumber');
var terser = require('gulp-terser');
var gulpCache = require('gulp-cache');
var gulpif = require('gulp-if');
var projectName = require('../package.json').name;

var {isProduction} = require('./_env');
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
  .pipe(transpile);
}


function build() {
  // Merge all js/css/html file streams to feed greedy dumber.
  // Note scss was transpiled to css file by gulp-sass.
  // dumber knows nothing about .ts/.less/.scss/.md files,
  // gulp-* plugins transpiled them into js/css/html before
  // sending to dumber.
  return buildJs('src/**/*.js')

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
