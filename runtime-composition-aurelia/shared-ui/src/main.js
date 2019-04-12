// If you don't use async/await, you can remove regenerator-runtime.
import 'regenerator-runtime/runtime';

export function configure(aurelia) {
  aurelia.use.feature('shared-ui');
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

  return aurelia.start().then(() => aurelia.setRoot());
}
