# Runtime Composition in Aurelia

This is an advanced demo on runtime composition:
1. host app is in Aurelia
2. host app can load a user provided extension bundle at runtime.
3. host app creates a new route (in aurelia-router) to show the UI of the dynamically loaded extension.
3. extension can be written in any front-end frameworks.

This scenario is very common in desktop app, but very rare in web app. The only reason for the rareness is that all existing major bundlers on the market do not support it. They have no real module loader. You probably could hack your way through with other bundlers, but it is not going to be pretty.

AMD (requirejs) had solved this problem long long time ago. Dumber is built on top of AMD, made runtime composition approachable.

## To run the demo
```
npm i
npx gulp
```
This will start to build all sub projects, it will take a while. Then it will run host-app, automatically open it in browser.

There are three extensions (written in aurelia/vue/react) you can load into host-app. Try the button to fill up the form, then click "load" button.

## Technical notes:
1. Host app loads extension bundle with a patched `define` which add `"extension-name/"` to all user space modules (but not package space modules) defined in the extension bundle. Read more about module spaces in [readme of dumber-module-loader](https://github.com/dumberjs/dumber-module-loader).
2. All extension apps are self runnable, the entry is `src/main.js`. When extension is working in host app, host app doesn't load `extension-name/main`, host app loads `extension-name/extension` (`src/extension.js`), this is the convention in this demo.
  * you can go into every sub project folder, do `npx gulp` to run it in dev mode.
3. Note when extension works in host app, the module id gets extra prefix which is different from extension app running in self dev mode. This means in your extension's code, you need to always use relative module path, for example if you want to import file `src/foo.js` from `src/app.js`, do `import foo from './foo';`, do not do `import foo from 'foo';`. Only relative module path can survive extra prefix.
4. The extension app should use code split to build two bundles:
  * `extension-name` contains all local sources, plus some 3rd party dependencies which the host app might not have.
  * `entry-bundle` contains common npm packages provided by host app, for example, leave all aurelia core packages to entry bundle.
    - note in case of extension in vue/react/..., there is no common npm packages left in `entry-bundle`. The entry-bundle merely contains dumber-module-loader and requirejs config.
  * note two extensions can bundle duplicated npm packages. This is perfectly fine with AMD (requirejs), by default AMD (requirejs) ignores duplicated module definition.
5. `common-ui` is an Aurelia plugin which is loaded by both host app, and extension-app-aurelia dev app. Note we did not load `common-ui` in `extension-app-aurelia/src/extension.js` as host app already provided it.


