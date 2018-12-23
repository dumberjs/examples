define.switchToUserSpace();
define('app',['require','exports','module','aurelia-event-aggregator','aurelia-framework'],function (require, exports, module) {
"use strict";

exports.__esModule = true;
exports.App = void 0;

var _aureliaEventAggregator = require("aurelia-event-aggregator");

var _aureliaFramework = require("aurelia-framework");

var _dec, _class;

var App = (_dec = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator), _dec(_class =
/*#__PURE__*/
function () {
  function App(ea) {
    this.ea = ea;
  }

  var _proto = App.prototype;

  _proto.bind = function bind() {
    var _this = this;

    this.ea.subscribe('plugin:loaded', function (pluginName) {
      _this.router.addRoute({
        route: pluginName,
        name: pluginName,
        title: pluginName,
        nav: true,
        moduleId: './load-foreign-plugin',
        settings: {
          pluginName: pluginName
        },
        // always replace for load-foreign-plugin
        activationStrategy: 'replace'
      }); // reload navigation menu


      _this.router.refreshNavigation();
    });
  };

  _proto.configureRouter = function configureRouter(config, router) {
    this.router = router;
    config.title = 'Composition Demo';
    config.options.pushState = true;
    config.options.root = "/";
    config.map([{
      route: '',
      name: 'home',
      title: 'Home',
      nav: true,
      moduleId: './home'
    }]);
  };

  return App;
}()) || _class);
exports.App = App;
});

define('text!app.css',function(){return "body {\n  margin: 0; }\n  body .demo {\n    margin: 1rem; }\n\na.menu-link {\n  margin: 1rem;\n  font-size: 2rem;\n  text-decoration: none; }\n  a.menu-link.active {\n    font-weight: bold;\n    color: blue; }\n";});
define('text!app.html',function(){return "<template>\n  <require from=\"./app.css\"></require>\n\n  <div class=\"demo\">\n    <a\n      repeat.for=\"row of router.navigation\"\n      href.bind=\"row.href\"\n      class=\"menu-link ${row.isActive ? 'active' : ''}\"\n    >${row.title}</a>\n\n    <div>\n      <router-view></router-view>\n    </div>\n  </div>\n</template>\n";});
define('home',['require','exports','module','aurelia-event-aggregator','aurelia-framework','dumber-module-loader/dist/id-utils'],function (require, exports, module) {var global = this;
"use strict";

exports.__esModule = true;
exports.Home = void 0;

var _aureliaEventAggregator = require("aurelia-event-aggregator");

var _aureliaFramework = require("aurelia-framework");

var _idUtils = require("dumber-module-loader/dist/id-utils");

var _dec, _class, _temp;

// only apply name space for user module space
function makeNamespacedDefine(namespace) {
  var wrapped = function wrapped(moduleId, deps, cb) {
    if (global.define.currentSpace() === 'user') {
      var parsed = (0, _idUtils.parse)(moduleId);
      return global.define(parsed.prefix + namespace + '/' + parsed.bareId, deps, cb);
    } else {
      global.define(moduleId, deps, cb);
    }
  };

  wrapped.switchToUserSpace = global.define.switchToUserSpace;
  wrapped.switchToPackageSpace = global.define.switchToPackageSpace;
  return wrapped;
}

var Home = (_dec = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator), _dec(_class = (_temp =
/*#__PURE__*/
function () {
  function Home(ea) {
    this.pluginName = '';
    this.pluginUrl = '';
    this.error = '';
    this.isLoading = false;
    this.loadedPlugins = [];
    this.ea = ea;
  }

  var _proto = Home.prototype;

  _proto.fillupAu = function fillupAu() {
    this.pluginName = 'plugin-au';
    this.pluginUrl = '/plugin-app-aurelia/scripts/plugin-au.js';
  };

  _proto.fillupVue = function fillupVue() {
    this.pluginName = 'plugin-vue';
    this.pluginUrl = '/plugin-app-vue/scripts/plugin-vue.js';
  };

  _proto.fillupReact = function fillupReact() {
    this.pluginName = 'plugin-react';
    this.pluginUrl = '/plugin-app-react/scripts/plugin-react.js';
  };

  _proto.loadPlugin = function loadPlugin() {
    var _this = this;

    var pluginName = this.pluginName,
        pluginUrl = this.pluginUrl,
        loadedPlugins = this.loadedPlugins;
    if (!pluginName || !pluginUrl) return;

    if (loadedPlugins.indexOf(pluginName) !== -1) {
      this.error = "Plugin \"" + pluginName + "\" has already been loaded.";
      return;
    }

    this.error = '';
    this.isLoading = true;
    fetch(pluginUrl).then(function (response) {
      if (response.ok) {
        return response.text();
      }

      throw new Error(response.status + " " + response.statusText);
    }).then(function (bundle) {
      var func = new Function('define', bundle).bind(global);
      func(makeNamespacedDefine(pluginName));
      loadedPlugins.push(pluginName);

      _this.ea.publish('plugin:loaded', pluginName);
    }).catch(function (err) {
      console.log('err', err);
      _this.error = err.message;
      console.error(err.stack);
    }).then(function () {
      _this.isLoading = false;
    });
  };

  return Home;
}(), _temp)) || _class);
exports.Home = Home;
});

