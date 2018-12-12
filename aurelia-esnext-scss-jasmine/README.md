# Aurelia esnext scss jasmine

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

Clear transpiling cache by gulp-cache, and tracing cache by dumber.
```
npx gulp clear-cache
```

## Headless browser (electron) test
```
npm test
```

Details in package.json -> scripts -> pretest & test.

1. no karma, no hacking, just browser-run (tape-run wraps browser-run).
2. uses jasmine tap reporter so we can pipe the result to tape-run to return proper return-code to terminal.
3. note `| tap-dot` is optional, `tap-dot` is just a tap result formatter to please the eyes.

Very importantly, all tests files are in `src/test` for easier module resolution in test mode. Read more in `gulpfile.js`.

## Visible browser (chrome) test
```
npm run browser-test
```

Note in visible browser test, we are feeding browser-run with SpecRunner.html instead of vendor-bundle.js because we need jasmine css (in SpecRunner.html) for proper rendering.

## Manual visible other browser (firefox, edge, safari) test
```
npm run test-build
npx browser-run --input html --static . --browser firefox < SpecRunner.html
```
