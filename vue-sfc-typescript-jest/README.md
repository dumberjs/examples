# Vue SFC (.vue Single File Component) TypeScript jest

Demo app for dumber bundler. More details in `tasks/*.js` (loaded by `gulpfile.js`).

Used example code from app skeleton by vue-cli.

It uses [`gulp-vue-file`](https://github.com/dumberjs/gulp-vue-file) to process `.vue` files.

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
Note there is jest config in `package.json` to support `.vue` files.
```
"jest": {
  "moduleFileExtensions": ["js", "json", "vue"],
  "transform": {
    "^.+\\.js$": "babel-jest",
    "^.+\\.vue$": "vue-jest"
  }
}
```
