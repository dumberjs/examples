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

    this.ea.subscribe('extension:loaded', function (extensionName) {
      _this.router.addRoute({
        route: extensionName,
        name: extensionName,
        title: extensionName,
        nav: true,
        moduleId: './load-foreign-extension',
        settings: {
          extensionName: extensionName
        },
        // always replace for load-foreign-extension
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
    this.extensionName = '';
    this.extensionUrl = '';
    this.error = '';
    this.isLoading = false;
    this.loadedExtensions = [];
    this.ea = ea;
  }

  var _proto = Home.prototype;

  _proto.fillupAu = function fillupAu() {
    this.extensionName = 'extension-au';
    this.extensionUrl = '/extension-app-aurelia/scripts/extension-au.js';
  };

  _proto.fillupVue = function fillupVue() {
    this.extensionName = 'extension-vue';
    this.extensionUrl = '/extension-app-vue/scripts/extension-vue.js';
  };

  _proto.fillupReact = function fillupReact() {
    this.extensionName = 'extension-react';
    this.extensionUrl = '/extension-app-react/scripts/extension-react.js';
  };

  _proto.loadExtension = function loadExtension() {
    var _this = this;

    var extensionName = this.extensionName,
        extensionUrl = this.extensionUrl,
        loadedExtensions = this.loadedExtensions;
    if (!extensionName || !extensionUrl) return;

    if (loadedExtensions.indexOf(extensionName) !== -1) {
      this.error = "Extension \"" + extensionName + "\" has already been loaded.";
      return;
    }

    this.error = '';
    this.isLoading = true;
    fetch(extensionUrl).then(function (response) {
      if (response.ok) {
        return response.text();
      }

      throw new Error(response.status + " " + response.statusText);
    }).then(function (bundle) {
      var func = new Function('define', bundle).bind(global);
      func(makeNamespacedDefine(extensionName));
      loadedExtensions.push(extensionName);

      _this.ea.publish('extension:loaded', extensionName);
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

define('text!home.html',function(){return "<template>\n  <banner>\n    This is a demo for runtime composition, the layout of this banner is provided by an Aurelia plugin \"shared-ui\".<br>\n    The \"shared-ui\" is reused in \"extension-app-aurelia\" which you can load into this app.\n  </banner>\n\n  <banner if.bind=\"error\" type=\"warning\">${error}</banner>\n\n  <h4>Load a extension</h4>\n  <p>Note in real app, an extension should provide both backend and front-end logic, following params should be provided by the meta-data of the extension.</p>\n\n  <button click.trigger=\"fillupAu()\">Fill up info for extension-app-aurelia</button>\n  <button click.trigger=\"fillupVue()\">Fill up info for extension-app-vue</button>\n  <button click.trigger=\"fillupReact()\">Fill up info for extension-app-react</button>\n  <br>\n  <div>Extension Name</div>\n  <input type=\"text\" style=\"width:20rem;\" value.bind=\"extensionName\"><br>\n  <div>Extension Bundle file URL</div>\n  <input type=\"text\" style=\"width:20rem;\" value.bind=\"extensionUrl\"><br>\n  <button disabled.bind=\"!extensionName || !extensionUrl || isLoading\" click.trigger=\"loadExtension()\">Load</button>\n\n</template>\n";});
define('load-foreign-extension',['require','exports','module','aurelia-framework','dumber-module-loader/dist/id-utils'],function (require, exports, module) {
"use strict";

exports.__esModule = true;
exports.LoadForeignExtension = void 0;

var _aureliaFramework = require("aurelia-framework");

var _idUtils = require("dumber-module-loader/dist/id-utils");

var _dec, _class, _temp;

var LoadForeignExtension = (_dec = (0, _aureliaFramework.inject)(_aureliaFramework.Aurelia), _dec(_class = (_temp =
/*#__PURE__*/
function () {
  function LoadForeignExtension(au) {
    this.moduleId = void 0;
    this.au = au;
  }

  var _proto = LoadForeignExtension.prototype;

  _proto.activate = function activate(params, routeConfig) {
    var _this = this;

    var name = routeConfig.settings.extensionName;
    var moduleId;
    var entry = name + '/extension'; // load the entry module by convention,
    // all foreign extensions need to take control of the
    // <div id="extension"></div> in ./load-foreign-extension.html

    return requirejs([entry]).then(function (results) {
      var extension = results[0]; // only extension written in aurelia has entry moduleId

      moduleId = extension.moduleId; // other extension (vue/react) has to enhance <div id="extension"></div>

      var config = new _aureliaFramework.FrameworkConfiguration(_this.au); // extension can load more aurelia extensions

      return Promise.resolve(extension.configure(config)).then(function () {
        return config.apply();
      });
    }).then(function () {
      // only capture moduleId after configure is done
      _this.moduleId = (0, _idUtils.resolveModuleId)(entry, moduleId);
    });
  };

  return LoadForeignExtension;
}(), _temp)) || _class);
exports.LoadForeignExtension = LoadForeignExtension;
});

define('text!load-foreign-extension.html',function(){return "<template>\n  <div id=\"extension\"></div>\n  <compose if.bind=\"moduleId\" view-model.bind=\"moduleId\"></compose>\n</template>";});
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImhvbWUuanMiLCJsb2FkLWZvcmVpZ24tZXh0ZW5zaW9uLmpzIiwibWFpbi5qcyJdLCJuYW1lcyI6WyJBcHAiLCJFdmVudEFnZ3JlZ2F0b3IiLCJlYSIsImJpbmQiLCJzdWJzY3JpYmUiLCJleHRlbnNpb25OYW1lIiwicm91dGVyIiwiYWRkUm91dGUiLCJyb3V0ZSIsIm5hbWUiLCJ0aXRsZSIsIm5hdiIsIm1vZHVsZUlkIiwic2V0dGluZ3MiLCJhY3RpdmF0aW9uU3RyYXRlZ3kiLCJyZWZyZXNoTmF2aWdhdGlvbiIsImNvbmZpZ3VyZVJvdXRlciIsImNvbmZpZyIsIm9wdGlvbnMiLCJwdXNoU3RhdGUiLCJyb290IiwibWFwIiwibWFrZU5hbWVzcGFjZWREZWZpbmUiLCJuYW1lc3BhY2UiLCJ3cmFwcGVkIiwiZGVwcyIsImNiIiwiZ2xvYmFsIiwiZGVmaW5lIiwiY3VycmVudFNwYWNlIiwicGFyc2VkIiwicHJlZml4IiwiYmFyZUlkIiwic3dpdGNoVG9Vc2VyU3BhY2UiLCJzd2l0Y2hUb1BhY2thZ2VTcGFjZSIsIkhvbWUiLCJleHRlbnNpb25VcmwiLCJlcnJvciIsImlzTG9hZGluZyIsImxvYWRlZEV4dGVuc2lvbnMiLCJmaWxsdXBBdSIsImZpbGx1cFZ1ZSIsImZpbGx1cFJlYWN0IiwibG9hZEV4dGVuc2lvbiIsImluZGV4T2YiLCJmZXRjaCIsInRoZW4iLCJyZXNwb25zZSIsIm9rIiwidGV4dCIsIkVycm9yIiwic3RhdHVzIiwic3RhdHVzVGV4dCIsImJ1bmRsZSIsImZ1bmMiLCJGdW5jdGlvbiIsInB1c2giLCJwdWJsaXNoIiwiY2F0Y2giLCJlcnIiLCJjb25zb2xlIiwibG9nIiwibWVzc2FnZSIsInN0YWNrIiwiTG9hZEZvcmVpZ25FeHRlbnNpb24iLCJBdXJlbGlhIiwiYXUiLCJhY3RpdmF0ZSIsInBhcmFtcyIsInJvdXRlQ29uZmlnIiwiZW50cnkiLCJyZXF1aXJlanMiLCJyZXN1bHRzIiwiZXh0ZW5zaW9uIiwiRnJhbWV3b3JrQ29uZmlndXJhdGlvbiIsIlByb21pc2UiLCJyZXNvbHZlIiwiY29uZmlndXJlIiwiYXBwbHkiLCJQTEFURk9STSIsImVhY2hNb2R1bGUiLCJjYWxsYmFjayIsImRlZmluZWQiLCJkZWZpbmVkVmFsdWVzIiwia2V5IiwiZSIsImF1cmVsaWEiLCJ1c2UiLCJzdGFuZGFyZENvbmZpZ3VyYXRpb24iLCJkZXZlbG9wbWVudExvZ2dpbmciLCJwbHVnaW4iLCJzdGFydCIsInNldFJvb3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7OztJQUdhQSxHLFdBRFosOEJBQU9DLHVDQUFQLEM7OztBQUVDLGVBQVlDLEVBQVosRUFBZ0I7QUFDZCxTQUFLQSxFQUFMLEdBQVVBLEVBQVY7QUFDRDs7OztTQUVEQyxJLEdBQUEsZ0JBQU87QUFBQTs7QUFDTCxTQUFLRCxFQUFMLENBQVFFLFNBQVIsQ0FBa0Isa0JBQWxCLEVBQXNDLFVBQUFDLGFBQWEsRUFBSTtBQUNyRCxNQUFBLEtBQUksQ0FBQ0MsTUFBTCxDQUFZQyxRQUFaLENBQXFCO0FBQ25CQyxRQUFBQSxLQUFLLEVBQUVILGFBRFk7QUFFbkJJLFFBQUFBLElBQUksRUFBRUosYUFGYTtBQUduQkssUUFBQUEsS0FBSyxFQUFFTCxhQUhZO0FBSW5CTSxRQUFBQSxHQUFHLEVBQUUsSUFKYztBQUtuQkMsUUFBQUEsUUFBUSxFQUFFLDBCQUxTO0FBTW5CQyxRQUFBQSxRQUFRLEVBQUU7QUFBQ1IsVUFBQUEsYUFBYSxFQUFiQTtBQUFELFNBTlM7QUFPbkI7QUFDQVMsUUFBQUEsa0JBQWtCLEVBQUU7QUFSRCxPQUFyQixFQURxRCxDQVlyRDs7O0FBQ0EsTUFBQSxLQUFJLENBQUNSLE1BQUwsQ0FBWVMsaUJBQVo7QUFDRCxLQWREO0FBZUQsRzs7U0FFREMsZSxHQUFBLHlCQUFnQkMsTUFBaEIsRUFBd0JYLE1BQXhCLEVBQWdDO0FBQzlCLFNBQUtBLE1BQUwsR0FBY0EsTUFBZDtBQUVBVyxJQUFBQSxNQUFNLENBQUNQLEtBQVAsR0FBZSxrQkFBZjtBQUNBTyxJQUFBQSxN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LFVBQUlELFFBQVEsQ0FBQ0csR0FBRCxFQUFNRixPQUFPLENBQUNFLEdBQUQsQ0FBYixDQUFaLEVBQWlDO0FBQ2xDLEtBRkQsQ0FFRSxPQUFPQyxDQUFQLEVBQVUsQ0FDVjtBQUNEO0FBQ0Y7QUFDRixDQVREOztBQVdPLFNBQVNSLFNBQVQsQ0FBbUJTLE9BQW5CLEVBQTRCO0FBQ2pDQSxFQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWUMscUJBQVo7QUFFQUYsRUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVlFLGtCQUFaLENBQStCLE1BQS9CO0FBR0FILEVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZRyxNQUFaLENBQW1CLFdBQW5CO0FBRUEsU0FBT0osT0FBTyxDQUFDSyxLQUFSLEdBQWdCN0MsSUFBaEIsQ0FBcUI7QUFBQSxXQUFNd0MsT0FBTyxDQUFDTSxPQUFSLEVBQU47QUFBQSxHQUFyQixDQUFQO0FBQ0QiLCJmaWxlIjoiYXBwLWJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RXZlbnRBZ2dyZWdhdG9yfSBmcm9tICdhdXJlbGlhLWV2ZW50LWFnZ3JlZ2F0b3InO1xuaW1wb3J0IHtpbmplY3R9IGZyb20gJ2F1cmVsaWEtZnJhbWV3b3JrJztcblxuQGluamVjdChFdmVudEFnZ3JlZ2F0b3IpXG5leHBvcnQgY2xhc3MgQXBwIHtcbiAgY29uc3RydWN0b3IoZWEpIHtcbiAgICB0aGlzLmVhID0gZWE7XG4gIH1cblxuICBiaW5kKCkge1xuICAgIHRoaXMuZWEuc3Vic2NyaWJlKCdleHRlbnNpb246bG9hZGVkJywgZXh0ZW5zaW9uTmFtZSA9PiB7XG4gICAgICB0aGlzLnJvdXRlci5hZGRSb3V0ZSh7XG4gICAgICAgIHJvdXRlOiBleHRlbnNpb25OYW1lLFxuICAgICAgICBuYW1lOiBleHRlbnNpb25OYW1lLFxuICAgICAgICB0aXRsZTogZXh0ZW5zaW9uTmFtZSxcbiAgICAgICAgbmF2OiB0cnVlLFxuICAgICAgICBtb2R1bGVJZDogJy4vbG9hZC1mb3JlaWduLWV4dGVuc2lvbicsXG4gICAgICAgIHNldHRpbmdzOiB7ZXh0ZW5zaW9uTmFtZX0sXG4gICAgICAgIC8vIGFsd2F5cyByZXBsYWNlIGZvciBsb2FkLWZvcmVpZ24tZXh0ZW5zaW9uXG4gICAgICAgIGFjdGl2YXRpb25TdHJhdGVneTogJ3JlcGxhY2UnXG4gICAgICB9KTtcblxuICAgICAgLy8gcmVsb2FkIG5hdmlnYXRpb24gbWVudVxuICAgICAgdGhpcy5yb3V0ZXIucmVmcmVzaE5hdmlnYXRpb24oKTtcbiAgICB9KTtcbiAgfVxuXG4gIGNvbmZpZ3VyZVJvdXRlcihjb25maWcsIHJvdXRlcikge1xuICAgIHRoaXMucm91dGVyID0gcm91dGVyO1xuXG4gICAgY29uZmlnLnRpdGxlID0gJ0NvbXBvc2l0aW9uIERlbW8nO1xuICAgIGNvbmZpZy5vcHRpb25zLnB1c2hTdGF0ZSA9IHRydWU7XG4gICAgY29uZmlnLm9wdGlvbnMucm9vdCA9IFwiL1wiO1xuXG4gICAgY29uZmlnLm1hcChbXG4gICAgICB7cm91dGU6ICcnLCBuYW1lOiAnaG9tZScsIHRpdGxlOiAnSG9tZScsIG5hdjogdHJ1ZSwgbW9kdWxlSWQ6ICcuL2hvbWUnfSxcbiAgICBdKTtcblxuICB9XG59IiwiaW1wb3J0IHtFdmVudEFnZ3JlZ2F0b3J9IGZyb20gJ2F1cmVsaWEtZXZlbnQtYWdncmVnYXRvcic7XG5pbXBvcnQge2luamVjdH0gZnJvbSAnYXVyZWxpYS1mcmFtZXdvcmsnO1xuaW1wb3J0IHtwYXJzZX0gZnJvbSAnZHVtYmVyLW1vZHVsZS1sb2FkZXIvZGlzdC9pZC11dGlscyc7XG5cbi8vIG9ubHkgYXBwbHkgbmFtZSBzcGFjZSBmb3IgdXNlciBtb2R1bGUgc3BhY2VcbmZ1bmN0aW9uIG1ha2VOYW1lc3BhY2VkRGVmaW5lKG5hbWVzcGFjZSkge1xuICBjb25zdCB3cmFwcGVkID0gZnVuY3Rpb24obW9kdWxlSWQsIGRlcHMsIGNiKSB7XG4gICAgaWYgKGdsb2JhbC5kZWZpbmUuY3VycmVudFNwYWNlKCkgPT09ICd1c2VyJykge1xuICAgICAgY29uc3QgcGFyc2VkID0gcGFyc2UobW9kdWxlSWQpO1xuICAgICAgcmV0dXJuIGdsb2JhbC5kZWZpbmUocGFyc2VkLnByZWZpeCArIG5hbWVzcGFjZSArICcvJyArIHBhcnNlZC5iYXJlSWQsIGRlcHMsIGNiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ2xvYmFsLmRlZmluZShtb2R1bGVJZCwgZGVwcywgY2IpO1xuICAgIH1cbiAgfVxuXG4gIHdyYXBwZWQuc3dpdGNoVG9Vc2VyU3BhY2UgPSBnbG9iYWwuZGVmaW5lLnN3aXRjaFRvVXNlclNwYWNlO1xuICB3cmFwcGVkLnN3aXRjaFRvUGFja2FnZVNwYWNlID0gZ2xvYmFsLmRlZmluZS5zd2l0Y2hUb1BhY2thZ2VTcGFjZTtcbiAgcmV0dXJuIHdyYXBwZWQ7XG59XG5cbkBpbmplY3QoRXZlbnRBZ2dyZWdhdG9yKVxuZXhwb3J0IGNsYXNzIEhvbWUge1xuICBleHRlbnNpb25OYW1lID0gJyc7XG4gIGV4dGVuc2lvblVybCA9ICcnO1xuICBlcnJvciA9ICcnO1xuICBpc0xvYWRpbmcgPSBmYWxzZTtcbiAgbG9hZGVkRXh0ZW5zaW9ucyA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKGVhKSB7XG4gICAgdGhpcy5lYSA9IGVhO1xuICB9XG5cbiAgZmlsbHVwQXUoKSB7XG4gICAgdGhpcy5leHRlbnNpb25OYW1lID0gJ2V4dGVuc2lvbi1hdSc7XG4gICAgdGhpcy5leHRlbnNpb25VcmwgPSAnL2V4dGVuc2lvbi1hcHAtYXVyZWxpYS9zY3JpcHRzL2V4dGVuc2lvbi1hdS5qcyc7XG4gIH1cblxuICBmaWxsdXBWdWUoKSB7XG4gICAgdGhpcy5leHRlbnNpb25OYW1lID0gJ2V4dGVuc2lvbi12dWUnO1xuICAgIHRoaXMuZXh0ZW5zaW9uVXJsID0gJy9leHRlbnNpb24tYXBwLXZ1ZS9zY3JpcHRzL2V4dGVuc2lvbi12dWUuanMnO1xuICB9XG5cbiAgZmlsbHVwUmVhY3QoKSB7XG4gICAgdGhpcy5leHRlbnNpb25OYW1lID0gJ2V4dGVuc2lvbi1yZWFjdCc7XG4gICAgdGhpcy5leHRlbnNpb25VcmwgPSAnL2V4dGVuc2lvbi1hcHAtcmVhY3Qvc2NyaXB0cy9leHRlbnNpb24tcmVhY3QuanMnO1xuICB9XG5cbiAgbG9hZEV4dGVuc2lvbigpIHtcbiAgICBjb25zdCB7ZXh0ZW5zaW9uTmFtZSwgZXh0ZW5zaW9uVXJsLCBsb2FkZWRFeHRlbnNpb25zfSA9IHRoaXM7XG4gICAgaWYgKCFleHRlbnNpb25OYW1lIHx8ICFleHRlbnNpb25VcmwpIHJldHVybjtcbiAgICBpZiAobG9hZGVkRXh0ZW5zaW9ucy5pbmRleE9mKGV4dGVuc2lvbk5hbWUpICE9PSAtMSkge1xuICAgICAgdGhpcy5lcnJvciA9IGBFeHRlbnNpb24gXCIke2V4dGVuc2lvbk5hbWV9XCIgaGFzIGFscmVhZHkgYmVlbiBsb2FkZWQuYDtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmVycm9yID0gJyc7XG4gICAgdGhpcy5pc0xvYWRpbmcgPSB0cnVlO1xuXG4gICAgZmV0Y2goZXh0ZW5zaW9uVXJsKS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgIGlmIChyZXNwb25zZS5vaykge1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UudGV4dCgpO1xuICAgICAgfVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGAke3Jlc3BvbnNlLnN0YXR1c30gJHtyZXNwb25zZS5zdGF0dXNUZXh0fWApO1xuICAgIH0pLnRoZW4oYnVuZGxlID0+IHtcbiAgICAgIGNvbnN0IGZ1bmMgPSAobmV3IEZ1bmN0aW9uKCdkZWZpbmUnLCBidW5kbGUpKS5iaW5kKGdsb2JhbCk7XG4gICAgICBmdW5jKG1ha2VOYW1lc3BhY2VkRGVmaW5lKGV4dGVuc2lvbk5hbWUpKTtcbiAgICAgIGxvYWRlZEV4dGVuc2lvbnMucHVzaChleHRlbnNpb25OYW1lKTtcbiAgICAgIHRoaXMuZWEucHVibGlzaCgnZXh0ZW5zaW9uOmxvYWRlZCcsIGV4dGVuc2lvbk5hbWUpO1xuICAgIH0pLmNhdGNoKGVyciA9PiB7XG4gICAgICBjb25zb2xlLmxvZygnZXJyJywgZXJyKTtcbiAgICAgIHRoaXMuZXJyb3IgPSBlcnIubWVzc2FnZTtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyLnN0YWNrKTtcbiAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCB7aW5qZWN0LCBBdXJlbGlhLCBGcmFtZXdvcmtDb25maWd1cmF0aW9ufSBmcm9tICdhdXJlbGlhLWZyYW1ld29yayc7XG5pbXBvcnQge3Jlc29sdmVNb2R1bGVJZH0gZnJvbSAnZHVtYmVyLW1vZHVsZS1sb2FkZXIvZGlzdC9pZC11dGlscyc7XG5cbkBpbmplY3QoQXVyZWxpYSlcbmV4cG9ydCBjbGFzcyBMb2FkRm9yZWlnbkV4dGVuc2lvbiB7XG4gIG1vZHVsZUlkO1xuXG4gIGNvbnN0cnVjdG9yKGF1KSB7XG4gICAgdGhpcy5hdSA9IGF1O1xuICB9XG5cbiAgYWN0aXZhdGUocGFyYW1zLCByb3V0ZUNvbmZpZykge1xuICAgIGNvbnN0IG5hbWUgPSByb3V0ZUNvbmZpZy5zZXR0aW5ncy5leHRlbnNpb25OYW1lO1xuICAgIGxldCBtb2R1bGVJZDtcbiAgICBjb25zdCBlbnRyeSA9IG5hbWUgKyAnL2V4dGVuc2lvbic7XG5cbiAgICAvLyBsb2FkIHRoZSBlbnRyeSBtb2R1bGUgYnkgY29udmVudGlvbixcbiAgICAvLyBhbGwgZm9yZWlnbiBleHRlbnNpb25zIG5lZWQgdG8gdGFrZSBjb250cm9sIG9mIHRoZVxuICAgIC8vIDxkaXYgaWQ9XCJleHRlbnNpb25cIj48L2Rpdj4gaW4gLi9sb2FkLWZvcmVpZ24tZXh0ZW5zaW9uLmh0bWxcbiAgICByZXR1cm4gcmVxdWlyZWpzKFtlbnRyeV0pXG4gICAgLnRoZW4ocmVzdWx0cyA9PiB7XG4gICAgICBjb25zdCBbZXh0ZW5zaW9uXSA9IHJlc3VsdHM7XG4gICAgICAvLyBvbmx5IGV4dGVuc2lvbiB3cml0dGVuIGluIGF1cmVsaWEgaGFzIGVudHJ5IG1vZHVsZUlkXG4gICAgICBtb2R1bGVJZCA9IGV4dGVuc2lvbi5tb2R1bGVJZDtcbiAgICAgIC8vIG90aGVyIGV4dGVuc2lvbiAodnVlL3JlYWN0KSBoYXMgdG8gZW5oYW5jZSA8ZGl2IGlkPVwiZXh0ZW5zaW9uXCI+PC9kaXY+XG4gICAgICBjb25zdCBjb25maWcgPSBuZXcgRnJhbWV3b3JrQ29uZmlndXJhdGlvbih0aGlzLmF1KTtcblxuICAgICAgLy8gZXh0ZW5zaW9uIGNhbiBsb2FkIG1vcmUgYXVyZWxpYSBleHRlbnNpb25zXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGV4dGVuc2lvbi5jb25maWd1cmUoY29uZmlnKSlcbiAgICAgIC50aGVuKCgpID0+IGNvbmZpZy5hcHBseSgpKTtcbiAgICB9KVxuICAgIC50aGVuKCgpID0+IHtcbiAgICAgIC8vIG9ubHkgY2FwdHVyZSBtb2R1bGVJZCBhZnRlciBjb25maWd1cmUgaXMgZG9uZVxuICAgICAgdGhpcy5tb2R1bGVJZCA9IHJlc29sdmVNb2R1bGVJZChlbnRyeSwgbW9kdWxlSWQpO1xuICAgIH0pO1xuICB9XG59IiwiaW1wb3J0IHtQTEFURk9STX0gZnJvbSAnYXVyZWxpYS1wYWwnO1xuaW1wb3J0ICdAYmFiZWwvcG9seWZpbGwnO1xuXG4vLyBVc2UgZHVtYmVyLW1vZHVsZS1sb2FkZXIsXG4vLyBUaGlzIGJpdCB3aWxsIGJlIGFkZGVkIHRvIGF1cmVsaWEtbG9hZGVyLWRlZmF1bHRcblBMQVRGT1JNLmVhY2hNb2R1bGUgPSBmdW5jdGlvbihjYWxsYmFjaykge1xuICBsZXQgZGVmaW5lZCA9IFBMQVRGT1JNLmdsb2JhbC5yZXF1aXJlanMuZGVmaW5lZFZhbHVlcygpO1xuICBmb3IgKGxldCBrZXkgaW4gZGVmaW5lZCkge1xuICAgIHRyeSB7XG4gICAgICBpZiAoY2FsbGJhY2soa2V5LCBkZWZpbmVkW2tleV0pKSByZXR1cm47XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgLy9cbiAgICB9XG4gIH1cbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBjb25maWd1cmUoYXVyZWxpYSkge1xuICBhdXJlbGlhLnVzZS5zdGFuZGFyZENvbmZpZ3VyYXRpb24oKTtcblxuICBhdXJlbGlhLnVzZS5kZXZlbG9wbWVudExvZ2dpbmcoJ2luZm8nKTtcblxuXG4gIGF1cmVsaWEudXNlLnBsdWdpbignc2hhcmVkLXVpJyk7XG5cbiAgcmV0dXJuIGF1cmVsaWEuc3RhcnQoKS50aGVuKCgpID0+IGF1cmVsaWEuc2V0Um9vdCgpKTtcbn1cbiJdfQ==
