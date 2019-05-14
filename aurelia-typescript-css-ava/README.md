# aurelia-typescript-css-ava

An app using dumber bundler to build. More details in `tasks/*.js` (loaded by `gulpfile.js`).

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

## Nodejs test
```
npm test
```

Details in package.json -> scripts -> pretest & test.
