var del = require('del');
var {outputDir} = require('./_env');

module.exports = function() {
  return del([outputDir]);
}
