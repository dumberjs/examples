export function configure(config) {
  // don't load shared-ui as provided by host-app

  // load reorderable-repeat
  config.plugin('bcx-aurelia-reorderable-repeat');
}

// the component to be loaded by host-app
export const moduleId = './app';
