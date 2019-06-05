const gulpCache = require('gulp-cache');
const dr = require('./_dumber');

// clear both dumber (tracing) cache, and gulp-cache
module.exports = function () {
  return Promise.all([dr.clearCache(), gulpCache.clearAll()]);
}
