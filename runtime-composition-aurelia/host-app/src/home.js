import {EventAggregator} from 'aurelia-event-aggregator';
import {inject} from 'aurelia-framework';

const loadedExtensions = [];

@inject(EventAggregator)
export class Home {
  extensionName = '';
  extensionUrl = '';
  error = '';

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
    const {extensionName, extensionUrl} = this;
    if (!extensionName || !extensionUrl) return;
    this.error = '';

    if (loadedExtensions.some(e =>
          e.extensionName === extensionName ||
          e.extensionUrl === extensionUrl
        )) {
      this.error = `Extension "${extensionName}" (${extensionUrl}) has already been loaded.`;
      return;
    }

    // This does not destroy existing dumber-module-loader config,
    // it merges into existing config.
    requirejs.config({
      paths: {
        [extensionName]: extensionUrl
      },
      bundles: {
        [extensionName]: {
          nameSpace: extensionName,
          user: ['extension'] // only need to identify the entry module
        }
      }
    });

    loadedExtensions.push({extensionName, extensionUrl});
    this.ea.publish('extension:loaded', extensionName);
  }
}
