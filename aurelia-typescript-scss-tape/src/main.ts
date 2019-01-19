import {Aurelia} from 'aurelia-framework';

export async function configure(aurelia: Aurelia) {
  // aurelia.use.feature('resources');
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

  await aurelia.start();
  await aurelia.setRoot();
}
