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

  aurelia.use.plugin('shared-ui');

  return aurelia.start().then(() => aurelia.setRoot());
}
