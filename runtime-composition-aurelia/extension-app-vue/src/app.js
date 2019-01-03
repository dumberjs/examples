import Vue from 'vue';
import hello from './hello';

new Vue({
  template: `
    <hello></hello>
  `,
  components: {
    'hello': hello
  }
}).$mount('#app');
