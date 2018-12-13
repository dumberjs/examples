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

  // @ifdef isProduction
  aurelia.use.developmentLogging('warn');
  // @endif
  // @ifdef !isProduction
  aurelia.use.developmentLogging('info');
  // @endif

  // @ifdef isTest
  aurelia.use.plugin('aurelia-testing');
  // @endif

  return aurelia.start().then(() => aurelia.setRoot());
}
