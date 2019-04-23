/* eslint no-console: 0 */
var dumber = require('gulp-dumber')
var fs = require('fs')
var {isProduction} = require('./_env')

module.exports = dumber({
  // src folder is by default "src".
  // src: 'src',

  // requirejs baseUrl, dumber default is "/dist"
  // baseUrl: '/dist',

  // can turn off cache for production build
  // cache: !isProduction,

  // entry bundle name, dumber default is "entry-bundle"
  // entryBundle: 'entry-bundle',

  // Turn on hash for production build
  hash: isProduction,

  // Note prepend/append only affects entry bundle.

  // prepend before amd loader.
  // dumber-module-loader is injected automatically by dumber bundler after prepends.
  // prepend: [],

  // append after amd loader and all module definitions in entry bundle.
  // append: [],

  // Explicit dependencies, can use either "deps" (short name) or "dependencies" (full name).
  // No need for other frameworks like Vue/React/...
  // deps: [],

  // Code split is intuitive and flexible.
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
  codeSplit: function() {
    // put everything in extension-react.js
    return 'extension-react'
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
    // Update index.html entry-bundle.js with entry-bundle.hash...js
    console.log('Update index.html with ' + filenameMap['entry-bundle.js'])
    const indexHtml = fs.readFileSync('_index.html').toString()
      .replace('entry-bundle.js', filenameMap['entry-bundle.js'])

    fs.writeFileSync('index.html', indexHtml)
  }
})
