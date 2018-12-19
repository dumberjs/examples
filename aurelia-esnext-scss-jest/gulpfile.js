var gulp = require('gulp');
var del = require('del');
var changedInPlace = require('gulp-changed-in-place');
var babel = require('gulp-babel');
var plumber = require('gulp-plumber');
var dumber = require('gulp-dumber');
var merge2 = require('merge2');
var fs = require('fs');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var preprocess = require('gulp-preprocess');
var autoprefixer = require('autoprefixer');
var gulpif = require('gulp-if');
var terser = require('gulp-uglify-es').default;
var gulpCache = require('gulp-cache');
var auDepsFinder = require('aurelia-deps-finder');
var browserSync = require('browser-sync');
var historyApiFallback = require('connect-history-api-fallback/lib');

const isProduction = process.env.NODE_ENV === 'production';

const dr = dumber({
  // src folder is by default "src".
  // src: 'src',

  // requirejs baseUrl, dumber default is "/dist"
  baseUrl: 'scripts',

  // can turn off cache for production build
  // cache: !isProduction,

  // entry bundle name, dumber default is "entry-bundle"
  entryBundle: 'vendor-bundle',

  // The special depsFinder to teach dumber about Aurelia convention.
  // Aurelia needs this special treatment because heavy convention.
  // No need for other frameworks like Vue/React/...
  depsFinder: auDepsFinder,

  // Turn on hash for production build
  hash: isProduction && !isTest,

  // Note prepend/append/deps only affects entry bundle.

  // prepend before amd loader.
  // dumber-module-loader is injected automatically by dumber bundler after prepends.
  // prepend: [],

  // append after amd loader and all module definitions in entry bundle.
  // append: [],

  // Explicit dependencies, can use either "deps" (short name) or "dependencies" (full name).
  // Here we load Aurelia packages which are not explicitly required by user code.
  // No need for other frameworks like Vue/React/...
  deps: [
    "aurelia-bootstrapper",
    "aurelia-loader-default",
    "aurelia-pal-browser"
  ],

  // Code split is the feature that dumber really kicks ass.
  // code split asks you for a bundle name of every module, it gives you
  // two parameters:
  // moduleId:
  //   for local src file "src/foo/bar.js", the module id is "foo/bar"
  //   for local src file "src/foo/bar.css" (or any other non-js file), the module id is "foo/bar.css"
  //   for npm package file "node_modules/foo/bar.js", the module id is "foo/bar"
  // packageName:
  //   for any local src file, the package name is undefined
  //   for npm package file "node_modules/foo/bar.js", the package name is "foo"
  //   for npm package file "node_modules/@scoped/foo/bar.js", the package name is "@scoped/foo"

  // Here we skip code splitting in test mode.
  codeSplit: isTest ? undefined : function(moduleId, packageName) {
    // Here for any local src, put into app-bundle
    if (!packageName) return 'app-bundle';
    // The codeSplit func does not need to return a valid bundle name.
    // For any undefined return, dumber put the module into entry bundle,
    // this means no module can skip bundling.
  },

  // onManifest is an optional callback, it provides a file name map like:
  // {
  //   "some-bundle.js": "some-bundle.1234.js",
  //   "other-bundle.js": "other-bundle.3455.js"
  // }
  // Or when hash if off
  // {
  //   "some-bundle.js": "some-bundle.js",
  //   "other-bundle.js": "other-bundle.js"
  // }
  // If you turned on hash, you need this callback to update index.html
  onManifest: isTest ? undefined : function(filenameMap) {
    // Update index.html vendor-bundle.js with vendor-bundle.hash...js
    console.log('Update index.html with ' + filenameMap['vendor-bundle.js']);
    const indexHtml = fs.readFileSync('_index.html').toString()
      .replace('vendor-bundle.js', filenameMap['vendor-bundle.js']);

    fs.writeFileSync('index.html', indexHtml);
  }
});

// clear both dumber (tracing) cache, and gulp-cache
function clearCache() {
  return Promise.all([dr.clearCache(), gulpCache.clearAll()]);
}

exports['clear-cache'] = clearCache;