define('text!home.html',function(){return "<template>\n  <banner>\n    This is a demo for runtime composition, the layout of this banner is provided by a plugin \"shared-ui\".<br>\n    The \"shared-ui\" is reused in \"plugin-app-aurelia\" which you can load into this app.\n  </banner>\n\n  <banner if.bind=\"error\" type=\"warning\">${error}</banner>\n\n  <h4>Load a plugin</h4>\n  <p>Note in real app, a plugin should provide both backend and front-end logic, following params should be provided by the meta-data of the plugin.</p>\n\n  <button click.trigger=\"fillupAu()\">Fill up info for plugin-app-aurelia</button>\n  <button click.trigger=\"fillupVue()\">Fill up info for plugin-app-vue</button>\n  <button click.trigger=\"fillupReact()\">Fill up info for plugin-app-react</button>\n  <br>\n  <div>Plugin Name</div>\n  <input type=\"text\" style=\"width:20rem;\" value.bind=\"pluginName\"><br>\n  <div>Plugin Bundle file URL</div>\n  <input type=\"text\" style=\"width:20rem;\" value.bind=\"pluginUrl\"><br>\n  <button disabled.bind=\"!pluginName || !pluginUrl || isLoading\" click.trigger=\"loadPlugin()\">Load</button>\n\n</template>\n";});
define('load-foreign-plugin',['require','exports','module','aurelia-framework','dumber-module-loader/dist/id-utils'],function (require, exports, module) {
"use strict";

exports.__esModule = true;
exports.LoadForeignPlugin = void 0;

var _aureliaFramework = require("aurelia-framework");

var _idUtils = require("dumber-module-loader/dist/id-utils");

var _dec, _class, _temp;

var LoadForeignPlugin = (_dec = (0, _aureliaFramework.inject)(_aureliaFramework.Aurelia), _dec(_class = (_temp =
/*#__PURE__*/
function () {
  function LoadForeignPlugin(au) {
    this.moduleId = void 0;
    this.au = au;
  }

  var _proto = LoadForeignPlugin.prototype;

  _proto.activate = function activate(params, routeConfig) {
    var _this = this;

    var name = routeConfig.settings.pluginName;
    var moduleId;
    var entry = name + '/plugin'; // load the entry module by convention,
    // all foreign plugins need to take control of the
    // <div id="plugin"></div> in ./load-foreign-plugin.html

    return requirejs([entry]).then(function (results) {
      var plugin = results[0]; // only plugin written in aurelia has entry moduleId

      moduleId = plugin.moduleId; // other plugin (vue/react) has to enhance <div id="plugin"></div>

      var config = new _aureliaFramework.FrameworkConfiguration(_this.au); // plugin can load more aurelia plugins

      return Promise.resolve(plugin.configure(config)).then(function () {
        return config.apply();
      });
    }).then(function () {
      // only capture moduleId after configure is done
      _this.moduleId = (0, _idUtils.resolveModuleId)(entry, moduleId);
    });
  };

  return LoadForeignPlugin;
}(), _temp)) || _class);
exports.LoadForeignPlugin = LoadForeignPlugin;
});

