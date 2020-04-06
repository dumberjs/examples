# demo-copy-fonts

This demo shows how to copy resource files (images or fonts) through gulp to satisfy CSS library.

In `src/main.js`,

```js
import '@fortawesome/fontawesome-free/css/all.min.css';
```

In `tasks/build.js`,

```js
function copyFonts() {
  return gulp.src('node_modules/@fortawesome/fontawesome-free/webfonts/*')
    .pipe(gulp.dest('@fortawesome/fontawesome-free/webfonts/'));
}

module.exports = gulp.series(copyFonts, build);
```

Note the fonts dest folder matches the import in JavaScript.

In `.gitignore`, added `/@fortawesome`.

-----

An app using dumber bundler to build. More details in `tasks/*.js` (loaded by `gulpfile.js`).

## Run in dev mode, plus watch

    npm start

## Run in production mode, plus watch

It updates index.html with hashed file name.

    npm run start:prod

## Build in dev mode

Generates `dist/*-bundle.js`

    npm run build:dev

## Build in production mode

Generates `dist/*-bundle.[hash].js`, update index.html with hashed file name.

    npm run build

## To clear cache

Clear tracing cache. In rare situation, you might need to run clear-cache after upgrading to new version of dumber bundler.

    npm run clear-cache

## Headless browser (electron) test

    npm test

Details in package.json -> scripts -> pretest & test.

## Visible browser (chrome) test

    npm run browser-test

This runs in Chrome, if you want to use other browser, update package.json "browser-test" script. Read [browser-do](https://github.com/3cp/browser-do) for available browsers.

By default, browser-do closes the browser after tests finish, to keep browser running, use `--keep-open` option on browser-do command.

## Code coverage

    npm run coverage

Then open `coverage/lcov-report/index.html` for detailed report.

