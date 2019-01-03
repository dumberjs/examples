import {inject, Aurelia, FrameworkConfiguration} from 'aurelia-framework';
import {resolveModuleId} from 'dumber-module-loader/dist/id-utils';

@inject(Aurelia)
export class LoadForeignExtension {
  moduleId;

  constructor(au) {
    this.au = au;
  }

  activate(params, routeConfig) {
    const name = routeConfig.settings.extensionName;
    let moduleId;
    const entry = name + '/extension';

    // load the entry module by convention,
    // all foreign extensions need to take control of the
    // <div id="extension"></div> in ./load-foreign-extension.html
    return requirejs([entry])
    .then(results => {
      const [extension] = results;
      // only extension written in aurelia has entry moduleId
      moduleId = extension.moduleId;
      // other extension (vue/react) has to enhance <div id="extension"></div>
      const config = new FrameworkConfiguration(this.au);

      // extension can load more aurelia extensions
      return Promise.resolve(extension.configure(config))
      .then(() => config.apply());
    })
    .then(() => {
      // only capture moduleId after configure is done
      this.moduleId = resolveModuleId(entry, moduleId);
    });
  }
}