define('text!load-foreign-plugin.html',function(){return "<template>\n  <div id=\"plugin\"></div>\n  <compose if.bind=\"moduleId\" view-model.bind=\"moduleId\"></compose>\n</template>";});
define('main',['require','exports','module','aurelia-pal','@babel/polyfill'],function (require, exports, module) {
"use strict";

exports.__esModule = true;
exports.configure = configure;

var _aureliaPal = require("aurelia-pal");

require("@babel/polyfill");

// Use dumber-module-loader,
// This bit will be added to aurelia-loader-default
_aureliaPal.PLATFORM.eachModule = function (callback) {
  var defined = _aureliaPal.PLATFORM.global.requirejs.definedValues();

  for (var key in defined) {
    try {
      if (callback(key, defined[key])) return;
    } catch (e) {//
    }
  }
};

function configure(aurelia) {
  aurelia.use.standardConfiguration();
  aurelia.use.developmentLogging('info');
  aurelia.use.plugin('shared-ui');
  return aurelia.start().then(function () {
    return aurelia.setRoot();
  });
}
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImhvbWUuanMiLCJsb2FkLWZvcmVpZ24tcGx1Z2luLmpzIiwibWFpbi5qcyJdLCJuYW1lcyI6WyJBcHAiLCJFdmVudEFnZ3JlZ2F0b3IiLCJlYSIsImJpbmQiLCJzdWJzY3JpYmUiLCJwbHVnaW5OYW1lIiwicm91dGVyIiwiYWRkUm91dGUiLCJyb3V0ZSIsIm5hbWUiLCJ0aXRsZSIsIm5hdiIsIm1vZHVsZUlkIiwic2V0dGluZ3MiLCJhY3RpdmF0aW9uU3RyYXRlZ3kiLCJyZWZyZXNoTmF2aWdhdGlvbiIsImNvbmZpZ3VyZVJvdXRlciIsImNvbmZpZyIsIm9wdGlvbnMiLCJwdXNoU3RhdGUiLCJyb290IiwibWFwIiwibWFrZU5hbWVzcGFjZWREZWZpbmUiLCJuYW1lc3BhY2UiLCJ3cmFwcGVkIiwiZGVwcyIsImNiIiwiZ2xvYmFsIiwiZGVmaW5lIiwiY3VycmVudFNwYWNlIiwicGFyc2VkIiwicHJlZml4IiwiYmFyZUlkIiwic3dpdGNoVG9Vc2VyU3BhY2UiLCJzd2l0Y2hUb1BhY2thZ2VTcGFjZSIsIkhvbWUiLCJwbHVnaW5VcmwiLCJlcnJvciIsImlzTG9hZGluZyIsImxvYWRlZFBsdWdpbnMiLCJmaWxsdXBBdSIsImZpbGx1cFZ1ZSIsImZpbGx1cFJlYWN0IiwibG9hZFBsdWdpbiIsImluZGV4T2YiLCJmZXRjaCIsInRoZW4iLCJyZXNwb25zZSIsIm9rIiwidGV4dCIsIkVycm9yIiwic3RhdHVzIiwic3RhdHVzVGV4dCIsImJ1bmRsZSIsImZ1bmMiLCJGdW5jdGlvbiIsInB1c2giLCJwdWJsaXNoIiwiY2F0Y2giLCJlcnIiLCJjb25zb2xlIiwibG9nIiwibWVzc2FnZSIsInN0YWNrIiwiTG9hZEZvcmVpZ25QbHVnaW4iLCJBdXJlbGlhIiwiYXUiLCJhY3RpdmF0ZSIsInBhcmFtcyIsInJvdXRlQ29uZmlnIiwiZW50cnkiLCJyZXF1aXJlanMiLCJyZXN1bHRzIiwicGx1Z2luIiwiRnJhbWV3b3JrQ29uZmlndXJhdGlvbiIsIlByb21pc2UiLCJyZXNvbHZlIiwiY29uZmlndXJlIiwiYXBwbHkiLCJQTEFURk9STSIsImVhY2hNb2R1bGUiLCJjYWxsYmFjayIsImRlZmluZWQiLCJkZWZpbmVkVmFsdWVzIiwia2V5IiwiZSIsImF1cmVsaWEiLCJ1c2UiLCJzdGFuZGFyZENvbmZpZ3VyYXRpb24iLCJkZXZlbG9wbWVudExvZ2dpbmciLCJzdGFydCIsInNldFJvb3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7OztJQUdhQSxHLFdBRFosOEJBQU9DLHVDQUFQLEM7OztBQUVDLGVBQVlDLEVBQVosRUFBZ0I7QUFDZCxTQUFLQSxFQUFMLEdBQVVBLEVBQVY7QUFDRDs7OztTQUVEQyxJLEdBQUEsZ0JBQU87QUFBQTs7QUFDTCxTQUFLRCxFQUFMLENBQVFFLFNBQVIsQ0FBa0IsZUFBbEIsRUFBbUMsVUFBQUMsVUFBVSxFQUFJO0FBQy9DLE1BQUEsS0FBSSxDQUFDQyxNQUFMLENBQVlDLFFBQVosQ0FBcUI7QUFDbkJDLFFBQUFBLEtBQUssRUFBRUgsVUFEWTtBQUVuQkksUUFBQUEsSUFBSSxFQUFFSixVQUZhO0FBR25CSyxRQUFBQSxLQUFLLEVBQUVMLFVBSFk7QUFJbkJNLFFBQUFBLEdBQUcsRUFBRSxJQUpjO0FBS25CQyxRQUFBQSxRQUFRLEVBQUUsdUJBTFM7QUFNbkJDLFFBQUFBLFFBQVEsRUFBRTtBQUFDUixVQUFBQSxVQUFVLEVBQUVBO0FBQWIsU0FOUztBQU9uQjtBQUNBUyxRQUFBQSxrQkFBa0IsRUFBRTtBQVJELE9BQXJCLEVBRCtDLENBWS9DOzs7QUFDQSxNQUFBLEtBQUksQ0FBQ1IsTUFBTCxDQUFZUyxpQkFBWjtBQUNELEtBZEQ7QUFlRCxHOztTQUVEQyxlLEdBQUEseUJBQWdCQyxNQUFoQixFQUF3QlgsTUFBeEIsRUFBZ0M7QUFDOUIsU0FBS0EsTUFBTCxHQUFjQSxNQUFkO0FBRUFXLElBQUFBLE1BQU0sQ0FBQ1AsS0FBUCxHQUFlLGtCQUFmO0FBQ0FPLElBQUFBLE1BQU0sQ0FBQ0MsT0FBUCxDQUFlQyxTQUFmLEdBQTJC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LENBQWIsQ0FBWixFQUFpQztBQUNsQyxLQUZELENBRUUsT0FBT0MsQ0FBUCxFQUFVLENBQ1Y7QUFDRDtBQUNGO0FBQ0YsQ0FURDs7QUFXTyxTQUFTUixTQUFULENBQW1CUyxPQUFuQixFQUE0QjtBQUNqQ0EsRUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVlDLHFCQUFaO0FBRUFGLEVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZRSxrQkFBWixDQUErQixNQUEvQjtBQUdBSCxFQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWWQsTUFBWixDQUFtQixXQUFuQjtBQUVBLFNBQU9hLE9BQU8sQ0FBQ0ksS0FBUixHQUFnQjVDLElBQWhCLENBQXFCO0FBQUEsV0FBTXdDLE9BQU8sQ0FBQ0ssT0FBUixFQUFOO0FBQUEsR0FBckIsQ0FBUDtBQUNEIiwiZmlsZSI6ImFwcC1idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0V2ZW50QWdncmVnYXRvcn0gZnJvbSAnYXVyZWxpYS1ldmVudC1hZ2dyZWdhdG9yJztcbmltcG9ydCB7aW5qZWN0fSBmcm9tICdhdXJlbGlhLWZyYW1ld29yayc7XG5cbkBpbmplY3QoRXZlbnRBZ2dyZWdhdG9yKVxuZXhwb3J0IGNsYXNzIEFwcCB7XG4gIGNvbnN0cnVjdG9yKGVhKSB7XG4gICAgdGhpcy5lYSA9IGVhO1xuICB9XG5cbiAgYmluZCgpIHtcbiAgICB0aGlzLmVhLnN1YnNjcmliZSgncGx1Z2luOmxvYWRlZCcsIHBsdWdpbk5hbWUgPT4ge1xuICAgICAgdGhpcy5yb3V0ZXIuYWRkUm91dGUoe1xuICAgICAgICByb3V0ZTogcGx1Z2luTmFtZSxcbiAgICAgICAgbmFtZTogcGx1Z2luTmFtZSxcbiAgICAgICAgdGl0bGU6IHBsdWdpbk5hbWUsXG4gICAgICAgIG5hdjogdHJ1ZSxcbiAgICAgICAgbW9kdWxlSWQ6ICcuL2xvYWQtZm9yZWlnbi1wbHVnaW4nLFxuICAgICAgICBzZXR0aW5nczoge3BsdWdpbk5hbWU6IHBsdWdpbk5hbWV9LFxuICAgICAgICAvLyBhbHdheXMgcmVwbGFjZSBmb3IgbG9hZC1mb3JlaWduLXBsdWdpblxuICAgICAgICBhY3RpdmF0aW9uU3RyYXRlZ3k6ICdyZXBsYWNlJ1xuICAgICAgfSk7XG5cbiAgICAgIC8vIHJlbG9hZCBuYXZpZ2F0aW9uIG1lbnVcbiAgICAgIHRoaXMucm91dGVyLnJlZnJlc2hOYXZpZ2F0aW9uKCk7XG4gICAgfSk7XG4gIH1cblxuICBjb25maWd1cmVSb3V0ZXIoY29uZmlnLCByb3V0ZXIpIHtcbiAgICB0aGlzLnJvdXRlciA9IHJvdXRlcjtcblxuICAgIGNvbmZpZy50aXRsZSA9ICdDb21wb3NpdGlvbiBEZW1vJztcbiAgICBjb25maWcub3B0aW9ucy5wdXNoU3RhdGUgPSB0cnVlO1xuICAgIGNvbmZpZy5vcHRpb25zLnJvb3QgPSBcIi9cIjtcblxuICAgIGNvbmZpZy5tYXAoW1xuICAgICAge3JvdXRlOiAnJywgbmFtZTogJ2hvbWUnLCB0aXRsZTogJ0hvbWUnLCBuYXY6IHRydWUsIG1vZHVsZUlkOiAnLi9ob21lJ30sXG4gICAgXSk7XG5cbiAgfVxufSIsImltcG9ydCB7RXZlbnRBZ2dyZWdhdG9yfSBmcm9tICdhdXJlbGlhLWV2ZW50LWFnZ3JlZ2F0b3InO1xuaW1wb3J0IHtpbmplY3R9IGZyb20gJ2F1cmVsaWEtZnJhbWV3b3JrJztcbmltcG9ydCB7cGFyc2V9IGZyb20gJ2R1bWJlci1tb2R1bGUtbG9hZGVyL2Rpc3QvaWQtdXRpbHMnO1xuXG4vLyBvbmx5IGFwcGx5IG5hbWUgc3BhY2UgZm9yIHVzZXIgbW9kdWxlIHNwYWNlXG5mdW5jdGlvbiBtYWtlTmFtZXNwYWNlZERlZmluZShuYW1lc3BhY2UpIHtcbiAgY29uc3Qgd3JhcHBlZCA9IGZ1bmN0aW9uKG1vZHVsZUlkLCBkZXBzLCBjYikge1xuICAgIGlmIChnbG9iYWwuZGVmaW5lLmN1cnJlbnRTcGFjZSgpID09PSAndXNlcicpIHtcbiAgICAgIGNvbnN0IHBhcnNlZCA9IHBhcnNlKG1vZHVsZUlkKTtcbiAgICAgIHJldHVybiBnbG9iYWwuZGVmaW5lKHBhcnNlZC5wcmVmaXggKyBuYW1lc3BhY2UgKyAnLycgKyBwYXJzZWQuYmFyZUlkLCBkZXBzLCBjYik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGdsb2JhbC5kZWZpbmUobW9kdWxlSWQsIGRlcHMsIGNiKTtcbiAgICB9XG4gIH1cblxuICB3cmFwcGVkLnN3aXRjaFRvVXNlclNwYWNlID0gZ2xvYmFsLmRlZmluZS5zd2l0Y2hUb1VzZXJTcGFjZTtcbiAgd3JhcHBlZC5zd2l0Y2hUb1BhY2thZ2VTcGFjZSA9IGdsb2JhbC5kZWZpbmUuc3dpdGNoVG9QYWNrYWdlU3BhY2U7XG4gIHJldHVybiB3cmFwcGVkO1xufVxuXG5AaW5qZWN0KEV2ZW50QWdncmVnYXRvcilcbmV4cG9ydCBjbGFzcyBIb21lIHtcbiAgcGx1Z2luTmFtZSA9ICcnO1xuICBwbHVnaW5VcmwgPSAnJztcbiAgZXJyb3IgPSAnJztcbiAgaXNMb2FkaW5nID0gZmFsc2U7XG4gIGxvYWRlZFBsdWdpbnMgPSBbXTtcblxuICBjb25zdHJ1Y3RvcihlYSkge1xuICAgIHRoaXMuZWEgPSBlYTtcbiAgfVxuXG4gIGZpbGx1cEF1KCkge1xuICAgIHRoaXMucGx1Z2luTmFtZSA9ICdwbHVnaW4tYXUnO1xuICAgIHRoaXMucGx1Z2luVXJsID0gJy9wbHVnaW4tYXBwLWF1cmVsaWEvc2NyaXB0cy9wbHVnaW4tYXUuanMnO1xuICB9XG5cbiAgZmlsbHVwVnVlKCkge1xuICAgIHRoaXMucGx1Z2luTmFtZSA9ICdwbHVnaW4tdnVlJztcbiAgICB0aGlzLnBsdWdpblVybCA9ICcvcGx1Z2luLWFwcC12dWUvc2NyaXB0cy9wbHVnaW4tdnVlLmpzJztcbiAgfVxuXG4gIGZpbGx1cFJlYWN0KCkge1xuICAgIHRoaXMucGx1Z2luTmFtZSA9ICdwbHVnaW4tcmVhY3QnO1xuICAgIHRoaXMucGx1Z2luVXJsID0gJy9wbHVnaW4tYXBwLXJlYWN0L3NjcmlwdHMvcGx1Z2luLXJlYWN0LmpzJztcbiAgfVxuXG4gIGxvYWRQbHVnaW4oKSB7XG4gICAgY29uc3Qge3BsdWdpbk5hbWUsIHBsdWdpblVybCwgbG9hZGVkUGx1Z2luc30gPSB0aGlzO1xuICAgIGlmICghcGx1Z2luTmFtZSB8fCAhcGx1Z2luVXJsKSByZXR1cm47XG4gICAgaWYgKGxvYWRlZFBsdWdpbnMuaW5kZXhPZihwbHVnaW5OYW1lKSAhPT0gLTEpIHtcbiAgICAgIHRoaXMuZXJyb3IgPSBgUGx1Z2luIFwiJHtwbHVnaW5OYW1lfVwiIGhhcyBhbHJlYWR5IGJlZW4gbG9hZGVkLmA7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5lcnJvciA9ICcnO1xuICAgIHRoaXMuaXNMb2FkaW5nID0gdHJ1ZTtcblxuICAgIGZldGNoKHBsdWdpblVybCkudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICBpZiAocmVzcG9uc2Uub2spIHtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLnRleHQoKTtcbiAgICAgIH1cbiAgICAgIHRocm93IG5ldyBFcnJvcihgJHtyZXNwb25zZS5zdGF0dXN9ICR7cmVzcG9uc2Uuc3RhdHVzVGV4dH1gKTtcbiAgICB9KS50aGVuKGJ1bmRsZSA9PiB7XG4gICAgICBjb25zdCBmdW5jID0gKG5ldyBGdW5jdGlvbignZGVmaW5lJywgYnVuZGxlKSkuYmluZChnbG9iYWwpO1xuICAgICAgZnVuYyhtYWtlTmFtZXNwYWNlZERlZmluZShwbHVnaW5OYW1lKSk7XG4gICAgICBsb2FkZWRQbHVnaW5zLnB1c2gocGx1Z2luTmFtZSk7XG4gICAgICB0aGlzLmVhLnB1Ymxpc2goJ3BsdWdpbjpsb2FkZWQnLCBwbHVnaW5OYW1lKTtcbiAgICB9KS5jYXRjaChlcnIgPT4ge1xuICAgICAgY29uc29sZS5sb2coJ2VycicsIGVycik7XG4gICAgICB0aGlzLmVycm9yID0gZXJyLm1lc3NhZ2U7XG4gICAgICBjb25zb2xlLmVycm9yKGVyci5zdGFjayk7XG4gICAgfSkudGhlbigoKSA9PiB7XG4gICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQge2luamVjdCwgQXVyZWxpYSwgRnJhbWV3b3JrQ29uZmlndXJhdGlvbn0gZnJvbSAnYXVyZWxpYS1mcmFtZXdvcmsnO1xuaW1wb3J0IHtyZXNvbHZlTW9kdWxlSWR9IGZyb20gJ2R1bWJlci1tb2R1bGUtbG9hZGVyL2Rpc3QvaWQtdXRpbHMnO1xuXG5AaW5qZWN0KEF1cmVsaWEpXG5leHBvcnQgY2xhc3MgTG9hZEZvcmVpZ25QbHVnaW4ge1xuICBtb2R1bGVJZDtcblxuICBjb25zdHJ1Y3RvcihhdSkge1xuICAgIHRoaXMuYXUgPSBhdTtcbiAgfVxuXG4gIGFjdGl2YXRlKHBhcmFtcywgcm91dGVDb25maWcpIHtcbiAgICBjb25zdCBuYW1lID0gcm91dGVDb25maWcuc2V0dGluZ3MucGx1Z2luTmFtZTtcbiAgICBsZXQgbW9kdWxlSWQ7XG4gICAgY29uc3QgZW50cnkgPSBuYW1lICsgJy9wbHVnaW4nO1xuXG4gICAgLy8gbG9hZCB0aGUgZW50cnkgbW9kdWxlIGJ5IGNvbnZlbnRpb24sXG4gICAgLy8gYWxsIGZvcmVpZ24gcGx1Z2lucyBuZWVkIHRvIHRha2UgY29udHJvbCBvZiB0aGVcbiAgICAvLyA8ZGl2IGlkPVwicGx1Z2luXCI+PC9kaXY+IGluIC4vbG9hZC1mb3JlaWduLXBsdWdpbi5odG1sXG4gICAgcmV0dXJuIHJlcXVpcmVqcyhbZW50cnldKVxuICAgIC50aGVuKHJlc3VsdHMgPT4ge1xuICAgICAgY29uc3QgW3BsdWdpbl0gPSByZXN1bHRzO1xuICAgICAgLy8gb25seSBwbHVnaW4gd3JpdHRlbiBpbiBhdXJlbGlhIGhhcyBlbnRyeSBtb2R1bGVJZFxuICAgICAgbW9kdWxlSWQgPSBwbHVnaW4ubW9kdWxlSWQ7XG4gICAgICAvLyBvdGhlciBwbHVnaW4gKHZ1ZS9yZWFjdCkgaGFzIHRvIGVuaGFuY2UgPGRpdiBpZD1cInBsdWdpblwiPjwvZGl2PlxuICAgICAgY29uc3QgY29uZmlnID0gbmV3IEZyYW1ld29ya0NvbmZpZ3VyYXRpb24odGhpcy5hdSk7XG5cbiAgICAgIC8vIHBsdWdpbiBjYW4gbG9hZCBtb3JlIGF1cmVsaWEgcGx1Z2luc1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShwbHVnaW4uY29uZmlndXJlKGNvbmZpZykpXG4gICAgICAudGhlbigoKSA9PiBjb25maWcuYXBwbHkoKSk7XG4gICAgfSlcbiAgICAudGhlbigoKSA9PiB7XG4gICAgICAvLyBvbmx5IGNhcHR1cmUgbW9kdWxlSWQgYWZ0ZXIgY29uZmlndXJlIGlzIGRvbmVcbiAgICAgIHRoaXMubW9kdWxlSWQgPSByZXNvbHZlTW9kdWxlSWQoZW50cnksIG1vZHVsZUlkKTtcbiAgICB9KTtcbiAgfVxufSIsImltcG9ydCB7UExBVEZPUk19IGZyb20gJ2F1cmVsaWEtcGFsJztcbmltcG9ydCAnQGJhYmVsL3BvbHlmaWxsJztcblxuLy8gVXNlIGR1bWJlci1tb2R1bGUtbG9hZGVyLFxuLy8gVGhpcyBiaXQgd2lsbCBiZSBhZGRlZCB0byBhdXJlbGlhLWxvYWRlci1kZWZhdWx0XG5QTEFURk9STS5lYWNoTW9kdWxlID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgbGV0IGRlZmluZWQgPSBQTEFURk9STS5nbG9iYWwucmVxdWlyZWpzLmRlZmluZWRWYWx1ZXMoKTtcbiAgZm9yIChsZXQga2V5IGluIGRlZmluZWQpIHtcbiAgICB0cnkge1xuICAgICAgaWYgKGNhbGxiYWNrKGtleSwgZGVmaW5lZFtrZXldKSkgcmV0dXJuO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIC8vXG4gICAgfVxuICB9XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gY29uZmlndXJlKGF1cmVsaWEpIHtcbiAgYXVyZWxpYS51c2Uuc3RhbmRhcmRDb25maWd1cmF0aW9uKCk7XG5cbiAgYXVyZWxpYS51c2UuZGV2ZWxvcG1lbnRMb2dnaW5nKCdpbmZvJyk7XG5cblxuICBhdXJlbGlhLnVzZS5wbHVnaW4oJ3NoYXJlZC11aScpO1xuXG4gIHJldHVybiBhdXJlbGlhLnN0YXJ0KCkudGhlbigoKSA9PiBhdXJlbGlhLnNldFJvb3QoKSk7XG59XG4iXX0=
