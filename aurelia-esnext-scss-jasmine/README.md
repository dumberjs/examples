# Aurelia esnext scss jasmine

Demo app for dumber bundler. More details in `tasks/*.js` (loaded by `gulpfile.js`).

`src/foo.js` shows direct importing a wasm file.

## Run in dev mode, plus watch
```
npx gulp
```

If you installed gulp (`npm i -g gulp-cli`) globally, you can do `gulp` without `npx`.

## Run in production mode, plus watch

It updates index.html with hashed file name.
```
npx cross-env NODE_ENV=production gulp
```

## Build in dev mode

Generates `scripts/*-bundle.js`
```
npx gulp clean && npx gulp build
```

## Build in production mode

Generates `scripts/*-bundle.[hash].js`, update index.html with hashed file name.
```
npx gulp clean && npx cross-env NODE_ENV=production gulp build
```

## To clear cache

Clear transpiling cache by gulp-cache, and tracing cache by dumber.
```
npx gulp clear-cache
```
If you touch `.babelrc` file, you'd better do clear cache.

## Headless browser (electron) test
```
npm test
```

Details in package.json -> scripts -> pretest & test.

## Visible browser (chrome) test
```
npm run browser-test
```

## Manual visible other browser (firefox, edge, safari) test
```
npm run test-build
npx browser-do --jasmine --browser firefox --keep-open < scripts/vendor-bundle.js
```
