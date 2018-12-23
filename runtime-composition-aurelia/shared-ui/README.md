# shared-ui

This is a demo Aurelia plugin that is shared by both `host-app` and `plugin-app-aurelia`.

Note `plugin-app-aurelia` loads this plugin in `src/main.js` (for plugin dev environment), but not in `src/plugin.js` (the entry module for be loaded by `host-app`) because `host-app` already loaded the plugin.

All normal gulp commands apply. Plus one: `npx gulp build-plugin`.

`build-plugin` task simply builds all files from `src/shared-ui/` to `dist/` folder. All other files in `src/` folder are for development environment only.

This aurelia plugin setup is very similar with https://github.com/aurelia-contrib/aurelia-getting-started/blob/master/guides/how-to-use-cli-to-develop-plugin.md

But here we didn't use aurelia-cli, we use dumber bundler.
