# Example apps using dumber bundler

**Document site (WIP)**: https://dumberjs.github.io

* [aurelia-esnext-scss-jasmine](https://github.com/dumberjs/examples/tree/master/aurelia-esnext-scss-jasmine)
  - shows direct importing a wasm file
* [aurelia-esnext-scss-jest](https://github.com/dumberjs/examples/tree/master/aurelia-esnext-scss-jest)
* [aurelia-typescript-scss-tape](https://github.com/dumberjs/examples/tree/master/aurelia-typescript-scss-tape)
* [aurelia-typescript-css-ava](https://github.com/dumberjs/examples/tree/master/aurelia-typescript-css-ava)
* [aurelia2-esnext-naive-aot](https://github.com/dumberjs/examples/tree/master/aurelia2-esnext-naive-aot)
  - experiemental aurelia 2 example with a naive implementation of aot
* [vue-esnext-lazy-loading-jest](https://github.com/dumberjs/examples/tree/master/vue-esnext-lazy-loading-jest)
  - shows ES Dynamic Import
* [vue-sfc-esnext-lazy-loading-jest](https://github.com/dumberjs/examples/tree/master/vue-sfc-esnext-lazy-loading-jest)
  - `.vue` file Single File Component
  - inline images in css (postcss-url)
  - shows ES Dynamic Import
* [connected-react-router-scss-jest](https://github.com/dumberjs/examples/tree/master/connected-react-router-scss-jest)
  - shows import css file through JavaScript

## Advanced demos

* [runtime-composition-aurelia](https://github.com/dumberjs/examples/tree/master/runtime-composition-aurelia)
  - runtime composition of a base app + extension apps

## Issues

We use `browser-run` in most testing setup here. `browser-run` has [really bad browser detection on Windows](https://github.com/juliangruber/browser-run/issues/75). When run `npm run browser-test`, Windows users may see error `no matches for chrome/*`.