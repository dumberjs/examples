import 'aurelia-polyfills';
import {Options} from 'aurelia-loader-nodejs';
import path from 'path';
Options.relativeToDir = path.join(__dirname, '..', 'src');
import {globalize} from 'aurelia-pal-nodejs';
globalize();
// ignore css modules
require.extensions['.css'] = () => '';
