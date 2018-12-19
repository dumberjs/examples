import {PLATFORM} from 'aurelia-pal';
import '@babel/polyfill';

// Use dumber-module-loader,
// This bit will be added to aurelia-loader-default
PLATFORM.eachModule = function(callback) {
  let defined = PLATFORM.global.requirejs.definedValues();
  for (let key in defined) {
    try {
      if (callback(key, defined[key])) return;
    } catch (e) {
      //
    }
  }
};

export function configure(aurelia) {
  // aurelia.use.feature('resources');
  aurelia.use.standardConfiguration();

  // @if isProduction
  aurelia.use.developmentLogging('warn');
  // @endif
  // @if !isProduction
  aurelia.use.developmentLogging('info');
  // @endif

  // @if isTest
  // Note in jest test, it doesn't use gulp-preprocess.
  // all @if conditions are no-op in jest test mode,
  // So aurelia-testing will be still loaded in jest.
  aurelia.use.plugin('aurelia-testing');
  // @endif

  return aurelia.start().then(() => aurelia.setRoot());
}
