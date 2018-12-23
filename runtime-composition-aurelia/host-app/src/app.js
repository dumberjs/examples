import {EventAggregator} from 'aurelia-event-aggregator';
import {inject} from 'aurelia-framework';

@inject(EventAggregator)
export class App {
  constructor(ea) {
    this.ea = ea;
  }

  bind() {
    this.ea.subscribe('plugin:loaded', pluginName => {
      this.router.addRoute({
        route: pluginName,
        name: pluginName,
        title: pluginName,
        nav: true,
        moduleId: './load-foreign-plugin',
        settings: {pluginName: pluginName},
        // always replace for load-foreign-plugin
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