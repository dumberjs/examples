# Connected React Router + scss + jest

Demo app for dumber bundler. More details in `gulpfile.js`.

Used example code from https://github.com/supasate/connected-react-router/tree/master/examples/basic

Note Hot Module Reload is not hooked up. No support of HMR in dumber yet.

In App.js, we support `import './App.css';` to inject css to html head. Check `injectCss` option in `gulpfile.js`, it also shows the usage of `postcss-url` in gulp to replace css `url()` with inline base64 string. This behaves very similar with webpack's style-loader.

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

