var gulp = require('gulp');
var run = require('gulp-run');

function buildPart(proj) {
  return () => {
    console.info('Building ' + proj);
    return run(`cd ${proj}; npm i; npx gulp build`).exec();
  };
}

function runHostApp() {
  console.info('Starting host-app');
  return run('cd host-app; npm i; npx gulp run').exec();
}

exports.default = gulp.series(
  buildPart('shared-ui'),
  buildPart('extension-app-aurelia'),
  runHostApp
);
