# Example apps using dumber bundler

* aurelia-esnext-scss-jasmine
  - shows direct importing a wasm file
* aurelia-esnext-scss-jest
* aurelia-typescript-scss-tape
* vue-esnext-lazy-loading-jest
  - shows ES Dynamic Import
* connected-react-router-scss-jest
  - shows import css file through JavaScript

## Advanced demos

* runtime-composition-aurelia
  - runtime composition of a base app + extension apps

## Issues

We use `browser-run` in most testing setup here. `browser-run` has [really bad browser detection on Windows](https://github.com/juliangruber/browser-run/issues/75). When run `npm run browser-test`, Windows users may see error `no matches for chrome/*`.