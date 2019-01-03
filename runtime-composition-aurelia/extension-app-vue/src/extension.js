import Vue from 'vue';
import hello from './hello';

let instance;

export function load() {
  console.log('load vue instance');

  instance = new Vue({
    template: `
      <hello></hello>
    `,
    components: {
      'hello': hello
    },
    destroyed: () => {
      console.log('vue instance destroyed');
    }
  });

  instance.$mount('#extension');
  // by convention of this demo, mount it on <div id="extension"></div>
}

export function unload() {
  if (instance) {
    console.log('unload vue instance');
    instance.$destroy();
    instance = null;
  }
}
