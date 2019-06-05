# aurelia2-esnext-naive-aot

An app using dumber bundler to build. More details in `tasks/*.js` (loaded by `gulpfile.js`).

## Run in dev mode, plus watch
```
npm start
```

## Run in production mode, plus watch

It updates index.html with hashed file name.
```
npm run start:prod
```

## Build in dev mode

Generates `scripts/*-bundle.js`
```
npm run build:dev
```

## Build in production mode

Generates `scripts/*-bundle.[hash].js`, update index.html with hashed file name.
```
npm run build
```

## To clear cache

Clear tracing cache by dumber, and transpiling cache by gulp-cache.
```
npm run clear-cache
```
If you touch `.babelrc` file, you'd better do clear cache.

## Nodejs test
```
npm test
```

Details in package.json -> scripts -> pretest & test.
