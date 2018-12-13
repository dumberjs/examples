# Aurelia TypeScript scss tape

Note we use `"esModuleInterop": true` in `tsconfig.json`, more details in [TypeScript 2.7 release notes](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-7.html).

[Tape](https://github.com/substack/tape) is my choice of testing lib. With dumber, finally it can works with Aurelia.

Demo app for dumber bundler. More details in `gulpfile.js`

## Run in dev mode, plus watch
```
npx gulp run
```

If you installed gulp (`npm i -g gulp-cli`) globally, you can do `gulp run` without `npx`.

## Run in production mode, plus watch

It updates index.html with hashed file name.
```
npx cross-env NODE_ENV=production gulp run
```

## Build in dev mode

Generates `scripts/*-bundle.js`
```
gulp build
```

## Build in production mode

Generates `scripts/*-bundle.[hash].js`, update index.html with hashed file name.
```
npx cross-env NODE_ENV=production gulp build
```

## To clear cache

Clear tracing cache by dumber.
```
npx gulp clear-cache
```

## Headless browser (electron) test
```
npm test
```

Details in package.json -> scripts -> pretest & test.

1. no karma, no hacking, just browser-run (tape-run wraps browser-run).
2. note `| tap-dot` is optional, `tap-dot` is just a tap result formatter to please the eyes.

Very importantly, all tests files are in `src/test` for easier module resolution in test mode. Read more in `gulpfile.js`.

## Visible browser (chrome) test
```
npm run browser-test
```

Note in visible browser test, we are feeding browser-run with SpecRunner.html instead of vendor-bundle.js because we need jasmine css (in SpecRunner.html) for proper rendering.

## Manual visible other browser (firefox, edge, safari) test
```
npm run test-build
npx browser-run --browser firefox < scripts/vendor-bundle.js
```

Then view the testing results in browser console.

