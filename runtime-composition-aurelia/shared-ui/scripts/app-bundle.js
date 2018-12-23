define.switchToUserSpace();
define('app',['require','exports','module'],function (require, exports, module) {
"use strict";

exports.__esModule = true;
exports.App = void 0;

var App = function App() {};

exports.App = App;
});

define('text!app.html',function(){return "<template>\n  <banner>This is an info banner.</banner>\n  <banner type=\"warning\">This is a warning banner.</banner>\n</template>\n";});
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
  aurelia.use.feature('shared-ui');
  aurelia.use.standardConfiguration();
  aurelia.use.developmentLogging('info');
  return aurelia.start().then(function () {
    return aurelia.setRoot();
  });
}
});

define('shared-ui/elements/banner',['require','exports','module','aurelia-framework'],function (require, exports, module) {
"use strict";

exports.__esModule = true;
exports.Banner = void 0;

var _aureliaFramework = require("aurelia-framework");

var _class, _descriptor, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object['ke' + 'ys'](descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object['define' + 'Property'](target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and set to use loose mode. ' + 'To use proposal-class-properties in spec mode with decorators, wait for ' + 'the next major version of decorators in stage 2.'); }

var Banner = (_class = (_temp = function Banner() {
  _initializerDefineProperty(this, "type", _descriptor, this);
}, _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "type", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 'info';
  }
})), _class);
exports.Banner = Banner;
});

