import {EventAggregator} from 'aurelia-event-aggregator';
import {inject} from 'aurelia-framework';
import {parse} from 'dumber-module-loader/dist/id-utils';

// only apply name space for user module space
// note we use global.define here to avoid confusing dumber's code analysis.
// global is one of supported Nodejs global variables.
function makeNamespacedDefine(namespace) {
  const wrapped = function(moduleId, deps, cb) {
    if (global.define.currentSpace() === 'user') {
      const parsed = parse(moduleId);
      return global.define(parsed.prefix + namespace + '/' + parsed.bareId, deps, cb);
    } else {
      global.define(moduleId, deps, cb);
    }
  }

  wrapped.amd = global.define.amd;
  wrapped.switchToUserSpace = global.define.switchToUserSpace;
  wrapped.switchToPackageSpace = global.define.switchToPackageSpace;
  return wrapped;
}

@inject(EventAggregator)
export class Home {
  extensionName = '';
  extensionUrl = '';
  error = '';
  isLoading = false;
  loadedExtensions = [];

  constructor(ea) {
    this.ea = ea;
  }

  fillupAu() {
    this.extensionName = 'extension-au';
    this.extensionUrl = '/extension-app-aurelia/scripts/extension-au.js';
  }

  fillupVue() {
    this.extensionName = 'extension-vue';
    this.extensionUrl = '/extension-app-vue/dist/extension-vue.js';
  }

  fillupReact() {
    this.extensionName = 'extension-react';
    this.extensionUrl = '/extension-app-react/dist/extension-react.js';
  }

  loadExtension() {
    const {extensionName, extensionUrl, loadedExtensions} = this;
    if (!extensionName || !extensionUrl) return;
    if (loadedExtensions.indexOf(extensionName) !== -1) {
      this.error = `Extension "${extensionName}" has already been loaded.`;
      return;
    }

    this.error = '';
    this.isLoading = true;

    fetch(extensionUrl).then(response => {
      if (response.ok) {
        return response.text();
      }
      throw new Error(`${response.status} ${response.statusText}`);
    }).then(bundle => {
      const func = (new Function('define', bundle)).bind(global);
      func(makeNamespacedDefine(extensionName));
      loadedExtensions.push(extensionName);
      this.ea.publish('extension:loaded', extensionName);
    }).catch(err => {
      console.log('err', err);
      this.error = err.message;
      console.error(err.stack);
    }).then(() => {
      this.isLoading = false;
    });
  }
}
