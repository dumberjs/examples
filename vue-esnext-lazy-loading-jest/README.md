# Vue esnext lazy-loading (ES dynamic import) jest

Demo app for dumber bundler. More details in `tasks/*.js` (loaded by `gulpfile.js`).

Used example code from https://github.com/vuejs/vue-router/tree/dev/examples/lazy-loading

Note we didn't use Single File Component (`.vue` file), because Vue currently only provided `.vue` file support for webpack and browserify. There is an unofficial [gulp-vue-module](https://github.com/pandao/gulp-vue-module) for gulp support, but it seems neither complete nor very active, but looks enough to help this demo to load `.vue` file. Right now, I don't want to invest too much time on it.

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

## Run jest test
```
npm test
```

jest tests in Nodejs env, it is totally irrelevant with dumber (which only prepare your code for browser).