define('text!shared-ui/elements/banner.css',function(){return ".banner {\n  display: block;\n  margin: 1rem;\n  padding: 1rem;\n  border: 1px solid lightgrey; }\n  .banner::before {\n    font-weight: bold; }\n  .banner.info::before {\n    content: 'INFO'; }\n  .banner.warning::before {\n    content: 'WARN';\n    color: orange; }\n";});
define('text!shared-ui/elements/banner.html',function(){return "<template class=\"banner ${type}\">\n  <require from=\"./banner.css\"></require>\n  <slot></slot>\n</template>\n";});
define('shared-ui/index',['require','exports','module'],function (require, exports, module) {
"use strict";

exports.__esModule = true;
exports.configure = configure;

function configure(config) {
  config.globalResources(['./elements/banner']);
}
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsIm1haW4uanMiLCJzaGFyZWQtdWkvZWxlbWVudHMvYmFubmVyLmpzIiwic2hhcmVkLXVpL2luZGV4LmpzIl0sIm5hbWVzIjpbIkFwcCIsIlBMQVRGT1JNIiwiZWFjaE1vZHVsZSIsImNhbGxiYWNrIiwiZGVmaW5lZCIsImdsb2JhbCIsInJlcXVpcmVqcyIsImRlZmluZWRWYWx1ZXMiLCJrZXkiLCJlIiwiY29uZmlndXJlIiwiYXVyZWxpYSIsInVzZSIsImZlYXR1cmUiLCJzdGFuZGFyZENvbmZpZ3VyYXRpb24iLCJkZXZlbG9wbWVudExvZ2dpbmciLCJzdGFydCIsInRoZW4iLCJzZXRSb290IiwiQmFubmVyIiwiYmluZGFibGUiLCJjb25maWciLCJnbG9iYWxSZXNvdXJjZXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7SUFBYUEsRzs7Ozs7Ozs7Ozs7O0FDQWI7O0FBQ0E7O0FBRUE7QUFDQTtBQUNBQyxxQkFBU0MsVUFBVCxHQUFzQixVQUFTQyxRQUFULEVBQW1CO0FBQ3ZDLE1BQUlDLE9BQU8sR0FBR0gscUJBQVNJLE1BQVQsQ0FBZ0JDLFNBQWhCLENBQTBCQyxhQUExQixFQUFkOztBQUNBLE9BQUssSUFBSUMsR0FBVCxJQUFnQkosT0FBaEIsRUFBeUI7QUFDdkIsUUFBSTtBQUNGLFVBQUlELFFBQVEsQ0FBQ0ssR0FBRCxFQUFNSixPQUFPLENBQUNJLEdBQUQsQ0FBYixDQUFaLEVBQWlDO0FBQ2xDLEtBRkQsQ0FFRSxPQUFPQyxDQUFQLEVBQVUsQ0FDVjtBQUNEO0FBQ0Y7QUFDRixDQVREOztBQVdPLFNBQVNDLFNBQVQsQ0FBbUJDLE9BQW5CLEVBQTRCO0FBQ2pDQSxFQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWUMsT0FBWixDQUFvQixXQUFwQjtBQUNBRixFQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWUUscUJBQVo7QUFFQUgsRUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVlHLGtCQUFaLENBQStCLE1BQS9CO0FBR0EsU0FBT0osT0FBTyxDQUFDSyxLQUFSLEdBQWdCQyxJQUFoQixDQUFxQjtBQUFBLFdBQU1OLE9BQU8sQ0FBQ08sT0FBUixFQUFOO0FBQUEsR0FBckIsQ0FBUDtBQUNEOzs7Ozs7Ozs7QUN4QkQ7Ozs7Ozs7Ozs7SUFFYUMsTTs7K0VBQ1ZDLDBCOzs7OztXQUFnQixNOzs7Ozs7Ozs7Ozs7OztBQ0haLFNBQVNWLFNBQVQsQ0FBbUJXLE1BQW5CLEVBQTJCO0FBQ2hDQSxFQUFBQSxNQUFNLENBQUNDLGVBQVAsQ0FBdUIsQ0FDckIsbUJBRHFCLENBQXZCO0FBR0QiLCJmaWxlIjoiYXBwLWJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBBcHAge1xuXG59XG4iLCJpbXBvcnQge1BMQVRGT1JNfSBmcm9tICdhdXJlbGlhLXBhbCc7XG5pbXBvcnQgJ0BiYWJlbC9wb2x5ZmlsbCc7XG5cbi8vIFVzZSBkdW1iZXItbW9kdWxlLWxvYWRlcixcbi8vIFRoaXMgYml0IHdpbGwgYmUgYWRkZWQgdG8gYXVyZWxpYS1sb2FkZXItZGVmYXVsdFxuUExBVEZPUk0uZWFjaE1vZHVsZSA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gIGxldCBkZWZpbmVkID0gUExBVEZPUk0uZ2xvYmFsLnJlcXVpcmVqcy5kZWZpbmVkVmFsdWVzKCk7XG4gIGZvciAobGV0IGtleSBpbiBkZWZpbmVkKSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmIChjYWxsYmFjayhrZXksIGRlZmluZWRba2V5XSkpIHJldHVybjtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvL1xuICAgIH1cbiAgfVxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGNvbmZpZ3VyZShhdXJlbGlhKSB7XG4gIGF1cmVsaWEudXNlLmZlYXR1cmUoJ3NoYXJlZC11aScpO1xuICBhdXJlbGlhLnVzZS5zdGFuZGFyZENvbmZpZ3VyYXRpb24oKTtcblxuICBhdXJlbGlhLnVzZS5kZXZlbG9wbWVudExvZ2dpbmcoJ2luZm8nKTtcblxuXG4gIHJldHVybiBhdXJlbGlhLnN0YXJ0KCkudGhlbigoKSA9PiBhdXJlbGlhLnNldFJvb3QoKSk7XG59XG4iLCJpbXBvcnQge2JpbmRhYmxlfSBmcm9tICdhdXJlbGlhLWZyYW1ld29yayc7XG5cbmV4cG9ydCBjbGFzcyBCYW5uZXIge1xuICBAYmluZGFibGUgdHlwZSA9ICdpbmZvJztcbn1cbiIsImV4cG9ydCBmdW5jdGlvbiBjb25maWd1cmUoY29uZmlnKSB7XG4gIGNvbmZpZy5nbG9iYWxSZXNvdXJjZXMoW1xuICAgICcuL2VsZW1lbnRzL2Jhbm5lcidcbiAgXSk7XG59XG4iXX0=
