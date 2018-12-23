import {EventAggregator} from 'aurelia-event-aggregator';
import {inject} from 'aurelia-framework';
import {parse} from 'dumber-module-loader/dist/id-utils';

// only apply name space for user module space
function makeNamespacedDefine(namespace) {
  const wrapped = function(moduleId, deps, cb) {
    if (global.define.currentSpace() === 'user') {
      const parsed = parse(moduleId);
      return global.define(parsed.prefix + namespace + '/' + parsed.bareId, deps, cb);
    } else {
      global.define(moduleId, deps, cb);
    }
  }

  wrapped.switchToUserSpace = global.define.switchToUserSpace;
  wrapped.switchToPackageSpace = global.define.switchToPackageSpace;
  return wrapped;
}

@inject(EventAggregator)
export class Home {
  pluginName = '';
  pluginUrl = '';
  error = '';
  isLoading = false;
  loadedPlugins = [];

  constructor(ea) {
    this.ea = ea;
  }

  fillupAu() {
    this.pluginName = 'plugin-au';
    this.pluginUrl = '/plugin-app-aurelia/scripts/plugin-au.js';
  }

  fillupVue() {
    this.pluginName = 'plugin-vue';
    this.pluginUrl = '/plugin-app-vue/scripts/plugin-vue.js';
  }

  fillupReact() {
    this.pluginName = 'plugin-react';
    this.pluginUrl = '/plugin-app-react/scripts/plugin-react.js';
  }

  loadPlugin() {
    const {pluginName, pluginUrl, loadedPlugins} = this;
    if (!pluginName || !pluginUrl) return;
    if (loadedPlugins.indexOf(pluginName) !== -1) {
      this.error = `Plugin "${pluginName}" has already been loaded.`;
      return;
    }

    this.error = '';
    this.isLoading = true;

    fetch(pluginUrl).then(response => {
      if (response.ok) {
        return response.text();
      }
      throw new Error(`${response.status} ${response.statusText}`);
    }).then(bundle => {
      const func = (new Function('define', bundle)).bind(global);
      func(makeNamespacedDefine(pluginName));
      loadedPlugins.push(pluginName);
      this.ea.publish('plugin:loaded', pluginName);
    }).catch(err => {
      console.log('err', err);
      this.error = err.message;
      console.error(err.stack);
    }).then(() => {
      this.isLoading = false;
    });
  }
}
