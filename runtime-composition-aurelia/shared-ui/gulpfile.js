exports.build = require('./tasks/build');
exports['build-plugin'] = require('./tasks/build-plugin');
exports.clean = require('./tasks/clean');
exports['clear-cache'] = require('./tasks/clear-cache');
exports.run = require('./tasks/run');
// default gulp task is "run"
exports.default = exports.run;
