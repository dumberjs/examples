# Aurelia TypeScript scss tape

Note we use `"esModuleInterop": true` in `tsconfig.json`, more details in [TypeScript 2.7 release notes](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-7.html).

[Tape](https://github.com/substack/tape) is my choice of testing lib. With dumber, finally it can work with Aurelia.

For how to setup jasmine with dumber, see the other example aurelia-esnext-scss-jasmine.

Demo app for dumber bundler. More details in `tasks/*.js` (loaded by `gulpfile.js`).

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

Clear tracing cache by dumber.
```
npx gulp clear-cache
```

Note we didn't use gulp-cache with gulp-typescript, because gulp-typescript is not compatible with gulp-cache.

gulp-typescript does many-to-one transpiling (because of extra typing info), not one-to-one transpiling.

## Headless browser (electron) test
```
npm test
```

Details in package.json -> scripts -> pretest & test.

## Visible browser (chrome) test
```
npm run browser-test
```

Then view the testing results in browser console.

## Manual visible other browser (firefox, edge, safari) test
```
npm run test-build
npx browser-do --tap --browser firefox --keep-open < scripts/vendor-bundle.js
```

Then view the testing results in browser console.

