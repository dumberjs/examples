/* eslint no-console: 0 */
var gulp = require('gulp')
var bs = require('browser-sync').create()
var historyApiFallback = require('connect-history-api-fallback/lib')

var clean = require('./clean')
var build = require('./build')

// Use browserSync as dev server
const serve = gulp.series(
  build,
  function startServer(done) {
    bs.init({
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
            res.setHeader('Access-Control-Allow-Origin', '*')
            next()
          }
        ]
      }
    }, function(err, bs) {
      if (err) return done(err)
      let urls = bs.options.get('urls').toJS()
      console.log(`Application Available At: ${urls.local}`)
      console.log(`BrowserSync Available At: ${urls.ui}`)
      done()
    })
  }
)

// Reload browserSync
function reload(done) {
  console.log('Refreshing the browser')
  bs.reload()
  done()
}

// Watch all js/html/scss files for rebuild and reload browserSync.
function watch() {
  return gulp.watch('src/**/*.{js,scss}', gulp.series(build, reload))
}

module.exports = gulp.series(
  clean,
  serve,
  watch
)
