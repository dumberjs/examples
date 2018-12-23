# Runtime Composition in Aurelia

This is an advanced demo on runtime composition:
1. host app is in Aurelia
2. host app can load a user provided plugin bundle at runtime.
3. host app creates a new route (in aurelia-router) to show the UI of the dynamically loaded plugin.
3. plugin can be written in any front-end frameworks.

This scenario is very common in desktop app, but very rare in web app. The only reason for the rareness is that all existing major bundlers on the market do not support it. They have no real module loader. You probably could hack your way through, but it is not going to be pretty.

AMD (requirejs) had solved this problem long long time ago. Dumber was built on top of AMD, made runtime composition approachable.

## Technical notes:
1. Host app loads plugin bundle with a patched `define` which add `"plugin-name/"` to all user space modules (but not package space modules) defined in the plugin bundle. Read more about module spaces in [readme of dumber-module-loader](https://github.com/dumberjs/dumber-module-loader).
2. All plugin apps are self runnable, the entry is `src/main.js`. When plugin is working in host app, host app doesn't load `plugin-name/main`, host app loads `plugin-name/plugin` (`src/plugin.js`), this is the convention in this demo.
3. Note when plugin works in host app, the module id gets extra prefix which is different from plugin app running self dev mode. This means in your plugin's code, you need to always use relative module path, for example if you want to import file `src/foo.js` from `src/app.js`, do `import foo from './foo';`, do not do `import foo from 'foo';`. Only relative module path can survive extra prefix.
4. The plugin app should use code split to build two bundles:
  * `plugin-name-bundle` contains all local sources, plus some 3rd party dependencies which the host app might not have.
  * `entry-bundle` contains common npm packages provided by host app, for example, leave all aurelia core packages to entry bundle.
  * note two plugins can bundle duplicated npm packages, both plugin-app-aurelia and plugin-app-vue bundles `lodash`. This is perfectly fine with AMD (requirejs), by default AMD (requirejs) ignores duplicated module definition.
5. `common-ui` is an Aurelia plugin which is loaded by both host app, and plugin-app-aurelia dev app. Note we did not load `common-ui` in `plugin-app-aurelia/src/plugin.js` as host app already provided it.


