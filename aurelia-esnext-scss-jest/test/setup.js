import 'aurelia-polyfills';
import {Options} from 'aurelia-loader-nodejs';
Options.relativeToDir = __dirname;

// aurelia-pal-nodejs is what you see from some
// reference aurelia jest setup.
// To use aurelia-pal-nodejs, you need
// testEnvironment: "node" in jest.config.js

// import {globalize} from 'aurelia-pal-nodejs';
// globalize();

// jest actually can work with aurelia-pal-browser
// by default.
import {initialize} from 'aurelia-pal-browser';
initialize();
