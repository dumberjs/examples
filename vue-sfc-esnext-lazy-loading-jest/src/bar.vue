<template>
  <div>
    <h2>{{ msg }}</h2>
    <p>I am lazy-loaded. (check out the Networks tab in Chrome devtools)</p>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return { msg: 'This is styled Bar!' }
  }
}
</script>

<style lang="scss" scoped>
  h2 {
    // tasks/build.js uses postcss-url to replace all urls with inline base64 string
    background-image: url('./vue.png');
    background-repeat: no-repeat;
    background-size: 4rem 4rem;

    padding-left: 5rem;
    min-height: 4rem;
    color: #15a;
  }
</style>
