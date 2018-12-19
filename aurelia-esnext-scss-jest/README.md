# Aurelia esnext scss jest

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
npx gulp build
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
If you touch `.babelrc` file, you'd better do clear cache.

## Run jest test
```
npm test
```

jest tests in Nodejs env, it is totally irrelevant with dumber (which only prepare your code for browser).

There are some config for jest in package.json.
