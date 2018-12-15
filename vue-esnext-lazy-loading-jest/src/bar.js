export default {
  template: `
    <div>
      <h2>{{ msg }}</h2>
      <p>I am lazy-loaded. (check out the Networks tab in Chrome devtools)</p>
      <router-view></router-view>
    </div>
  `,
  data() {
    return { msg: 'This is Bar!' }
  }
};
