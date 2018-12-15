import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const Home = { template: '<div>home</div>' };

const Foo = () => import('./foo');
const Bar = () => import('./bar');
const Baz = () => import('./baz');

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', component: Home },
    // Just use them normally in the route config
    { path: '/foo', component: Foo },
    // Bar and Baz belong to the same root route
    // and grouped in the same async chunk.
    { path: '/bar', component: Bar,
      children: [
        { path: 'baz', component: Baz }
      ]
    }
  ]
});

new Vue({
  router,
  template: `
    <div id="app">
      <h1>Basic</h1>
      <ul>
        <li><router-link to="/">/</router-link></li>
        <li><router-link to="/foo">/foo</router-link></li>
        <li><router-link to="/bar">/bar</router-link></li>
        <li><router-link to="/bar/baz">/bar/baz</router-link></li>
      </ul>
      <router-view class="view"></router-view>
    </div>
  `
}).$mount('#app');
