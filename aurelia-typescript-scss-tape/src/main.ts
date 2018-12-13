import {PLATFORM} from 'aurelia-pal';
import {Aurelia} from 'aurelia-framework';

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

export async function configure(aurelia: Aurelia) {
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

  return await aurelia.start().then(() => aurelia.setRoot());
}
