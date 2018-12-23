import {inject, Aurelia, FrameworkConfiguration} from 'aurelia-framework';
import {resolveModuleId} from 'dumber-module-loader/dist/id-utils';

@inject(Aurelia)
export class LoadForeignPlugin {
  moduleId;

  constructor(au) {
    this.au = au;
  }

  activate(params, routeConfig) {
    const name = routeConfig.settings.pluginName;
    let moduleId;
    const entry = name + '/plugin';

    // load the entry module by convention,
    // all foreign plugins need to take control of the
    // <div id="plugin"></div> in ./load-foreign-plugin.html
    return requirejs([entry])
    .then(results => {
      const [plugin] = results;
      // only plugin written in aurelia has entry moduleId
      moduleId = plugin.moduleId;
      // other plugin (vue/react) has to enhance <div id="plugin"></div>
      const config = new FrameworkConfiguration(this.au);

      // plugin can load more aurelia plugins
      return Promise.resolve(plugin.configure(config))
      .then(() => config.apply());
    })
    .then(() => {
      // only capture moduleId after configure is done
      this.moduleId = resolveModuleId(entry, moduleId);
    });
  }
}