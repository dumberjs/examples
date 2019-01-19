import '@babel/polyfill';

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
