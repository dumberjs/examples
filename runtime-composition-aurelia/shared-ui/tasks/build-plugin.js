var merge2 = require('merge2');
var gulp = require('gulp');
var terser = require('gulp-terser');
var del = require('del');
var {buildJs, buildCss} = require('./build');

// write all files in src/shared-ui/ into dist/ folder.
// all js files were transpiled to commonjs format by default.
function buildPlugin() {
  return merge2(
    buildJs('src/shared-ui/**/*.js').pipe(terser({compress: false})),
    buildCss('src/shared-ui/**/*.scss'),
    gulp.src('src/shared-ui/**/*.html')
  )
  .pipe(gulp.dest('dist'));
}

// clean up dist folder
function cleanPlugin() {
  return del(['dist']);
}

module.exports = gulp.series(
  cleanPlugin,
  buildPlugin
);
