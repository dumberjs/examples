import {EventAggregator} from 'aurelia-event-aggregator';
import {inject} from 'aurelia-framework';

@inject(EventAggregator)
export class App {
  constructor(ea) {
    this.ea = ea;
  }

  bind() {
    this.ea.subscribe('extension:loaded', extensionName => {
      this.router.addRoute({
        route: extensionName,
        name: extensionName,
        title: extensionName,
        nav: true,
        moduleId: './load-foreign-extension',
        settings: {extensionName},
        // always replace for load-foreign-extension
        activationStrategy: 'replace'
      });

      // reload navigation menu
      this.router.refreshNavigation();
    });
  }

  configureRouter(config, router) {
    this.router = router;

    config.title = 'Composition Demo';
    config.options.pushState = true;
    config.options.root = "/";

    config.map([
      {route: '', name: 'home', title: 'Home', nav: true, moduleId: './home'},
    ]);

  }
}