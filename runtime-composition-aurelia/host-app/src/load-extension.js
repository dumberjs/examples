import {inject, Aurelia, FrameworkConfiguration} from 'aurelia-framework';
import {resolveModuleId} from 'dumber-module-loader/dist/id-utils';

@inject(Aurelia)
export class LoadForeignExtension {
  name;
  moduleId;

  constructor(au) {
    this.au = au;
  }

  activate(params, routeConfig) {
    this.name = routeConfig.settings.extensionName;
  }

  attached() {
    let moduleId;
    const entry = this.name + '/extension';

    // load the entry module by convention,
    // all foreign extensions need to take control of the
    // <div id="extension"></div> in ./load-foreign-extension.html
    return requirejs([entry])
    .then(results => {
      const [extension] = results;
      // only extension written in aurelia has entry moduleId
      const {
        moduleId, configure, // extension in aurelia, uses moduleId and configure.
        load, unload // extension in other libs, uses load and unload.
      } = extension;

      if (configure) {
        const config = new FrameworkConfiguration(this.au);

        // extension can load more aurelia extensions
        return Promise.resolve(extension.configure(config))
        .then(() => config.apply())
        .then(() => {
          // only capture moduleId after configure is done
          if (moduleId) {
            this.moduleId = resolveModuleId(entry, moduleId);
          }
        });
      }

      // other extension (vue/react) has to enhance <div id="extension"></div>
      if (load) {
        this._unload = unload;
        return Promise.resolve(load());
      }

      throw new Error(`module "${entry}" did not define either {configure(), moduleId} or {load, unload}.`);
    });
  }

  detached() {
    if (this._unload) {
      return Promise.resolve(this._unload());
    }
  }
}