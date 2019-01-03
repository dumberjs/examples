var gulpCache = require('gulp-cache')
var dr = require('./_dumber')

// clear both dumber (tracing) cache, and gulp-cache
module.exports = function () {
  return Promise.all([dr.clearCache(), gulpCache.clearAll()])
}
