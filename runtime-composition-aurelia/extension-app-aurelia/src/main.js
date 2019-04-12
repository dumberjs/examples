// If you don't use async/await, you can remove regenerator-runtime.
import 'regenerator-runtime/runtime';

export function configure(aurelia) {
  aurelia.use.standardConfiguration();

  // @if isProduction
  aurelia.use.developmentLogging('warn');
  // @endif
  // @if !isProduction
  aurelia.use.developmentLogging('info');
  // @endif

  // @if isTest
  aurelia.use.plugin('aurelia-testing');
  // @endif

  // shared-ui is provided in host-app
  aurelia.use.plugin('shared-ui');

  // reorderable-repeat is not provided in host-app
  // we will load it again in the entry file `plugin.js`
  aurelia.use.plugin('bcx-aurelia-reorderable-repeat');

  return aurelia.start().then(() => aurelia.setRoot());
}