function buildJs(src) {
  let transpile = babel();
  // Use gulp-cache if not in production mode
  if (!isProduction) {
    transpile = gulpCache(transpile, {name: 'aurelia-esnext-scss-jasmine'});
  }

  // Note with gulp v4, gulp.src and gulp.dest supports sourcemaps directly
  // we don't need gulp-sourcemaps any more.
  return gulp.src(src, {sourcemaps: !isProduction})
  .pipe(gulpif(!isProduction, plumber()))
  // Read src/main.js
  // We use gulp-preprocess to preprocess main.js. So we don't need any
  // conditional plugin loading which creates extra trouble for tracer/bundler.
  // With this preprocessed static plugin loading, aurelia-testing is
  // auto-traced in test mode, but not in any other env.
  .pipe(preprocess({context: {isProduction, isTest}}))
  // In watch mode, use gulp-changed-in-place to send only updated files
  .pipe(changedInPlace({firstPass: true}))
  .pipe(transpile);
}

function buildCss(src) {
  return gulp.src(src, {sourcemaps: !isProduction})
  .pipe(changedInPlace({firstPass: true}))
  .pipe(sass().on('error', sass.logError))
  .pipe(postcss([autoprefixer()]));
}

function buildHtml(src) {
  return gulp.src(src)
  .pipe(changedInPlace({firstPass: true}));
}

function buildWasm(src) {
  return gulp.src(src)
  .pipe(changedInPlace({firstPass: true}));
}

function build() {
  // Merge all js/css/html file streams to feed greedy dumber.
  // Note scss was transpiled to css file by gulp-sass.
  // dumber knows nothing about .ts/.less/.scss/.md files,
  // gulp-* plugins transpiled them into js/css/html before
  // sending to dumber.
  return merge2(
    // Note we only pack src/test/ folder in test mode
    // You don't have to use a folder for test code,
    // For example, you can do ['src/**/*.js', '!src/**/*.spec.js']
    // when you put test code comp.spec.js side by side with comp.js.
    buildJs(isTest ? 'src/**/*.js' : ['src/**/*.js', '!src/test/**/*.js']),
    buildCss('src/**/*.scss'),
    buildHtml('src/**/*.html'),
    buildWasm('src/**/*.wasm')
  )

  // Note we did extra call `dr()` here, this is designed to cater watch mode.
  // dumber here consumes (swallows) all incoming Vinyl files,
  // Then generates new Vinyl files for all output bundle files.
  .pipe(dr())

  // Want minify? Sure, gulp can do it, dumber is too dumb to do it.
  // Terser fast minify mode
  // https://github.com/terser-js/terser#terser-fast-minify-mode
  // It's a good balance on size and speed to turn off compress.
  .pipe(gulpif(isProduction, terser({compress: false})))

  // Want to write bundle files? Sure, gulp can do it, dumber is too dumb to do it.
  .pipe(gulp.dest('scripts', {sourcemaps: !isProduction}));
}

exports.build = build;

// Clean up scripts folder.
function clean() { return del(['scripts']); }
exports.clean = clean;

// Use browserSync as dev server
const serve = gulp.series(
  build,
  function startServer(done) {
    browserSync({
      ghostMode: false,
      online: false,
      open: true,
      logLevel: 'silent', // or 'debug'
      server: {
        baseDir: ['.'],
        middleware: [
          // connect-history-api-fallback is a tool to help SPA dev.
          // So in dev mode, http://localhost:port/some/route will get
          // the same /index.html as content, instead off 404 at /some/route.html
          historyApiFallback(),
          function(req, res, next) {
            res.setHeader('Access-Control-Allow-Origin', '*');
            next();
          }
        ]
      }
    }, function(err, bs) {
      if (err) return done(err);
      let urls = bs.options.get('urls').toJS();
      console.log(`Application Available At: ${urls.local}`);
      console.log(`BrowserSync Available At: ${urls.ui}`);
      done();
    });
  }
)

// Reload browserSync
function reload(done) {
  console.log('Refreshing the browser');
  browserSync.reload();
  done();
}

// Watch all js/html/scss files for rebuild and reload browserSync.
function watch() {
  return gulp.watch('src/**/*.{js,html,scss}', gulp.series(build, reload));
}

const run = gulp.series(
  clean,
  serve,
  watch
);

exports.run = run;
