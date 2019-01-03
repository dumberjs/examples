var dumber = require('gulp-dumber');
var auDepsFinder = require('aurelia-deps-finder');
var fs = require('fs');
var {isProduction, outputDir} = require('./_env');

module.exports = dumber({
  // src folder is by default "src".
  // src: 'src',

  // requirejs baseUrl, dumber default is "/dist"
  baseUrl: outputDir,

  // can turn off cache for production build
  // cache: !isProduction,

  // entry bundle name, dumber default is "entry-bundle"
  entryBundle: 'vendor-bundle',

  // The special depsFinder to teach dumber about Aurelia convention.
  // Aurelia needs this special treatment because heavy convention.
  // No need for other frameworks like Vue/React/...
  depsFinder: auDepsFinder,

  // Turn on hash for production build
  hash: isProduction,

  // Note prepend/append only affects entry bundle.

  // prepend before amd loader.
  // dumber-module-loader is injected automatically by dumber bundler after prepends.
  // Here we load all jasmine stuff in global name space in test mode.
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
  codeSplit: function(moduleId, packageName) {
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
  onManifest: function(filenameMap) {
    // Update index.html vendor-bundle.js with vendor-bundle.hash...js
    console.log('Update index.html with ' + filenameMap['vendor-bundle.js']);
    const indexHtml = fs.readFileSync('_index.html').toString()
      .replace('vendor-bundle.js', filenameMap['vendor-bundle.js']);

    fs.writeFileSync('index.html', indexHtml);
  }
});