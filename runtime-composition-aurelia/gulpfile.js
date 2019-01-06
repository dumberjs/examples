var gulp = require('gulp');
var run = require('gulp-run');

function buildSharedUI() {
  console.info('Building shared-ui');
  return run('cd shared-ui && npm i && npx gulp clean && npx gulp build-plugin').exec();
}

function buildPart(proj) {
  return () => {
    console.info('Building ' + proj);
    return run(`cd ${proj} && npm i && npx gulp clean && npx gulp build`).exec();
  };
}

function runHostApp() {
  console.info('Starting host-app');
  return run('cd host-app && npm i && npx gulp run').exec();
}

exports.default = gulp.series(
  buildSharedUI,
  buildPart('extension-app-aurelia'),
  buildPart('extension-app-vue'),
  buildPart('extension-app-react'),
  runHostApp
);
