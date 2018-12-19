module.exports = {
  // This is to teach jest(actually NODE_PATH) where to load an aurelia module,
  // when aurelia-loader requests module "a/b",
  // jest will try src/a/b.js.
  modulePaths: [
    "<rootDir>/src",
    "<rootDir>/node_modules"
  ],

  // To load aurelia-loader-nodejs and aurelia-pal-browser
  setupFiles: [
    "<rootDir>/src/test/setup.js"
  ],

  // Note different from normal aurelia jest setup
  // we didn't use testEnvironment: "node",
  // we use default testEnvironment: "jsdom".
  // Because in src/test/setup.js, we load aurelia-pal-browser
  // not aurelia-pal-nodejs.

  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.js', '!src/test/*.js']
};